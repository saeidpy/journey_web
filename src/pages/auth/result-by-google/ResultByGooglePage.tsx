import {Trans} from '@lingui/macro'
import {useMutation} from '@tanstack/react-query'
import {useEffect, useRef} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useUserProfile} from 'src/core/auth'
import {FullScreenLoading} from 'src/shared/loading'
import {authResponseToContext} from 'src/shared/utils/authResponseToContext'
import {resultByGoogleMutation} from './resultByGoogle.mutation'

export default function ResultByGooglePage() {
  const navigate = useNavigate()
  const [filterParams] = useSearchParams()
  const {mutateAsync: getToken} = useMutation(resultByGoogleMutation)
  const {setAuth} = useUserProfile()
  const isPending = useRef(false)

  useEffect(() => {
    if (!isPending.current) {
      isPending.current = true
      let state: string
      try {
        const returnUrl = window.atob(filterParams.get('state') ?? '')
        state = returnUrl.startsWith('/') ? returnUrl : '/'
      } catch {
        state = '/'
      }
      const returnUrl = encodeURIComponent(state)
      const random_hash = filterParams.get('random_hash')
      if (random_hash) {
        getToken({random_hash})
          .then((data) => {
            if (data) {
              setAuth(authResponseToContext(data), state)
              isPending.current = false
            } else {
              throw Error()
            }
          })
          .catch((err) => {
            navigate(`/login?returnUrl=${returnUrl}`)
            isPending.current = false
          })
      } else {
        navigate(`/login?returnUrl=${returnUrl}`)
      }
    }
  }, [filterParams, getToken, navigate, setAuth])

  return (
    <>
      <FullScreenLoading />
      <Trans>Redirecting...</Trans>
    </>
  )
}
