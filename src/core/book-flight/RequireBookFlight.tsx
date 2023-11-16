import {t} from '@lingui/macro'
import {useMutation} from '@tanstack/react-query'
import {useEffect, useRef} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {servers} from 'src/shared/constants'
import {useMainContentScroll} from 'src/shared/layouts/app-layout'
import {useSnackbar} from '../snackbar'
import {bookFlightRevalidateMutation} from './bookFlightRevalidate.mutation'
import {ContinueBookFlight} from './ContinueBookFlight'
import {locationToStep} from './locationToStep'
import {useBookFlight} from './useBookFlight'

export const RequireBookFlight = () => {
  const onNextStep = useRef<() => Promise<boolean>>()
  const location = useLocation()
  const navigate = useNavigate()
  const scroll = useMainContentScroll()
  const step = locationToStep(location.pathname)
  const {showSnackbar} = useSnackbar()
  const {bookFlight, setBookFlight} = useBookFlight()
  const {mutateAsync} = useMutation(bookFlightRevalidateMutation)

  useEffect(() => {
    setBookFlight({onNextStep})
  }, [onNextStep, setBookFlight])

  useEffect(() => {
    if (bookFlight.sessionId) {
      if (bookFlight.selectedTicket?.fare_source_code) {
        const interval = window.setInterval(() => {
          if (bookFlight.sessionId && bookFlight.selectedTicket?.fare_source_code) {
            mutateAsync({
              session_id: bookFlight.sessionId,
              fare_source_code: bookFlight.selectedTicket.fare_source_code,
            }).catch(() => {
              setBookFlight({
                sessionId: undefined,
                selectedTicket: undefined,
              })
              showSnackbar(t`Your time for booking flight has been invalidated`, {
                severity: 'error',
              })
              navigate('/flight')
            })
          }
        }, servers.bookFlightRevalidateTimestamp)
        return () => {
          window.clearInterval(interval)
        }
      }
    }
  }, [bookFlight.sessionId, bookFlight.selectedTicket?.fare_source_code, mutateAsync, showSnackbar, navigate, setBookFlight])

  const showContinue = step !== 'first-search' && step !== 'search-form'

  useEffect(() => {
    if (scroll?.current) {
      scroll.current.scroll({top: 0})
    }
  }, [location.pathname, scroll])

  return (
    <>
      <Outlet />
      {showContinue ? <ContinueBookFlight /> : null}
    </>
  )
}
