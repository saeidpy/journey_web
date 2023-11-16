import {t, Trans} from '@lingui/macro'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import {Card, Stack, styled, Typography} from '@mui/material'
import {set} from 'lodash'
import {Controller, useFormContext} from 'react-hook-form'
import {HotelPassengerInputTypes} from 'src/pages/hotel-passengers/HotelPassengers'
import {Button} from 'src/shared/button'
import {genderQuery} from 'src/shared/flight-ticket-info/queries/gender.query'
import {AsyncDropDown, TextInput} from 'src/shared/input'
import {useModalSheet} from 'src/shared/modal-sheet'
import {LastPassengerListModal, PASSENGER_LIST_MODAL_ID} from 'src/shared/passenger-count-modal'
import {LastPassengerResponse} from 'src/shared/types/server/hotel/HotelLastPassengerResponseType'
import {isValidIranianNationalCode} from 'src/shared/utils/nationalCodeValidator'
import {convertToPersianLetter, fixNumbers} from 'src/shared/utils/number'

const roomTexts: any = {
  '1': t`first`,
  '2': t`second`,
  '3': t`third`,
  '4': t`fourth`,
  '5': t`fifth`,
  '6': t`six`,
  '7': t`seven`,
  '8': t`eight`,
  '9': t`nine`,
  '10': t`ten`,
}

export const HotelInfoMuiCard = styled(Card)(({theme}) => ({
  padding: theme.spacing(3, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  boxShadow: '0px 0px 4px 0px ' + theme.palette.divider,
}))
const LastPassengerButton = styled(Button)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  color: theme.palette.main['primary3'],
}))

interface HotelPassengerInfoCardProps {
  roomNumber: number
  roomTitle: string
  adultCount: number
  childCount: number
  hotelTitle: string
}
type PassengerType = 'adult' | 'child'
interface PassengerInfoInputProps {
  roomNumber: number
  index: number
  type: PassengerType
}

const PassengerInfoInput = ({type, index, roomNumber}: PassengerInfoInputProps) => {
  const {control, getValues, reset} = useFormContext<HotelPassengerInputTypes>()
  const {openModal, closeModal} = useModalSheet()

  const onSubmitPassengerModal = (param: LastPassengerResponse, type: PassengerType, passengerIndex: number) => {
    const _value = {...getValues()}
    if (param['passenger_type'][0] === type) {
      set(_value, `passengers.${roomNumber}.${type}.${passengerIndex}`, {
        fullName: param.full_name,
        gender: JSON.stringify(param.gender[1]),
        nationalCode: param.national_id,
      })
    }
    reset(_value)

    closeModal()
  }
  const PassengerCountClick = (type: PassengerType, passengerIndex: number) => {
    openModal(PASSENGER_LIST_MODAL_ID, {
      content: <LastPassengerListModal selectPassenger={(passenger) => onSubmitPassengerModal(passenger, type, passengerIndex)} />,
      title: t`last passenger list`,
    })
  }

  return (
    <Stack gap={2}>
      <Stack sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'nowrap'}}>
        <Typography variant="h6" fontWeight={400}>
          {type === 'adult' ? (
            <Trans>adult passenger {roomTexts[index + 1]} :</Trans>
          ) : (
            <Trans>child passenger {roomTexts[index + 1]} :</Trans>
          )}
        </Typography>

        <LastPassengerButton onClick={() => PassengerCountClick(type, index)}>
          <PersonOutlineOutlinedIcon />
          {t`select passenger last`}
        </LastPassengerButton>
      </Stack>
      <Stack>
        <Controller
          name={`passengers.${roomNumber}.${type}.${index}.fullName`}
          control={control}
          rules={{
            required: true,
          }}
          render={({fieldState, field}) => (
            <TextInput
              {...field}
              fullWidth
              state={fieldState}
              placeholder={t`FullName`}
              helperText={fieldState.error?.message}
              title={t`FullName`}
            />
          )}
        />
      </Stack>
      <Stack>
        <Controller
          name={`passengers.${roomNumber}.${type}.${index}.gender`}
          control={control}
          rules={{
            required: true,
          }}
          render={({fieldState, field}) => (
            <AsyncDropDown
              state={fieldState}
              queryFn={genderQuery}
              queryKey={['GenderDropdown']}
              value={field.value || ''}
              getItem={(option, index) => ({label: option[0], value: JSON.stringify(option), key: index})}
              onChange={field.onChange}
              helperText={fieldState.error?.message}
              inputLabel={t`Gender`}
              placeholder={t`Gender`}
            />
          )}
        />
      </Stack>
      <Stack>
        <Controller
          name={`passengers.${roomNumber}.${type}.${index}.nationalCode`}
          control={control}
          rules={{
            required: true,
            validate: isValidIranianNationalCode,
          }}
          render={({fieldState, field}) => (
            <>
              <TextInput
                {...field}
                fullWidth
                state={fieldState}
                onChange={(e) => {
                  e.currentTarget.value = fixNumbers(e.currentTarget.value)
                  field.onChange(e)
                }}
                title={t`National code`}
                placeholder={t`National code`}
                helperText={fieldState.error?.message}
              />
            </>
          )}
        />
      </Stack>
    </Stack>
  )
}

export const HotelPassengerInfoCard = ({roomNumber, roomTitle, hotelTitle, adultCount, childCount}: HotelPassengerInfoCardProps) => {
  return (
    <HotelInfoMuiCard>
      <Stack gap={4}>
        <Typography variant="h6">
          <Trans>room {convertToPersianLetter(roomNumber + 1)} :</Trans>
          {hotelTitle}
        </Typography>

        {new Array(adultCount).fill(undefined)?.map((item, index) => (
          <PassengerInfoInput key={`adult-${index}`} type="adult" index={index} roomNumber={roomNumber} />
        ))}
        {new Array(childCount).fill(undefined)?.map((item, index) => (
          <PassengerInfoInput key={`child-${index}`} type="child" index={index} roomNumber={roomNumber} />
        ))}
      </Stack>
    </HotelInfoMuiCard>
  )
}
