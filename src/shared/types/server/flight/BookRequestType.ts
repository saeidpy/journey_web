export enum FlightType {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international',
}

export enum AgeType {
  ADULT = 1,
  CHILD = 2,
  INFANT = 3,
}

export enum Genders {
  MALE = 0,
  FEMALE = 1,
}

type BookRequestVariables =
  | {
      [key: `passenger_${number}_national_card`]: true
      [key: `passenger_${number}_nationalId`]: string
      [key: `passenger_${number}_passport_no`]: never
      [key: `passenger_${number}_passport_expire_date`]: never
      [key: `passenger_${number}_passport_country_code`]: never
      [key: `passenger_${number}_nationality`]: 'IR'
    }
  | {
      [key: `passenger_${number}_national_card`]: false
      [key: `passenger_${number}_nationalId`]: never
      [key: `passenger_${number}_passport_no`]: string
      [key: `passenger_${number}_passport_expire_date`]: string
      [key: `passenger_${number}_passport_country_code`]: string
      [key: `passenger_${number}_nationality`]: string
    }

export type BookRequestType = {
  session_id: string
  fare_source_code: string
  passenger_count: number
  [key: `passenger_${number}_age_type`]: AgeType
  [key: `passenger_${number}_birthday`]: string
  [key: `passenger_${number}_gender`]: Genders
  [key: `passenger_${number}_first_name`]: string
  [key: `passenger_${number}_last_name`]: string
} & BookRequestVariables
