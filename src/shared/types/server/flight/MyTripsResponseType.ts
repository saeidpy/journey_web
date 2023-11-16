import {TravelStatusEnum, TravelTypeEnum} from './TicketResponseType'

export type MyTripsType = {
  created_at: string
  book_status: [string, [number, string]]
  book_unique_id: string
  client_unique_id: string
  main_payment: MainPaymentType
  order_status: [string, [number, string]]
  provider: [string, [string]]
  refund: RefundType
  reserver: ReserverType
  seating: null
  supplement_payment: MainPaymentType
  ticket_id: number
  ticket_unique_hash: string
  ticket_variety_type: [string, [TravelTypeEnum.FLIGHT]]
  total_adult_count: null
  total_child_count: null
  total_infant_count: null
  total_price: number
}

export type TripType = {
  trips: MyTripsType[]
}

type MainPaymentType = {
  journey_payment_id: number
  order_id: string
  payment_id: string
  payment_status: TravelStatusEnum.PAID
  total_amount: number
}

type RefundType = {
  refund_method: [string, [number, string]]
  refundable_type: [string, [number, string]]
}

type ReserverType = {
  cover_picture: null
  description: null
  email: null
  living_city: null
  member_id: 2
  name: null
  national_code: null
  nationality: null
  password: null
  phone_number: null
  profile_picture: null
  resort_pic_by_me: []
  score: null
  user_name: null
}
