import {lazy} from 'react'
import {Route, Routes} from 'react-router-dom'

const LoginPage = lazy(
  () =>
    import(
      /* webpackChunkName: "login" */
      'src/pages/auth/login/LoginPage'
    )
)

const OtpPage = lazy(
  () =>
    import(
      /* webpackChunkName: "otp" */
      'src/pages/auth/otp/OtpPage'
    )
)

const RestorePasswordPage = lazy(
  () =>
    import(
      /* webpackChunkName: "restore-password" */
      'src/pages/auth/restore-password/RestorePasswordPage'
    )
)

const SetPasswordPage = lazy(
  () =>
    import(
      /* webpackChunkName: "set-password" */
      'src/pages/auth/set-password/SetPasswordPage'
    )
)

const TypePasswordPage = lazy(
  () =>
    import(
      /* webpackChunkName: "type-password" */
      'src/pages/auth/type-password/TypePasswordPage'
    )
)

const ResultByGooglePage = lazy(
  () =>
    import(
      /* webpackChunkName: "type-password" */
      'src/pages/auth/result-by-google/ResultByGooglePage'
    )
)

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="otp" element={<OtpPage />} />
      <Route path="restore-password" element={<RestorePasswordPage />} />
      <Route path="set-password" element={<SetPasswordPage />} />
      <Route path="type-password" element={<TypePasswordPage />} />
      <Route path="result-by-google" element={<ResultByGooglePage />} />
      <Route index element={<LoginPage />} />
    </Routes>
  )
}
