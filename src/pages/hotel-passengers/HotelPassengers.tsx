import {yupResolver} from '@hookform/resolvers/yup'
import {t} from '@lingui/macro'
import {differenceInDays} from 'date-fns'
import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {PassengerInputType, useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {
  ActionButton,
  ActionButtonHotel,
  ContentRegionHotel,
  HotelInfo,
  HotelPassengerRoomInfo,
  HotelPassengersLayout,
} from 'src/shared/hotel'
import {hotelInputValidation} from 'src/shared/hotel/hotel-inputs/InputValidation'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {formatDate} from 'src/shared/utils/jalaliDate'

export interface HotelPassengerInputTypes {
  passengers: PassengerInputType[]
}

export default function HotelPassengers() {
  const {
    bookHotel: {count, rangeDate, selectedRoom, passengers},
    setBookHotel,
  } = useBookHotel()
  const methods = useForm({
    defaultValues: {passengers},
    resolver: yupResolver(hotelInputValidation),
    reValidateMode: 'onChange',
    mode: 'onChange',
  })
  const goBack = useHandleBack()
  const navigate = useNavigate()
  const daysDifference = differenceInDays(new Date(rangeDate?.[0] ?? ''), new Date(rangeDate?.[1] ?? ''))
  const {handleSubmit, reset} = methods

  useEffect(() => {
    //set default value for from provider
    reset({passengers})
  }, [reset])

  const onSubmit = (values: HotelPassengerInputTypes) => {
    setBookHotel({
      passengers: values.passengers,
    })
    navigate('/hotel/hotel-information-check')
  }

  const rooms =
    count?.map((item, index) => ({
      child: item.child,
      adult: item.adult,
      roomTitle: selectedRoom?.roomName ?? '',
      roomNumber: index,
    })) ?? []

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <HotelPassengersLayout headerTitle={t`passengers`}>
          <ContentRegionHotel>
            <HotelInfo
              onClickAction={goBack}
              hotelTitle={selectedRoom?.hotelName ?? ''}
              starCount={4}
              address={selectedRoom?.address ?? ''}
              enterDate={formatDate(rangeDate?.[0] ?? '', 'keyboardDate') ?? ''}
              exitDate={formatDate(rangeDate?.[1] ?? '', 'keyboardDate') ?? ''}
              stayingTime={daysDifference ? daysDifference : 1}
              roomCount={count?.length ? count?.length : 1}
            />

            <HotelPassengerRoomInfo hotelTitle={selectedRoom?.roomName ?? ''} rooms={rooms} />
          </ContentRegionHotel>
          <ActionButtonHotel>
            <ActionButton totalPrice={selectedRoom?.pricePerNight ?? 0} />
          </ActionButtonHotel>
        </HotelPassengersLayout>
      </form>
    </FormProvider>
  )
}
