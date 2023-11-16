export type SearchHotelType = {
  city_id: number | string | null
  resort_id?: null
  checkin_date: Date | string
  checkout_date: Date | string
  rooms: {
    room_no: number
    adult_count: number
    child_count: number
    child_ages: number[]
  }[]
}

export type SearchCityHotelTypeResponse = {
  session_id: string
  tickets: {[key: string]: BookingInfo}
}

export type SearchCityHotelTypeResponseList = {
  resortId: string
} & BookingInfo

type RefundableType = [string, [number, string]]

type ResidenceType = [string, [string, string]]

interface Refund {
  refund_method: null
  refundable_type: RefundableType
}

interface Residence {
  amenities: string[]
  available_rooms: number
  base_price: string
  comment_count: number
  comments: any[]
  creator: string
  description: string
  fly_today_id: number
  hash_id: string
  impression_agents: any[]
  impression_count: number
  is_valid: boolean
  location: string
  max_stay_nights: number
  media_count: number
  media_list: any[]
  min_stay_nights: number
  name_en: string
  name_fa: string
  normalized_name: string
  offer: string
  promotion: string
  residence_id: string
  residence_type: ResidenceType
  resort_id: string
  resort_type: ResidenceType
  resort_type_fa: string
  scores: any[]
  star: number
  total_popularity_score: number
  visited_count: number
  has_next?: boolean
}

interface Room {
  adult_capacity: number
  bed_group: string
  child_ages: string
  child_capacity: number
  infant_capacity: string
  meal_type: string
  name: string
  room_id: string
  room_price: string
  sharing_bed: boolean
}

interface TotalPrice {
  base: string
  tax: number
  total: number
}

interface BookingInfo {
  book_status: string
  book_unique_id: string
  checkin_date: string
  checkout_date: string
  passengers: string
  payment_deadline: string
  payment_id: string
  payment_status: string
  plain_text_cancellation: string
  refund: Refund
  reserver: string
  residence: Residence
  rooms: Room[]
  ticket_unique_hash: string
  total_price: TotalPrice
}
