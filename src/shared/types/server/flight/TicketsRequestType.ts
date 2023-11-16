export interface TicketsRequestType {
  source_code: string
  destination_code: string
  departure_date: string
  return_date?: string
  min_price?: string
  max_price?: string
  ticket_type?: string
  airline_type?: string
  sort_type?: string
  flight_departure_time?: string
  adult_count: number
  child_count: number
  infant_count: number
}
