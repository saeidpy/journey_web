import {useCallback} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

export const useHandleBack = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const handleBackButton = useCallback(
    (replace?: boolean) => {
      if (location.key !== 'default') {
        navigate(-1)
      } else {
        navigate('..', {replace})
      }
    },
    [location.key, navigate]
  )
  return handleBackButton
}
