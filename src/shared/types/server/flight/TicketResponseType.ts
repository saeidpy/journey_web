import {BaseResponseType} from '../BaseResponseType'
import {LocationResponse} from '../shared/LocationResponse'

export enum TravelTypeEnum {
  FLIGHT = 'پرواز',
}

export enum TravelStatusEnum {
  PAID = 'پرداخت‌شده',
}

export enum StationType {
  AIRPORT = 'airport',
  HOTEL = 'hotel',
}

export enum TicketType {
  CHARTER = 'charter',
  SYSTEMIC = 'systemic',
}

export enum CabinType {
  BUSINESS = 'business',
  ECONOMY = 'economy',
  PREMIUM_ECONOMY = 'premium_economy',
}

export enum PassengerType {
  ADULT = 'adult',
  CHILD = 'child',
  INFANT = 'infant',
}

export enum RefundMethod {
  All = 'all',
  NoneRefundable = 'none_refundable',
}

export enum RefundableType {
  Offline = 'offline',
}

export enum TripType {
  OneWay = 'one_way',
  Round = 'round',
}

export interface Refund {
  refund_method: [RefundMethod, [number, string]]
  refundable_type: [RefundableType, [number, string]]
}

export interface TicketPrice {
  base: number
  tax: number
  total: number
}

export interface PassengerInfo {
  date_of_birth: null
  first_name: null
  gender: null
  last_name: null
  middle_name: null
  national_id: null
  nationality: null
  passenger_type: null
  passport_country_code: null
  passport_expire_date: null
  passport_issue_date: null
  passport_no: null
  title: null
}

export interface Passenger {
  ticket_price: TicketPrice
  passenger_count: number
  passenger_type: [PassengerType, [string, number]]
  passengers_info: PassengerInfo
}

export interface Destination {
  code: string
  location: LocationResponse
  name_en: string | null
  name_fa: string | null
  station_id: null
  station_type: [StationType, [number]]
  visited_count: number
}

export interface Airline {
  name_fa?: string
}

export interface Flight {
  airline: [string, [string, string]]
  cabin_type: [string, [string, number]]
  departure_date: Date
  departure_time: string
  destination: Destination
  destination_arrival_date_time: Date
  duration: number
  flight_no: string
  max_baggage: null | string
  remaining_seats: number
  source: Destination
  ticket_type: [TicketType, [string, number]]
}

export interface Ticket {
  book_status?: null
  book_unique_id?: null
  fare_source_code: string
  flights: Flight[]
  type_based_passengers?: Passenger[]
  refund: Refund
  reserver?: null
  total_price: TicketPrice
  trip_type: TripType
  ticket_unique_hash?: string
}

export interface TicketResponse {
  session_id: string
  tickets: Ticket[]
}

export type TicketResponseType = BaseResponseType<TicketResponse>
