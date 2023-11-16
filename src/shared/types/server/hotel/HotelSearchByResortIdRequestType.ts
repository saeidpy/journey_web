export type HotelSearchByResortIdRequestType = {
  city_id: number | null
  resort_id: number | null
  checkin_date: string
  checkout_date: string
  rooms: hotelRoomPassenger[]
}

export type hotelRoomPassenger = {
  room_no: number
  adult_count: number
  child_count: number
  child_ages: number[]
}
