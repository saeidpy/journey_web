import {t, Trans} from '@lingui/macro'
import {Check} from '@mui/icons-material'
import {Card, Stack, styled, Typography} from '@mui/material'
import {ChangeEvent} from 'react'
import {useNavigate} from 'react-router'
import {DiscountCodeForm} from 'src/shared/flight-ticket-info'
import {
  ActionButton,
  ActionButtonHotel,
  ContentRegionHotel,
  HotelInfo,
  HotelPassengerRoomCheck,
  HotelPassengersLayout,
} from 'src/shared/hotel'
import {HotelOrderInfo} from 'src/shared/hotel/hotel-order-info/HotelOrderInfo'

type StatusType = 'loading' | 'reject' | 'paymentPending' | 'success'

interface HotelOrderDetailProps {
  type: StatusType
}

const StatusMuiCard = styled(Card)(({theme, color}) => ({
  padding: theme.spacing(2),
  color: color,
  //make 15% transparency of color
  backgroundColor: color + '26',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  boxShadow: '0px 0px 4px 0px ' + theme.palette.divider,
}))

const status = {
  loading: {
    reservationStatus: t`Inquiring`,
    statusNote: (
      <>{t`Dear Sir, the hotel reservation request has been registered for you, the registration of the inquiry does not mean that the reservation is confirmed, and after the confirmation of the amount and amount by the hotel, you will be informed via email and SMS.`}</>
    ),
    colorStatus: '#1A0DAB',
  },
  reject: {
    reservationStatus: t`Canceled`,
    statusNote: <>{t`Unfortunately, the desired room is not available on your selected date. You can search for another hotel or time.`}</>,
    colorStatus: '#B2001A',
  },
  paymentPending: {
    reservationStatus: t`Reservation - Pending payment`,
    statusNote: <>{t`Hotel inquiries have been made. Please pay for it and then receive the hotel voucher.`}</>,
    colorStatus: '#39AE00',
  },
  success: {
    reservationStatus: t`Paid`,
    statusNote: (
      <Stack flexDirection="row" alignItems={'center'} gap={1}>
        <Check />
        {t`Payment was successful.`}
      </Stack>
    ),
    colorStatus: '#39AE00',
  },
}

export default function HotelOrderDetail({type: currentStatus}: HotelOrderDetailProps) {
  const navigate = useNavigate()

  const onAction = () => {
    //TODO: JUST FOR DEMO
    if (currentStatus === 'loading') navigate(`/hotel/hotel-order-detail-${'reject'}`)
    else if (currentStatus === 'reject') navigate(`/hotel/hotel-order-detail-${'paymentPending'}`)
    else if (currentStatus === 'paymentPending') navigate(`/hotel/hotel-order-detail-${'success'}`)
  }

  const {reservationStatus, statusNote, colorStatus} = status[currentStatus]
  return (
    //todo : These codes should be dynamic after the arrival of API
    <HotelPassengersLayout headerTitle={t`Order detail`}>
      <ContentRegionHotel>
        <StatusMuiCard color={colorStatus}>
          <Typography>{statusNote}</Typography>
        </StatusMuiCard>
        <HotelOrderInfo
          reservationNumber={'123458'}
          booker={'علیرضا حسینی'}
          timePurchase={'1402/08/24'}
          reservationStatus={<Typography color={colorStatus}>{reservationStatus}</Typography>}
        />
        <HotelInfo
          withoutChangeRoomButton
          hotelTitle={' هتل همای تهران'}
          starCount={4}
          address={'تهران، خیابان ولیعصر، بالاتر ازمیدان ونک، خیابان شهید خدامی، شماره51، هتل هما تهران'}
          enterDate={'8 اسفند ۱۴۰۱'}
          exitDate={'8 اسفند ۱۴۰۱'}
          stayingTime={10}
          roomCount={1}
        />
        <HotelPassengerRoomCheck
          rooms={[
            {
              roomTitle: 'اتاق دو تخته هما پلاس',
              passengers: [
                {fullName: 'علیرضا حسینی', typePassenger: 'adult', gender: 'men', nationalCode: '21312312'},
                {fullName: 'مریم علی یاری', typePassenger: 'child', gender: 'women', nationalCode: '12312312'},
              ],
            },
          ]}
        />
        {currentStatus === 'loading' && (
          <StatusMuiCard color={colorStatus} sx={{padding: 2}}>
            <Trans>The final amount may change after inquiry.</Trans>
          </StatusMuiCard>
        )}
        {currentStatus === 'paymentPending' && (
          <DiscountCodeForm
            FieldName={''}
            fieldOnChange={function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
              throw new Error('Function not implemented.')
            }}
          />
        )}
      </ContentRegionHotel>
      <ActionButtonHotel>
        <ActionButton totalPrice={1975000} type={currentStatus === 'reject' ? 'loading' : currentStatus} onClick={onAction} />
      </ActionButtonHotel>
    </HotelPassengersLayout>
  )
}
