import {yupResolver} from '@hookform/resolvers/yup'
import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useCallback, useEffect, useRef} from 'react'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {useBookFlight} from 'src/core/book-flight/useBookFlight'
import {FlightPassengerForm, FlightPassengerInputs} from 'src/shared/flight-ticket-info'
import {flightInputValidation} from 'src/shared/flight-ticket-info/InputValidation'
import {TextInput} from 'src/shared/input'
import {Header} from 'src/shared/layouts/app-layout'
import {AgeType} from 'src/shared/types/server'
import {profileMutation} from '../profile/profile.mutation'
import {profileQuery} from '../profile/profile.query'

export default function FlightPassengerInfoPage() {
  const {
    bookFlight: {adultCount, childCount, infantCount, onNextStep, passengersInput},
    setBookFlight,
  } = useBookFlight()
  const formRef = useRef<HTMLFormElement>(null)
  const {data: profileData} = useQuery(['ProfilePage', ''], profileQuery)
  const {mutateAsync} = useMutation(profileMutation)

  const methods = useForm({
    defaultValues: {passengers: passengersInput, email: profileData?.email ?? null},
    resolver: yupResolver(flightInputValidation) as any,
    reValidateMode: 'onChange',
    mode: 'onChange',
  })

  const {handleSubmit, getValues, formState, trigger, reset} = methods

  useEffect(() => {
    reset({passengers: passengersInput, email: profileData?.email ?? null})
  }, [passengersInput, profileData?.email, reset])

  const saveEmailInProfile = useCallback(() => {
    if (!profileData?.email) {
      const values = getValues()

      mutateAsync({
        description: profileData?.description ?? '',
        phone_number: profileData?.phone_number ?? null,
        location: null,
        name: profileData?.name ?? '',
        city_id: profileData?.living_city?.city_id?.toString() ?? null,
        email: values.email ?? '',
      })
    }
  }, [mutateAsync, getValues, profileData])

  const onSubmit = useCallback(
    (form_data: {passengers: FlightPassengerInputs[]}) => {
      setBookFlight({
        passengers: Object.entries(form_data.passengers as unknown as {[key: number]: FlightPassengerInputs}).map(([i, item]) => ({
          ageType: Number(i) < adultCount ? AgeType.ADULT : Number(i) < childCount + adultCount ? AgeType.CHILD : AgeType.INFANT,
          birthday: item.birthDate,
          firstName: item.firstName,
          gender: JSON.parse(item.gender) as [string, number],
          lastName: item.lastName,
          ...(item.nationalCodeOrPassport === 'nationalCode'
            ? {
                nationalCard: true,
                nationalId: item.nationalCode,
              }
            : {
                nationalCard: false,
                nationality: JSON.parse(item.exportingCountry) as [string, string],
                passportId: item.passportNumber,
                passportIssued: item.exportingCountry,
                passportExpiryDate: item.passportExpiryDate,
              }),
        })),
      })

      saveEmailInProfile()

      return true
    },
    [adultCount, childCount, setBookFlight, saveEmailInProfile]
  )

  useEffect(() => {
    if (onNextStep) {
      onNextStep.current = async () => {
        const values = getValues()
        await trigger()
        if (formState.isValid) {
          setBookFlight({
            passengersInput: values.passengers as any,
          })
          return onSubmit(values as any)
        }
        return false
      }
      return () => {
        onNextStep.current = undefined
      }
    }
  }, [onSubmit, getValues, onNextStep, formState.isValid, trigger, setBookFlight])
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as any)} ref={formRef}>
          <Header fullWidth hasBackButton title={t`Passenger's information`} />

          <Stack pb={3}>
            {new Array(adultCount).fill(undefined).map((_, i) => (
              <FlightPassengerForm key={i} index={i} ageCategory={t`Adult`} ageType={AgeType.ADULT} />
            ))}
            {new Array(childCount).fill(undefined).map((_, i) => (
              <FlightPassengerForm key={i + adultCount} index={i + adultCount} ageCategory={t`Child`} ageType={AgeType.CHILD} />
            ))}
            {new Array(infantCount).fill(undefined).map((_, i) => (
              <FlightPassengerForm
                key={i + adultCount + childCount}
                index={i + adultCount + childCount}
                ageCategory={t`Infant`}
                ageType={AgeType.INFANT}
              />
            ))}
          </Stack>
          <Stack mb={3}>{t`Send ticket to email or mobile number`}</Stack>

          <Stack mb={10}>
            <Controller
              name={'email'}
              control={methods.control}
              rules={{
                required: true,
              }}
              render={({fieldState, field}) => (
                <TextInput
                  {...field}
                  fullWidth
                  state={fieldState}
                  title={t`Email`}
                  placeholder={t`Email`}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
        </form>
      </FormProvider>
    </>
  )
}
