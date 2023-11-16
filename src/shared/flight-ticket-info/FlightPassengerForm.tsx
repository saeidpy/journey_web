import {t} from '@lingui/macro'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import {Stack, styled, useTheme} from '@mui/material'
import {MobileDatePicker} from '@mui/x-date-pickers'
import {set} from 'lodash'
import {Controller, ControllerRenderProps, useFormContext} from 'react-hook-form'
import {AsyncDropDown, BasicRadio, StandardTextField, TextInput} from 'src/shared/input'
import {Tag} from 'src/shared/label'
import {useModalSheet} from 'src/shared/modal-sheet'
import {LastPassengerListModal, PASSENGER_LIST_MODAL_ID} from 'src/shared/passenger-count-modal'
import {AgeType} from 'src/shared/types/server'
import {fixNumbers} from '../utils/number'
import {Wrapper} from './FlightFormWrapper'
import {countriesQuery} from './queries/countries.query'
import {genderQuery} from './queries/gender.query'

type FlightPassengerFormType = {
  ageCategory: string
  ageType: AgeType
  index: number
}

export type FlightPassengerInputs = {
  nationalCodeOrPassport: 'passport' | 'nationalCode'
  firstName: string
  lastName: string
  gender: string
  nationalCode: string
  birthDate: string
  birthPlace: string
  exportingCountry: string
  passportNumber: string
  passportExpiryDate: string
}

const LastPassenger = styled(Stack)(({theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.main['primary3'],
}))
const CustomWrapper = styled(Wrapper)(({theme}) => ({
  paddingBottom: theme.spacing(8),
}))
export const FlightPassengerForm = ({ageCategory, ageType, index}: FlightPassengerFormType) => {
  const theme = useTheme()

  const {watch, control, reset, getValues} = useFormContext<{passengers: FlightPassengerInputs[]}>()

  ////////////
  //TODO: refactor this and move it to date input
  const today = new Date()
  const timestampNow = today.getTime()
  const yearToMilliSeconds = 365 * 24 * 60 * 60 * 1000
  const monthToMilliSeconds = 30 * 24 * 60 * 60 * 1000
  const shouldYoungerThan =
    timestampNow -
    (ageType === AgeType.INFANT ? 2 : ageType === AgeType.CHILD ? 12 : timestampNow / yearToMilliSeconds + 48) * yearToMilliSeconds
  const shouldOlderThan = timestampNow - (ageType === AgeType.INFANT ? 0 : ageType === AgeType.CHILD ? 2 : 12) * yearToMilliSeconds
  const passportExpiryDateAllows = timestampNow + monthToMilliSeconds * 6
  /////////////////

  const {openModal, closeModal} = useModalSheet()
  const nationalCodeOrPassport = watch(`passengers.${index}.nationalCodeOrPassport`)

  const onSubmitPassengerModal = (param: any, passengerIndex: number) => {
    const _value = {...getValues()}
    set(_value, `passengers.${passengerIndex.toString()}`, {
      nationalCodeOrPassport: param.national_id ? 'nationalCode' : 'passport',
      firstName: param.first_name,
      lastName: param.last_name,
      gender: JSON.stringify(param.gender[1]),
      nationalCode: param.national_id,
      birthDate: param.date_of_birth,
    })
    reset(_value)
    closeModal()
  }
  const PassengerCountClick = (passengerIndex: number) => {
    openModal(PASSENGER_LIST_MODAL_ID, {
      content: <LastPassengerListModal selectPassenger={(passenger) => onSubmitPassengerModal(passenger, passengerIndex)} />,
      title: t`last passenger list`,
    })
  }

  const radioOnChange = (
    event: React.ChangeEvent<any>,
    field: ControllerRenderProps<
      {
        passengers: FlightPassengerInputs[]
      },
      `passengers.${number}.nationalCodeOrPassport`
    >
  ) => {
    field.onChange((event.target as HTMLInputElement).value)
    const _value = {...getValues()}
    set(_value, `passengers.${index}`, {
      nationalCodeOrPassport: event.target.value,
      firstName: '',
      lastName: '',
      gender: '',
      nationalCode: '',
      birthDate: '',
    })
    reset(_value)
  }

  return (
    <CustomWrapper>
      <Stack pt={2} pb={1} flexDirection="row">
        <Stack flex={1} justifyContent="center">
          <Tag>{ageCategory}</Tag>
        </Stack>
        <Stack flex={3} pr={8} justifyContent="center">
          <Controller
            name={`passengers.${index}.nationalCodeOrPassport`}
            control={control}
            rules={{
              required: true,
            }}
            defaultValue="nationalCode"
            render={({fieldState, field}) => (
              <BasicRadio
                RadioList={[
                  {label: t`National code`, value: 'nationalCode'},
                  {label: t`Passport`, value: 'passport'},
                ]}
                {...field}
                label={''}
                state={fieldState}
                control={<></>}
                value={field.value}
                onChange={(e) => radioOnChange(e, field)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>
      </Stack>

      <LastPassenger onClick={() => PassengerCountClick(index)}>
        <PersonOutlineOutlinedIcon />
        {t`select passenger last`}
      </LastPassenger>

      <Stack pt={2} pb={1}>
        <Controller
          name={`passengers.${index}.firstName`}
          control={control}
          rules={{
            required: true,
          }}
          render={({fieldState, field}) => (
            <TextInput
              {...field}
              fullWidth
              state={fieldState}
              title={t`Name`}
              placeholder={t`Name`}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Stack>
      <Stack pt={2} pb={1}>
        <Controller
          name={`passengers.${index}.lastName`}
          control={control}
          rules={{
            required: true,
          }}
          render={({fieldState, field}) => (
            <TextInput
              {...field}
              fullWidth
              state={fieldState}
              title={t`Family`}
              placeholder={t`Family`}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Stack>
      <Stack pt={2} pb={1}>
        <Controller
          name={`passengers.${index}.gender`}
          control={control}
          rules={{
            required: true,
          }}
          render={({fieldState, field}) => (
            <>
              <AsyncDropDown
                state={fieldState}
                queryFn={genderQuery}
                queryKey={['GenderDropdown']}
                value={field.value || ''}
                onChange={field.onChange}
                getItem={(option, index) => ({label: option[0], value: JSON.stringify(option), key: index})}
                helperText={fieldState.error?.message}
                inputLabel={t`Gender`}
                placeholder={t`Gender`}
              />
            </>
          )}
        />
      </Stack>
      {nationalCodeOrPassport !== 'passport' ? (
        <Stack pt={2} pb={1}>
          <Controller
            name={`passengers.${index}.nationalCode`}
            control={control}
            rules={{
              required: true,
            }}
            render={({fieldState, field}) => (
              <TextInput
                {...field}
                fullWidth
                state={fieldState}
                onChange={(e) => {
                  e.currentTarget.value = fixNumbers(e.currentTarget.value)
                  field.onChange(e.currentTarget.value)
                }}
                title={t`National code`}
                placeholder={t`National code`}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>
      ) : null}
      <Stack pt={2} pb={1}>
        <Controller
          name={`passengers.${index}.birthDate`}
          control={control}
          rules={{
            required: true,
          }}
          render={({fieldState, field}) => (
            <MobileDatePicker
              disableFuture
              shouldDisableDate={(day: Date) => day.getTime() < shouldYoungerThan || day.getTime() > shouldOlderThan}
              inputFormat="yyyy-MM-dd"
              inputRef={field.ref}
              value={field.value ?? null}
              DialogProps={{dir: theme.direction}}
              onChange={field.onChange}
              renderInput={(params) => (
                <StandardTextField
                  {...params}
                  {...field}
                  fullWidth
                  state={fieldState}
                  title={t`Birth date`}
                  helperText={fieldState.error?.message}
                  InputLabelProps={{shrink: false}}
                  placeholder={t`Birth date`}
                />
              )}
            />
          )}
        />
      </Stack>
      {nationalCodeOrPassport === 'passport' ? (
        <>
          <Stack pt={2} pb={1}>
            <Controller
              name={`passengers.${index}.birthPlace`}
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <AsyncDropDown
                  state={fieldState}
                  queryFn={countriesQuery}
                  queryKey={['CountriesDropdown']}
                  getItem={(option, index) => ({label: option[0], value: JSON.stringify(option), key: index})}
                  helperText={fieldState.error?.message}
                  inputLabel={t`Birth place country`}
                  placeholder={t`Birth place country`}
                  {...field}
                />
              )}
            />
          </Stack>

          <Stack pt={2} pb={1}>
            <Controller
              name={`passengers.${index}.exportingCountry`}
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <AsyncDropDown
                  state={fieldState}
                  queryFn={countriesQuery}
                  queryKey={['CountriesDropdown']}
                  getItem={(option, index) => ({label: option[0], value: JSON.stringify(option), key: index})}
                  helperText={fieldState.error?.message}
                  inputLabel={t`Exporting country`}
                  placeholder={t`Exporting country`}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name={`passengers.${index}.passportNumber`}
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <TextInput
                  {...field}
                  fullWidth
                  state={fieldState}
                  title={t`Passport number`}
                  placeholder={t`Passport number`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
          <Stack pt={2} pb={1}>
            <Controller
              name={`passengers.${index}.passportExpiryDate`}
              control={control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <MobileDatePicker
                  disablePast
                  shouldDisableDate={(date) => date.getTime() < passportExpiryDateAllows}
                  inputRef={field.ref}
                  inputFormat="yyyy-MM-dd"
                  value={field.value ?? null}
                  onChange={field.onChange}
                  DialogProps={{dir: theme.direction}}
                  renderInput={(params) => (
                    <StandardTextField
                      {...params}
                      {...field}
                      fullWidth
                      state={fieldState}
                      InputLabelProps={{shrink: false}}
                      helperText={fieldState.error?.message}
                      title={t`Expiry date of passport`}
                      placeholder={t`Expiry date of passport`}
                    />
                  )}
                />
              )}
            />
          </Stack>
        </>
      ) : null}
    </CustomWrapper>
  )
}
