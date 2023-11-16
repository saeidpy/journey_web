import axios, {AxiosError} from 'axios'
import {PropsWithChildren, useCallback, useEffect, useRef, useState} from 'react'
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {servers} from 'src/shared/constants'
import {Profile} from 'src/shared/types/server'
import {authResponseToContext} from 'src/shared/utils/authResponseToContext'
import {setAxiosWithAuth, simpleAxios} from 'src/shared/utils/axios'
import {getAuthData, setAuthData} from 'src/shared/utils/localstorage'
import {evanoMutation} from './evano.mutation'
import {profileMutation} from './profile.mutation'
import {refreshTokenMutation} from './refreshToken.mutation'
import {UserContext, UserContextValue, useUserProfile} from './UserContext'

export interface RequireAuthProps {}

export function RequireAuth() {
  const user = useUserProfile()
  const location = useLocation()

  if (!(user?.refreshToken && user.token && user.user)) {
    return <Navigate to={{pathname: '/login', search: `returnUrl=${location.pathname}${encodeURIComponent(location.search)}`}} replace />
  }

  return <Outlet />
}

const handleRefreshToken = async (refreshToken: string) => {
  try {
    const accessToken = await refreshTokenMutation(refreshToken)

    if (accessToken) {
      return authResponseToContext({
        refresh_token: refreshToken,
        access_token: accessToken,
      })
    }
  } catch {}
}

export interface AuthGuardProps {}

export function AuthGuard({children}: PropsWithChildren<AuthGuardProps>) {
  if (!servers.apiUrl) {
    throw new Error(
      'apiUrl is empty, these should be provided in .env file in order for the app to work.\n' +
        'Please add REACT_APP_SERVER in your .env files and rebuild this again'
    )
  }
  const [auth, setAuth] = useState(getAuthData)
  const navigate = useNavigate()
  const nextUrl = useRef<string>()
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const evanoId = searchParams.get('id')
  console.log('evano', evanoId)

  const handleSetAuth = useCallback((data: Omit<UserContextValue, 'setAuth' | 'setUser'> | undefined, url?: string) => {
    setAuth(data)
    nextUrl.current = url
  }, [])

  useEffect(() => {
    if (evanoId && evanoId.length > 0) {
      evanoMutation(simpleAxios, evanoId).then((res) => {
        setAuthData({refreshToken: res?.refresh_token, token: res?.access_token, tokenType: 'Bearer'})
        setAuth({token: res?.access_token, refreshToken: res?.refresh_token, tokenType: 'Bearer'})
      })
    } else {
      // todo: evano id fail
    }
  }, [evanoId])
  useEffect(() => {
    if (auth?.token) {
      const instance = axios.create({
        baseURL: servers.apiUrl,
        headers: {
          Authorization: `${auth.tokenType} ${auth.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      instance.interceptors.request.use(async (config) => {
        if (auth.refreshToken && auth.tokenExpireTimestamp && auth.tokenExpireTimestamp <= new Date().getTime()) {
          const response = await handleRefreshToken(auth.refreshToken)
          if (response) {
            setAuth((prevAuth) => ({
              ...prevAuth,
              ...response,
            }))
            config.headers.Authorization = `${response.tokenType} ${response.token}`
            instance.defaults.headers.common.Authorization = `${response.tokenType} ${response.token}`
          } else {
            setAuth(undefined)
            throw new Error('Could not refresh token', {
              cause: 'Could not refresh token',
            })
          }
        }
        return config
      })
      instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError & {config: {_retry: boolean} | undefined}) => {
          const originalRequest = error.config ?? {headers: {Authorization: ''}, _retry: false}
          if ((error?.response?.status === 403 || error?.response?.status === 401) && !originalRequest._retry && auth.refreshToken) {
            originalRequest._retry = true
            const response = await handleRefreshToken(auth.refreshToken)
            if (response) {
              setAuth((prevAuth) => ({
                ...prevAuth,
                ...response,
              }))
              originalRequest.headers.Authorization = `${response.tokenType} ${response.token}`
              instance.defaults.headers.common.Authorization = `${response.tokenType} ${response.token}`

              return instance(originalRequest)
            } else {
              setAuth(undefined)
              throw new Error('Could not refresh token', {
                cause: 'Could not refresh token',
              })
            }
          } else if (error?.response?.status === 403 || error?.response?.status === 401) {
            setAuth(undefined)
          }
          throw error
        }
      )
      profileMutation(instance).then((data) => {
        setAuth((prevAuth) => ({...prevAuth, user: data}))
      })
      setAxiosWithAuth(instance)
    }
  }, [auth?.token, auth?.refreshToken, auth?.tokenType, auth?.tokenExpireTimestamp])

  useEffect(() => {
    setAuthData(auth)
    if (nextUrl.current && auth?.user) {
      navigate(nextUrl.current, {replace: true})
      nextUrl.current = undefined
    }
  }, [auth, navigate])

  const setUser = useCallback((user: Partial<Profile>) => {
    setAuth((prev) => ({
      ...prev,
      user: {
        ...((prev || {}).user || {}),
        ...(Object.keys(user) as (keyof Profile)[])
          .filter((key) => !!user[key])
          .reduce((prev, cur) => ({...prev, [cur]: user[cur]}), {} as Partial<Profile>),
      },
    }))
  }, [])

  return <UserContext.Provider value={{...auth, setAuth: handleSetAuth, setUser}}>{children}</UserContext.Provider>
}
