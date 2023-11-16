import {Trans} from '@lingui/macro'
import {Stack, styled} from '@mui/material'
import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useLocation} from 'react-router'
import {defaultBookHotelAtom} from 'src/atoms'
import {useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {Button} from 'src/shared/button'
import {PassengerCountInputBottomRounded} from 'src/shared/hotel'
import HotelDateInput from 'src/shared/hotel/hotel-inputs/HotelDateInput'
import {HotelResortType} from 'src/shared/types/server/hotel/HotelResponseType'
import {toLocaleDate} from 'src/shared/utils/jalaliDate'
import {HotelInputType} from '../hotel/HotelPage'

const HotelDateInputNewDesign = styled(HotelDateInput)(({theme}) => ({
  ...theme.typography.caption,

  '& .MuiInputBase-root': {
    '& fieldset': {
      borderBottomLeftRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
      borderBottomWidth: '0.5px !important',
    },
  },
  '& .MuiFormControl-root, .MuiStack-root': {padding: '0 !important', height: 'auto'},
}))

export const HotelBookData = () => {
  const {
    bookHotel: {count, rangeDate},
    setBookHotel,
  } = useBookHotel()
  const type = useLocation()?.state?.type as string

  const methods = useForm<Pick<HotelInputType, 'count' | 'rangeDate'>>({
    defaultValues: {
      count: count?.length ? count : [{adult: 1, child: 0, childAge: []}],
      rangeDate: type === HotelResortType.entity ? defaultBookHotelAtom.rangeDate : rangeDate,
    },
  })

  useEffect(() => {
    if (type === HotelResortType.entity) setBookHotel({...defaultBookHotelAtom, count: [{adult: 1, child: 0, childAge: []}]})
  }, [setBookHotel, type])

  const {handleSubmit} = methods

  const onSubmit = async (newValues: Pick<HotelInputType, 'count' | 'rangeDate'>) => {
    const Data: Pick<HotelInputType, 'count' | 'rangeDate'> = {
      ...newValues,
      // rangeDate: [dateApiFormat(newValues.rangeDate[0]), dateApiFormat(newValues.rangeDate[1])],
      rangeDate: [toLocaleDate(newValues?.rangeDate?.[0] ?? ''), toLocaleDate(newValues?.rangeDate?.[1] ?? '')],
    }

    setBookHotel(Data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HotelDateInputNewDesign withoutLabel />
        <PassengerCountInputBottomRounded withoutLabel={true} />
        <Stack py={2}>
          <Button variant="contained" color="primary" type="submit">
            <Trans>Change room search</Trans>
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
