import {defineMessage, Trans} from '@lingui/macro'
import {styled} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {MouseEvent, useCallback, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import {logo} from 'src/assets/img'
import {useUserProfile} from 'src/core/auth'
import {loginMutation} from 'src/pages/auth/login/login.mutation'
import {Button} from 'src/shared/button'
import {mobileUI} from 'src/shared/constants'
import {TextInput} from 'src/shared/input'
import {ButtonWrapper, InputWrapper} from 'src/shared/login-things'
import {authResponseToContext} from 'src/shared/utils/authResponseToContext'
import {fixNumbers} from 'src/shared/utils/number'
import {} from 'src/shared/utils/paramQuery'
import {otpMutation} from './otp.mutation'
import {OtpResend} from './OtpResend'

type Inputs = {
  oneTimePassword: string
}

defineMessage({
  message: 'Phone',
})

defineMessage({
  message: 'Email',
})

const LogoBox = styled('div')({
  width: '100%',
  height: mobileUI.auth.logoHeight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20%',
})

export default function OtpPage() {
  const [date, setDate] = useState(new Date())
  const {isLoading, mutateAsync, isError} = useMutation(otpMutation)
  const {isLoading: resendIsLoading, mutateAsync: resendMutate} = useMutation(loginMutation)
  const {setAuth} = useUserProfile()
  const navigate = useNavigate()
  const [filterParams] = useSearchParams()
  const validationType = filterParams.get('type') ?? ''

  const checkForEmail = (text: string) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
    return emailRegex.test(text)
  }

  const {handleSubmit, control} = useForm<Inputs>({
    defaultValues: {
      oneTimePassword: '',
    },
  })

  const location = useLocation()
  const mobileEmail = location.state?.mobileOrEmail || ''

  const handleResend = useCallback(
    (event?: MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault()
      resendMutate(mobileEmail).then(() => {
        setDate(new Date())
      })
    },
    [resendMutate, mobileEmail]
  )

  const editNumber = () => {
    navigate({
      pathname: '/login',
      search: filterParams.get('returnUrl') ? `returnUrl=${filterParams.get('returnUrl')}` : '',
    })
  }

  const onSubmit = useCallback(
    (data: Inputs) => {
      let state: string
      try {
        const returnUrl = filterParams.get('returnUrl') ?? ''
        state = returnUrl.startsWith('/') ? returnUrl : '/'
      } catch {
        state = '/'
      }
      mutateAsync({
        verification_code: fixNumbers(data.oneTimePassword),
        ...(checkForEmail(mobileEmail) ? {email: mobileEmail} : {phone_number: mobileEmail}),
      }).then((data) => {
        if (data) {
          const dataAuth = {
            refresh_token: data.refresh_token,
            //@ts-ignore
            access_token: data?.token,
          }
          setAuth(
            authResponseToContext(dataAuth, {
              ...data.member,
              resort_pic_by_me: data.member.resort_pic_by_me ?? [],
              score: data.member.score ?? 0.0,
            }),
            state
          )
        } else {
          // setErrorVerification(true)
        }
      })
    },
    [mutateAsync, mobileEmail, filterParams, setAuth]
  )

  return (
    <>
      <LogoBox>
        <img alt="Trip" src={logo} />
      </LogoBox>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Controller
            name="oneTimePassword"
            control={control}
            rules={{
              required: true,
              //pattern: /^[0-9۰-۹]{4}$/,
              //pattern: /^[G@rde$h1]{8}$/,
              // pattern: /[A-Za-z0-9!@#$%^&*()-_=+[\]{}|;:'",.<>/?]{8}$/,
            }}
            render={({fieldState, field}) => (
              <TextInput
                {...field}
                fullWidth
                state={fieldState}
                title={`کد ارسال شده را وارد کنید  `}
                placeholder={`- - - -`}
                helperText={
                  fieldState.error?.type
                    ? fieldState.error?.type === 'pattern'
                      ? `لطفا کد را صحیح وارد نمایید `
                      : `این فیلد اجباری است  .`
                    : isError
                    ? `کد وارد شده اشتباه است .`
                    : undefined
                }
                inputProps={{
                  sx: {
                    letterSpacing: 30,
                    paddingRight: '30px !important',
                    paddingLeft: '0 !important',
                    textAlign: 'center',
                    direction: 'ltr /* @noflip */',
                  },
                }}
                autoComplete="one-time-code"
                autoFocus
              />
            )}
          />
        </InputWrapper>
        <OtpResend date={date} disabled={resendIsLoading} onResend={handleResend} />
        <ButtonWrapper>
          <Button variant="outlined" color="primary" fullWidth onClick={editNumber}>
            <Trans>Edit {validationType}</Trans>
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button fullWidth variant="contained" color="primary" type="submit" disabled={isLoading}>
            <Trans>Login</Trans>
          </Button>
        </ButtonWrapper>
      </form>
    </>
  )
}
