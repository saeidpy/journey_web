export interface LastPassengerResponse {
  date_of_birth: string
  first_name: string
  full_name: string
  gender: [string, [string, number]]
  last_name: string
  middle_name: string
  national_id: string
  nationality: [string, [string, string]]
  passenger_age: string
  passenger_id: string
  passenger_type: [string, [string, number]]
  passport_country_code: string
  passport_expire_date: string
  passport_issue_date: string
  passport_no: string
  title: [string, [number, string]]
}
