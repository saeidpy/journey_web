import {t} from '@lingui/macro'
import {useLocation} from 'react-router'
import {locationToStep} from 'src/core/book-flight/locationToStep'
import {useBookFlight} from 'src/core/book-flight/useBookFlight'
import {getTags} from 'src/pages/search-flight-result/getTags'
import {FlightFurtherInformation, FlightPathInfoBox} from 'src/shared/flight-ticket-info'
import {Header, useHandleBack} from 'src/shared/layouts/app-layout'
import {formatDate, setDateWithTime} from 'src/shared/utils/jalaliDate'

export default function FlightTicketInfoPage() {
  const {
    bookFlight: {dest, src, isOneWay, selectedTicket},
    setBookFlight,
  } = useBookFlight()
  const location = useLocation()
  const step = locationToStep(location.pathname)
  const back = useHandleBack()
  const flight = step === 'ticket-confirmation' ? selectedTicket?.flights?.[0] : selectedTicket?.flights?.[1]
  if (!flight) {
    back()
  }
  const tags = flight ? getTags(flight) : undefined

  return flight ? (
    <>
      <Header
        fullWidth
        backButtonCallback={() => {
          if (step === 'ticket-confirmation') {
            setBookFlight({
              selectedTicket: undefined,
            })
          }
          back()
        }}
        hasBackButton
        title={
          isOneWay ? t`Flight information` : step === 'ticket-confirmation' ? t`Departure flight information` : t`Return flight information`
        }
      />
      <FlightPathInfoBox
        departure={step === 'ticket-confirmation' ? src.label : dest.label}
        destination={step === 'ticket-confirmation' ? dest.label : src.label}
        startTime={flight.departure_time?.substring(0, 5) ?? ''}
        endTime={new Date(flight.destination_arrival_date_time ?? '').toTimeString().substring(0, 5)}
        flightDepartureDate={formatDate(new Date(flight.departure_date ?? ''), 'normalDateWithWeekday') ?? ''}
        flightArrivalDate={formatDate(new Date(flight.destination_arrival_date_time ?? ''), 'normalDateWithWeekday') ?? ''}
        flightDuration={
          (new Date(flight.destination_arrival_date_time ?? '').getTime() -
            setDateWithTime(flight.departure_date, flight?.departure_time).getTime()) /
          60000
        }
        flightLogoUrl=""
        flightName={flight.airline[1][1] ?? t`Unknown`}
      />
      <FlightFurtherInformation
        PlaneModel={t`Unknown`}
        allowableLoad={flight.max_baggage}
        flightClass={tags?.[0] ?? t`Unknown`}
        flightNumber={flight.flight_no ?? ''}
        ticketType={tags?.[1] ?? t`Unknown`}
      />
    </>
  ) : (
    <></>
  )
}
