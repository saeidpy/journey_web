// TODO: any other enviroments should be here

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      REACT_APP_WITH_MOCK?: string
      REACT_APP_SERVER?: string
      REACT_APP_OTP_RESEND_TIMEOUT?: string
      REACT_APP_BOOK_FLIGHT_REVALIDATE_TIMESPAN?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
