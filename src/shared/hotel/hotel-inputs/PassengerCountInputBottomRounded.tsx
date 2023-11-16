import {t} from '@lingui/macro'
import {Stack, styled} from '@mui/material'
import {useCallback} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {PassengerRoomType} from 'src/core/book-hotel/useBookHotel'
import {TextInput} from 'src/shared/input'
import {useModalSheet} from 'src/shared/modal-sheet'
import {HotelPassengerCountModal, HOTEL_PASSENGER_MODAL_ID} from 'src/shared/passenger-count-modal/'

type PassengerCountInputPropsType = {
  withoutLabel?: boolean
  className?: string
}

const StyledTextInput = styled(TextInput)(({theme}) => ({
  ...theme.typography.caption,
  '& .MuiInputBase-input': {
    borderTopLeftRadius: '0 !important',
    borderTopRightRadius: '0 !important',

    backgroundColor: `${theme.palette.shades[2]} !important`,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.shades[4]}`,
  },
  '&': {marginTop: '0 !important', paddingTop: '0 important'},
}))
export const PassengerCountInputBottomRounded = (props: PassengerCountInputPropsType) => {
  const {withoutLabel = false, className = ''} = props
  const {openModal, closeModal} = useModalSheet()

  const {control, setValue, getValues} = useFormContext()

  const getPassengerCountText = useCallback((rooms: PassengerRoomType[]): string => {
    if (rooms.length) {
      const adultCount = rooms?.reduce((c, a) => c + a.adult, 0)
      const childCount = rooms?.reduce((c, a) => c + a.child, 0)
      return `${adultCount ? `${adultCount} ${t`Adult,`}` : ''} ${childCount ? `${childCount} ${t`child,`}` : ''} ${
        rooms.length
      } ${t`room`}`
    }
    return ''
  }, [])

  const onSubmitPassengerModal = (param: PassengerRoomType[]) => {
    setValue('count', param)
    closeModal()
  }

  const PassengerCountClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    openModal(HOTEL_PASSENGER_MODAL_ID, {
      content: <HotelPassengerCountModal onSubmit={onSubmitPassengerModal} defaultValue={getValues('count')} />,
      title: t`Passengers`,
      zeroPadding: true,
    })
  }
  return (
    <Stack className={className}>
      <Controller
        name="count"
        control={control}
        rules={{
          required: true,
          validate: (data) => {
            const count = data.adult + (data.child ?? 0) + (data.infant ?? 0)
            if (count < 1) {
              return false
            } else {
              return true
            }
          },
        }}
        render={({fieldState, field}) => (
          <StyledTextInput
            title={withoutLabel ? '' : t`Passengers count`}
            formControlProps={{sx: {paddingTop: '0 important'}}}
            state={fieldState}
            value={getPassengerCountText(field.value)}
            fullWidth
            onChange={field.onChange}
            onClick={PassengerCountClick}
            type="text"
            inputProps={{readOnly: true}}
            placeholder={t`Passengers count`}
            helperText={
              fieldState.error?.type === 'validate' || fieldState.error?.type === 'required' ? t`This field is required.` : undefined
            }
          />
        )}
      />
    </Stack>
  )
}
