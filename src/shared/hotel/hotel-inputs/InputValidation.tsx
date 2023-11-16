import {t} from '@lingui/macro'
import {PassengerInputType} from 'src/core/book-hotel/useBookHotel'
import {isValidIranianNationalCode} from 'src/shared/utils/nationalCodeValidator'
import * as Yup from 'yup'

const testUniqueNationalCode: Yup.TestFunction = (value, ctx) => {
  const allPassengers = (ctx?.from?.[ctx?.from?.length - 1].value?.passengers ?? []) as PassengerInputType[]
  const nationalCodes = allPassengers?.flatMap((item) => {
    const adultNationalCodes = item?.adult?.map((adultItem) => adultItem.nationalCode) ?? []
    const childNationalCodes = item?.child?.map((childItem) => childItem.nationalCode) ?? []
    return [...adultNationalCodes, ...childNationalCodes]
  })
  const uniqueNationalCode = [...new Set(nationalCodes)]
  return nationalCodes.length === uniqueNationalCode.length
}

export const hotelInputValidation = Yup.object().shape({
  passengers: Yup.array().of(
    Yup.object().shape({
      adult: Yup.array().of(
        Yup.object().shape({
          fullName: Yup.string().required(t`This field is required.`),
          gender: Yup.string().required(t`This field is required.`),
          nationalCode: Yup.string()
            .required(t`This field is required.`)
            .test('unique-national-code', t`This national code is a duplicate`, testUniqueNationalCode)
            .test('valid-nation-code', t`This national code is not correct`, isValidIranianNationalCode),
        })
      ),
      child: Yup.array().of(
        Yup.object().shape({
          fullName: Yup.string().required(t`This field is required.`),
          gender: Yup.string().required(t`This field is required.`),
          nationalCode: Yup.string()
            .required(t`This field is required.`)
            .test('unique-national-code', t`This national code is a duplicate`, testUniqueNationalCode)
            .test('valid-nation-code', t`This national code is not correct`, isValidIranianNationalCode),
        })
      ),
    })
  ),
})
