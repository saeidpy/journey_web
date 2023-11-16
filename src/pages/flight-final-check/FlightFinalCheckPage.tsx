import {t} from '@lingui/macro'
import {InfoOutlined} from '@mui/icons-material'
import {Stack, styled, Typography} from '@mui/material'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {useBookFlight} from 'src/core/book-flight/useBookFlight'
import {useSnackbar} from 'src/core/snackbar'
import {PassengersInfoBox, SelectedTicketInfoListBox} from 'src/shared/flight-ticket-info'
import {Header, useHandleBack} from 'src/shared/layouts/app-layout'
import {AgeType} from 'src/shared/types/server'
import {formatDate, setDateWithTime} from 'src/shared/utils/jalaliDate'
import {orderWithNationalId} from '../evano/orderWithNationalId.mutation'
import {profileQuery} from '../profile/profile.query'
import {flightBookMutation} from './flightBook.mutation'

const FullNameBox = styled(Stack)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row',
  padding: '5px',
}))

export default function FlightFinalCheckPage() {
  const {data} = useQuery(['ProfilePage', ''], profileQuery)
  const {
    bookFlight: {isOneWay, passengers, selectedTicket, onNextStep, adultCount, childCount, infantCount, sessionId},
  } = useBookFlight()
  const {showSnackbar} = useSnackbar()
  const {mutateAsync} = useMutation(flightBookMutation)
  const departureTicket = selectedTicket?.flights[0]
  console.log('🚀 ~ file: FlightFinalCheckPage.tsx:32 ~ FlightFinalCheckPage ~ departureTicket:', departureTicket)
  const returnTicket = selectedTicket?.flights[0]

  const back = useHandleBack()
  const {mutateAsync: orderWithNationalIdMutation} = useMutation(orderWithNationalId)
  useEffect(() => {
    if (onNextStep) {
      onNextStep.current = async () => {
        const listpassanger = passengers?.map((passenger) => ({
          passenger_age_type: passenger?.ageType,
          passenger_birthday: new Date(passenger.birthday).toISOString().slice(0, 19),
          passenger_gender: passenger?.gender[1],
          passenger_first_name: passenger.firstName,
          passenger_last_name: passenger.lastName,

          ...(passenger.nationalId
            ? {
                passenger_national_card: true,
                passenger_nationalId: passenger.nationalId ?? t`Unknown`,
                passenger_nationality: 'IR',
              }
            : {
                passenger_nationality: passenger.nationality ? passenger.nationality[1] : '',
                passenger_national_card: false,
                passenger_passport_country_code: passenger.passportIssued,
                passenger_passport_expire_date: passenger.passportExpiryDate,
                passenger_passport_no: passenger.passportId,
              }),
        }))
        const dataToPost = {
          session_id: sessionId ?? '',
          ticket_unique_hash: selectedTicket?.ticket_unique_hash ?? '',
          passengers: listpassanger ?? [],
        }

        orderWithNationalIdMutation(dataToPost).then((res) => {
          const {ewano_order_id: ewanoOrderId, total_price} = res
          window.ewano?.pay(total_price, ewanoOrderId, '/')
          //todo:use EwanoComponent instead
        })
        return true

        // const res = await mutateAsync(
        //   passengers.reduce(
        //     (prev, cur, i) => ({
        //       ...prev,
        //       [`passenger_${i}_age_type`]: cur.ageType,
        //       [`passenger_${i}_birthday`]: cur.birthday,
        //       [`passenger_${i}_gender`]: Number(cur.gender[1]),
        //       [`passenger_${i}_first_name`]: cur.firstName,
        //       [`passenger_${i}_last_name`]: cur.lastName,
        //       ...(cur.nationalCard
        //         ? {
        //           [`passenger_${i}_national_card`]: true,
        //           [`passenger_${i}_nationalId`]: cur.nationalId,
        //           [`passenger_${i}_nationality`]: 'IR',
        //         }
        //         : {
        //           [`passenger_${i}_national_card`]: false,
        //           [`passenger_${i}_passport_no`]: cur.passportId,
        //           [`passenger_${i}_nationality`]: cur.nationality[1],
        //           [`passenger_${i}_passport_country_code`]: cur.passportIssued,
        //           [`passenger_${i}_passport_expire_date`]: cur.passportExpiryDate,
        //         }),
        //     }),
        //     {
        //       fare_source_code: selectedTicket?.fare_source_code,
        //       passenger_count: adultCount + childCount + infantCount,
        //       session_id: sessionId,
        //     } as BookRequestType
        //   )
        // )
        // if (res?.Success) {
        //   showSnackbar(t`The ticket will be send to your phone number.`)
        //   return true
        // } else {
        //   showSnackbar(res?.Error ?? t`An error occurred`, { severity: 'error' })
        //   return false
        // }
      }
      return () => {
        onNextStep.current = undefined
      }
    }
  }, [
    onNextStep,
    adultCount,
    childCount,
    infantCount,
    mutateAsync,
    passengers,
    selectedTicket?.fare_source_code,
    sessionId,
    showSnackbar,
    selectedTicket?.ticket_unique_hash,
    orderWithNationalIdMutation,
  ])

  return (
    <>
      <Header fullWidth hasBackButton title={t`Information confirmation`} />

      <Stack pb={3}>
        {departureTicket ? (
          <SelectedTicketInfoListBox
            isOneWay={isOneWay}
            departureTicket={{
              allowableLoad: departureTicket.max_baggage ?? t`Unknown`,
              departureCity: departureTicket.source.location.city.city_name_fa ?? t`Unknown`,
              destinationCity: departureTicket.destination.location.city.city_name_fa ?? t`Unknown`,
              flightClass: departureTicket.cabin_type?.[1]?.[1]?.toString() ?? t`Unknown`,
              flightCompanyName: departureTicket.airline?.[1]?.[1]?.toString() ?? t`Unknown`,
              flightDateAndTime: departureTicket.departure_date
                ? formatDate(
                    setDateWithTime(departureTicket.departure_date, departureTicket.departure_time ?? '00:00:00'),
                    'fullDateTime24h'
                  ) ?? t`Unknown`
                : t`Unknown`,
              flightNumber: departureTicket.flight_no ?? t`Unknown`,
              hasSpecialService: false,
              isRefundable: selectedTicket.refund?.refund_method?.[1]?.[0] !== 1,
            }}
            returnTicket={
              returnTicket
                ? {
                    allowableLoad: returnTicket.max_baggage ?? t`Unknown`,
                    departureCity: returnTicket.source.location.city.city_name_fa ?? t`Unknown`,
                    destinationCity: returnTicket.destination.location.city.city_name_fa ?? t`Unknown`,
                    flightClass: returnTicket.cabin_type?.[1]?.[1]?.toString() ?? t`Unknown`,
                    flightCompanyName: returnTicket.airline?.[1]?.[1]?.toString() ?? t`Unknown`,
                    flightDateAndTime: returnTicket.departure_date
                      ? formatDate(
                          setDateWithTime(returnTicket.departure_date, returnTicket.departure_time ?? '00:00:00'),
                          'fullDateTime24h'
                        ) ?? t`Unknown`
                      : t`Unknown`,
                    flightNumber: returnTicket.flight_no ?? t`Unknown`,
                    hasSpecialService: false,
                    isRefundable: selectedTicket.refund?.refund_method?.[1]?.[0] !== 1,
                  }
                : undefined
            }
          />
        ) : null}
        <PassengersInfoBox
          passengers={
            passengers?.map((passenger) => ({
              ageCategory: passenger.ageType === AgeType.ADULT ? t`Adult` : passenger.ageType === AgeType.CHILD ? t`Child` : t`Infant`,
              birthDate: formatDate(passenger.birthday, 'keyboardDate') ?? t`Unknown`,
              fullName: `${passenger.firstName} ${passenger.lastName}`,
              gender: passenger.gender?.[0] ?? t`Unknown`,
              identityNumber: passenger.nationalId ?? passenger.passportId ?? t`Unknown`,
              nationality: passenger.nationalCard ? undefined : passenger.nationality?.[0] ?? t`Unknown`,
            })) ?? []
          }
          onBack={back}
        />
        <Stack display="flex" justifyContent="center" flexDirection="column" height="200px">
          <Stack>
            {' '}
            <Typography fontWeight="bold">{t`Travel information`}</Typography>
            <FullNameBox>
              <InfoOutlined sx={{color: 'error.main', margin: '5px 0'}} />
              <Typography
                sx={{color: 'error.main'}}
                variant="caption"
              >{t`Ticket information and further information will be sent to this address.`}</Typography>
            </FullNameBox>
          </Stack>
          <FullNameBox>
            <Typography>{t`phone number`}:</Typography> <Typography>{data?.phone_number ? data.phone_number : ''}</Typography>
          </FullNameBox>
          <FullNameBox>
            <Typography>{t`Email`}:</Typography> <Typography>{data?.email ? data.email : ''}</Typography>
          </FullNameBox>
        </Stack>
      </Stack>
    </>
  )
}
