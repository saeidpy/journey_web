export type HotelSearchByResortIdType = {
  tickets: HotelTicketType[]
  session_id: string
}
type SeatingType = {
  bed_group: string // Adjust the type of bed_group as needed
  // Add other properties if needed
}

export type HotelTicketType = {
  seating?: SeatingType[] | undefined // Make seating optional

  _adult_count: null
  _child_count: null
  _infant_count: null
  book_status: null
  book_unique_id: null
  check_in_date: Date
  check_out_date: Date
  passengers: null
  payment_deadline: Date
  payment_id: null
  payment_status: null
  plain_text_cancellation: null
  refund: {
    refund_method: null
    refundable_type: [string, [number, string]]
  }
  reserver: null
  residence: ResidenceType
  rooms: RoomType[]
  ticket_unique_hash: string
  total_price: TicketPriceType
}

type ResidenceType = {
  amenities: string[]
  available_rooms: number
  base_price: null
  comment_count: number
  comments: []
  creator: null
  description: null
  fly_today_id: number
  hash_id: null
  impression_agents: []
  impression_count: number
  is_valid: boolean
  location: null
  max_stay_nights: number
  media_count: number
  media_list: []
  min_stay_nights: number
  name_en: null
  name_fa: string
  normalized_name: null
  offer: null
  promotion: null
  residence_id: number
  residence_type: [string, string[]]
  residence_type_name_fa: string
  resort_id: number
  resort_type: [string, string[]]
  resort_type_fa: string
  scores: []
  star: 0
  total_popularity_score: 0
  visited_count: 0
}

type TicketPriceType = {base: null; tax: number; total: number}

type RoomType = {
  adult_capacity: number
  bed_group: string
  child_ages: string[]
  child_capacity: number
  infant_capacity: null
  meal_type: string
  name: string
  room_id: string
  sharing_bed: boolean
}
