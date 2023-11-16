import {t} from '@lingui/macro'
import {isValidIranianNationalCode} from 'src/shared/utils/nationalCodeValidator'
import * as Yup from 'yup'
import {isValidPassportNumber} from '../utils/passportNumberValidator'
import {FlightPassengerInputs} from './FlightPassengerForm'

const testUniqueNationalCode: Yup.TestFunction = (value, ctx) => {
  const allPassengers = (ctx?.from?.[ctx?.from?.length - 1].value?.passengers ?? []) as FlightPassengerInputs[]
  const nationalCodes = allPassengers?.map((item) => {
    return item.nationalCode
  })
  const uniqueNationalCode = [...new Set(nationalCodes)]
  return nationalCodes.length === uniqueNationalCode.length
}

const passportValidation = Yup.string().when('nationalCodeOrPassport', {
  is: 'passport',
  then: (schema) => schema.required(t`This field is required.`),
})

export const flightInputValidation = Yup.object().shape({
  passengers: Yup.array().of(
    Yup.object().shape({
      nationalCode: Yup.string().when('nationalCodeOrPassport', {
        is: 'nationalCode',
        then: (schema) =>
          schema
            .required(t`This field is required.`)
            .test('unique-national-code', t`This national code is a duplicate`, testUniqueNationalCode)
            .test('valid-nation-code', t`This national code is not correct`, isValidIranianNationalCode),
      }),
      nationalCodeOrPassport: Yup.string()
        .oneOf(['passport', 'nationalCode'])
        .required(t`This field is required.`),
      firstName: Yup.string().required(t`This field is required.`),
      lastName: Yup.string().required(t`This field is required.`),
      gender: Yup.string().required(t`This field is required.`),
      birthDate: Yup.string().required(t`This field is required.`),
      birthPlace: passportValidation,
      exportingCountry: passportValidation,
      passportNumber: Yup.string().when('nationalCodeOrPassport', {
        is: 'passport',
        then: (schema) =>
          schema
            .required(t`This field is required.`)
            .test('valid-nation-code', t`This passport number is not correct`, isValidPassportNumber),
      }),
      passportExpiryDate: passportValidation,
    })
  ),
  email: Yup.string()
    .email(t`Wrong e-mail format`)
    .required(t`This field is required.`),
})
