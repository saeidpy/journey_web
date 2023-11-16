import {t, Trans} from '@lingui/macro'
import {styled} from '@mui/material'
// import {createTheme} from '@mui/material/styles'
import {useMutation} from '@tanstack/react-query'
import {Controller, useForm} from 'react-hook-form'
import {useLocation, useNavigate} from 'react-router-dom'
import {logo} from 'src/assets/img'
import {Button} from 'src/shared/button'
import {mobileUI} from 'src/shared/constants'
import {TextInput} from 'src/shared/input'
import {ButtonWrapper, InputWrapper} from 'src/shared/login-things'
import {fixNumbers} from 'src/shared/utils/number'
import {parseParamQuery, toParamQuery} from 'src/shared/utils/paramQuery'
import {loginMutation} from './login.mutation'

type Inputs = {
  mobileOrEmail: string
}

const LogoBox = styled('div')({
  width: '100%',
  height: mobileUI.auth.logoHeight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '-60%',
})

export default function Home() {
  const {
    handleSubmit,
    control,
    // formState: {errors},
  } = useForm<Inputs>({defaultValues: {mobileOrEmail: ''}})

  const {isLoading, mutateAsync, isError} = useMutation(loginMutation)

  const navigate = useNavigate()
  const {search} = useLocation()

  const handleLogin = (datasubmit: any) => {
    const datasubmitMobile = fixNumbers(datasubmit.mobileOrEmail)

    mutateAsync(datasubmitMobile).then((res) => {
      navigate(
        {pathname: '/otp', search: toParamQuery({...parseParamQuery(search)})},
        {state: {mobileOrEmail: datasubmitMobile}, replace: true}
      )
    })
  }

  const phoneNumberPattern = /^[0-9۰-۹]|[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  return (
    <>
      <LogoBox>
        <img alt="Trip" src={logo} />
      </LogoBox>
      <br />
      <br />
      <form onSubmit={handleSubmit(handleLogin)}>
        <InputWrapper>
          <Controller
            name="mobileOrEmail"
            control={control}
            rules={{
              required: true,
              pattern: phoneNumberPattern,
            }}
            render={({fieldState, field}) => (
              <TextInput
                {...field}
                // autoFocus
                disabled={isLoading}
                fullWidth
                state={fieldState}
                title={t`Enter your phone number or email.`}
                placeholder={t`Mobile or Email`}
                helperText={
                  fieldState.error?.type
                    ? fieldState.error?.type === 'pattern'
                      ? t`This field should be either mobile or email.` // ? t`Please enter the code correctly.`
                      : t`This field is required.`
                    : isError
                    ? t`This field should be either mobile or email.`
                    : undefined
                }
              />
            )}
          />
        </InputWrapper>

        <ButtonWrapper>
          <Button variant="contained" color="primary" fullWidth type="submit">
            <Trans>Login</Trans>
          </Button>
        </ButtonWrapper>
      </form>
    </>
  )
}
