import {t, Trans} from '@lingui/macro'
import {InfoOutlined} from '@mui/icons-material'
import {Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {PassengerRoomType} from 'src/core/book-hotel/useBookHotel'
import {Button} from 'src/shared/button'
import HotelRoomCounter from './HotelRoomCounter'

export const HOTEL_PASSENGER_MODAL_ID = 'HOTEL_PASSENGER_MODAL_ID'

export type PassengerCountType = {
  count: PassengerRoomType[]
}

export const HotelPassengerCountModal = ({
  onSubmit,
  maxRoom = 200,
  errorMessage,
  defaultValue = [{adult: 1, child: 0, childAge: []}],
}: {
  onSubmit: (param: PassengerRoomType[]) => void
  maxRoom?: number
  errorMessage?: string
  defaultValue?: PassengerRoomType[]
}) => {
  const methods = useForm<PassengerCountType>({defaultValues: {count: defaultValue}})

  const {handleSubmit} = methods

  const [errorText, setErrorText] = useState<string | null>(null)

  const isPassengerCountValidate = (value: PassengerRoomType[]) => {
    return value?.reduce((c, a) => c + a.adult + a.child, 0) <= 10
  }
  const onConfirm = (newValue: PassengerCountType) => {
    if (isPassengerCountValidate(newValue.count)) {
      const count = newValue?.count?.map((passenger) => {
        return {
          ...passenger,
          childAge: [
            ...Array(passenger.child)
              .fill(null)
              .map((child, index) => passenger.childAge[index] ?? child),
          ],
        }
      })
      onSubmit([...count])
    } else {
      setErrorText(t`the number of passengers should not be more than 10 people.`)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onConfirm)}>
        <Stack flexDirection="column" width="100%" gap={3}>
          <HotelRoomCounter maxRoom={maxRoom} />
          {errorMessage && (
            <Stack flexDirection="row" width="100%" gap={1}>
              <InfoOutlined color="error" />
              <Typography color="error">{errorMessage}</Typography>
            </Stack>
          )}
          {errorText && (
            <Stack flexDirection="row" width="100%" gap={1}>
              <InfoOutlined color="error" />
              <Typography color="error">{errorText}</Typography>
            </Stack>
          )}
          <Stack px={2} pb={2}>
            <Button type="submit" variant="contained">
              <Trans>Confirm</Trans>
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  )
}
