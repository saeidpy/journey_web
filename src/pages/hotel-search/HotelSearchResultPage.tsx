import {t} from '@lingui/macro'
import {Stack, styled} from '@mui/material'
import {Suspense, useCallback, useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {BookHotelValueType, useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {FullPageError} from 'src/shared/error'
import {ErrorBoundary} from 'src/shared/error-boundary'
import {PassengerCountInput} from 'src/shared/hotel'
import HotelDateInput from 'src/shared/hotel/hotel-inputs/HotelDateInput'
import {Header} from 'src/shared/layouts/app-layout'
import {FullScreenLoading} from 'src/shared/loading'
import {SearchSection} from './SearchSection'

type FormInputType = Pick<BookHotelValueType, 'rangeDate' | 'count'>

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

const PassengerCountInputNewDesign = styled(PassengerCountInput)(({theme}) => ({
  ...theme.typography.caption,

  '& .MuiInputBase-root': {
    '& fieldset': {
      borderTopLeftRadius: '0 !important',
      borderTopRightRadius: '0 !important',
      borderTopWidth: '0.5px !important',
    },
  },
  '& .MuiFormControl-root': {padding: '0 !important', height: 'auto'},
  '& .MuiStack-root': {padding: '0 !important'},
}))

export default function HotelSearchResultPage() {
  const {bookHotel, setBookHotel} = useBookHotel()
  const {count, rangeDate, destination} = bookHotel
  const methods = useForm<FormInputType>({
    defaultValues: {rangeDate, count},
  })
  const {handleSubmit, watch, getValues, reset} = methods

  useEffect(() => {
    //set default value for from provider
    reset(bookHotel)
  }, [reset])

  const submit = useCallback(
    (data: FormInputType) => {
      setBookHotel(data)
    },
    [setBookHotel]
  )

  const _rangeDate = watch('rangeDate')
  const _countData = watch('count')

  useEffect(() => {
    if (_rangeDate?.[0] && _rangeDate?.[1] && _countData) {
      submit(getValues())
    }
  }, [getValues, _rangeDate, _countData, submit])

  return (
    <>
      <Header fullWidth title={t`hotels ${destination?.label}`} hasBackButton />
      <Stack py={2}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)}>
            <HotelDateInputNewDesign withoutLabel />
            <PassengerCountInputNewDesign withoutLabel />
          </form>
        </FormProvider>
      </Stack>

      <ErrorBoundary fallback={<FullPageError />}>
        <Suspense fallback={<FullScreenLoading />}>
          <SearchSection />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
