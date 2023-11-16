import {Passenger, PassengerType} from 'src/shared/types/server'

export const getPricesFromTicket = (passengers: Passenger[]) =>
  passengers.reduce<{[key in PassengerType]: number}>(
    (prev, passenger) => ({
      ...prev,
      [passenger.passenger_type[0]]: passenger.ticket_price.total,
    }),
    {[PassengerType.ADULT]: 0, [PassengerType.CHILD]: 0, [PassengerType.INFANT]: 0}
  )

export const getTotalPriceFromPrices = (data: {[key in PassengerType]: number}) => data.adult + data.child + data.infant
