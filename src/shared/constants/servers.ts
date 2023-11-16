// TODO: change servers here

const otpResendTimeout = Number(process.env.REACT_APP_OTP_RESEND_TIMEOUT)
const bookFlightRevalidateTimestamp = Number(process.env.REACT_APP_BOOK_FLIGHT_REVALIDATE_TIMESPAN)
const bookHotelRevalidateTimestamp = Number(process.env.REACT_APP_BOOK_HOTEL_REVALIDATE_TIMESTAMP)

export const servers = {
  apiUrl: process.env.REACT_APP_SERVER,
  withMock: process.env.REACT_APP_WITH_MOCK === 'true',
  otpResendTimeout: Number.isNaN(otpResendTimeout) ? 5 : otpResendTimeout,
  bookFlightRevalidateTimestamp: Number.isNaN(bookFlightRevalidateTimestamp) ? 60_000 : bookFlightRevalidateTimestamp,
  bookHotelRevalidateTimestamp: Number.isNaN(bookHotelRevalidateTimestamp) ? 60_000 : bookFlightRevalidateTimestamp,
}
