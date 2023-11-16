import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {Fragment, Suspense, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useBookFlight} from 'src/core/book-flight/useBookFlight'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {FlightTicketInfoBox} from 'src/shared/flight-ticket-info'
import {Ticket} from 'src/shared/types/server'
import {formatDate} from 'src/shared/utils/jalaliDate'
import {parseParamQuery} from 'src/shared/utils/paramQuery'
import {getTags} from './getTags'
import {NoContentResult} from './NoContentResult'
import {searchFlightResultQuery} from './searchFlightResult.query'
import {SearchFlightResultHeader} from './SearchFlightResultHeader'
import SortAndFilter from './SortAndFilter'
import {TabPrice} from './TabPrice'

export default function SearchFlightResultPage() {
  const {
    bookFlight: {adultCount, childCount, infantCount, departureDate, returnDate, src, dest, isOneWay},
    setBookFlight,
  } = useBookFlight()
  const navigate = useNavigate()
  const {search} = useLocation()
  const queryFromUrl = parseParamQuery(search)

  const {data, refetch} = useQuery(
    [
      'SearchFlightResultQuery',
      src.value ?? '',
      dest.value ?? '',
      departureDate?.toISOString().substring(0, 10) ?? '',
      returnDate?.toISOString().substring(0, 10) ?? undefined,
      queryFromUrl.priceRange?.split('-')[0],
      queryFromUrl.priceRange?.split('-')[1],
      queryFromUrl.aircraftComp === '' ? undefined : queryFromUrl.aircraftComp,
      queryFromUrl.ticketType === '' ? undefined : queryFromUrl.ticketType,
      queryFromUrl.sortBy === '' ? undefined : queryFromUrl.sortBy,
      queryFromUrl.timeRange === '' ? undefined : queryFromUrl.timeRange,
      adultCount,
      childCount,
      infantCount,
    ],
    searchFlightResultQuery,
    {
      retryOnMount: false,
      retry: false,
    }
  )

  useEffect(() => {
    if (data?.session_id) {
      setBookFlight({sessionId: data?.session_id, selectedTicket: undefined})
    }
  }, [setBookFlight, data?.session_id])

  const formattedDepartureDate = formatDate(departureDate, 'normalDateWithWeekday')
  const formattedReturnDate = isOneWay ? undefined : formatDate(returnDate, 'normalDateWithWeekday')
  const passengersCount = adultCount + childCount + infantCount

  const handleClick = (ticket: Ticket) => {
    setBookFlight({
      selectedTicket: ticket,
    })
    navigate('/flight/flight-information')
  }

  return (
    <>
      <SearchFlightResultHeader
        title1={t`Airplane ticket`}
        title2={t`${formattedDepartureDate} - ${formattedReturnDate ? `${formattedReturnDate} - ` : ''}${passengersCount} Passenger`}
      />
      <SortAndFilter refetch={refetch} />
      <ErrorBoundary>
        <Suspense>
          {departureDate && dest.value && data?.session_id && src.value ? (
            <TabPrice
              departureDate={departureDate?.toISOString().substring(0, 10)}
              returnDate={returnDate?.toISOString().substring(0, 10)}
              destinationCode={dest.value}
              sessionId={data?.session_id}
              sourceCode={src.value}
            />
          ) : null}
        </Suspense>
      </ErrorBoundary>
      <Stack pb={4}>
        {data?.tickets.length ? (
          data.tickets.map((item, i) => (
            <Fragment key={i}>
              <FlightTicketInfoBox
                isReturn={item.flights[1] ? false : undefined}
                tags={getTags(item.flights[0])}
                flightName={item.flights[0].airline?.[1]?.[1] ?? t`Unknown`}
                flightLogoUrl={''}
                departureCity={item.flights[0].source.location.city.city_name_fa ?? src.label}
                arrivalCity={item.flights[0].destination.location.city.city_name_fa ?? dest.label}
                vacancyCount={item.flights[0].remaining_seats}
                startTime={item.flights[0].departure_time.substring(0, 5)}
                endTime={formatDate(new Date(item.flights[0].destination_arrival_date_time), 'fullTime24h')?.substring(0, 5) ?? ''}
                price={item.total_price.total}
                onClick={() => handleClick(item)}
              />
              {item.flights[1] ? (
                <FlightTicketInfoBox
                  isReturn
                  key={i}
                  tags={getTags(item.flights[1])}
                  flightName={item.flights[1].airline?.[1]?.[1] ?? t`Unknown`}
                  flightLogoUrl={''}
                  departureCity={item.flights[1].source.location.city.city_name_fa ?? src.label}
                  arrivalCity={item.flights[1].destination.location.city.city_name_fa ?? dest.label}
                  vacancyCount={
                    item.flights[0].remaining_seats < item.flights[1].remaining_seats
                      ? item.flights[0].remaining_seats
                      : item.flights[1].remaining_seats
                  }
                  startTime={item.flights[1].departure_time.substring(0, 5)}
                  endTime={formatDate(new Date(item.flights[1].destination_arrival_date_time), 'fullTime24h')?.substring(0, 5) ?? ''}
                  price={item.total_price.total}
                  onClick={() => handleClick(item)}
                />
              ) : null}
            </Fragment>
          ))
        ) : (
          <NoContentResult />
        )}
      </Stack>
    </>
  )
}
