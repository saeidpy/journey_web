import {t} from '@lingui/macro'
import {useMutation} from '@tanstack/react-query'
import {useEffect} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {servers} from 'src/shared/constants'
import {useMainContentScroll} from 'src/shared/layouts/app-layout'
import {useSnackbar} from '../snackbar'
import {bookHotelRevalidateMutation} from './bookHotelRevalidate.mutation'
import {useBookHotel} from './useBookHotel'

export const RequireBookHotel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const scroll = useMainContentScroll()
  const {showSnackbar} = useSnackbar()
  const {bookHotel, setBookHotel} = useBookHotel()
  const {mutateAsync} = useMutation(bookHotelRevalidateMutation)

  useEffect(() => {
    if (bookHotel.sessionId) {
      if (bookHotel.selectedRoom?.fare_source_code) {
        const interval = window.setInterval(() => {
          if (bookHotel.sessionId && bookHotel.selectedRoom?.fare_source_code) {
            mutateAsync({
              session_id: bookHotel.sessionId,
              ticket_unique_hash: bookHotel.selectedRoom.fare_source_code,
            }).catch(() => {
              setBookHotel({
                sessionId: undefined,
                selectedRoom: undefined,
              })
              showSnackbar(t`Your time for booking hotel has been invalidated`, {
                severity: 'error',
              })
              navigate('/hotel')
            })
          }
        }, servers.bookHotelRevalidateTimestamp)
        return () => {
          window.clearInterval(interval)
        }
      }
    }
  }, [bookHotel.selectedRoom?.fare_source_code, bookHotel.sessionId, mutateAsync, navigate, setBookHotel, showSnackbar])

  useEffect(() => {
    if (scroll?.current) {
      scroll.current.scroll({top: 0})
    }
  }, [location.pathname, scroll])

  return <Outlet />
}
