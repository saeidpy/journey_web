import {t, Trans} from '@lingui/macro'
import {styled} from '@mui/material'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Button} from 'src/shared/button'
import {TextInput} from 'src/shared/input'
import {ButtonWrapper, InputWrapper} from 'src/shared/login-things'

type Inputs = {
  password: string
  confirmPassword: string
}

const PageTitle = styled('div')(({theme}) => ({
  padding: theme.spacing(3, 1),
}))

export default function SetPasswordPage() {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.info(data)
  return (
    <>
      <PageTitle>
        <h3>
          <Trans>Set password</Trans>
        </h3>
      </PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Controller
            name="password"
            control={control}
            rules={{required: true}}
            render={(field) => (
              <TextInput
                placeholder="1234"
                state={field.fieldState}
                title={t`Password`}
                helperText={field.fieldState.error ? t`This is required.` : undefined}
              />
            )}
          />
        </InputWrapper>
        <InputWrapper sx={{pb: 50}}>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{required: true}}
            render={(field) => (
              <TextInput
                placeholder="1234"
                state={field.fieldState}
                title={t`Re-enter password`}
                helperText={field.fieldState.error ? t`This is required.` : undefined}
              />
            )}
          />
          {errors.confirmPassword && (
            <span>
              <Trans>This is required.</Trans>
            </span>
          )}
        </InputWrapper>
        <ButtonWrapper>
          <Button fullWidth variant="contained" color="primary" type="submit">
            <Trans>Submit</Trans>
          </Button>
        </ButtonWrapper>
      </form>
    </>
  )
}
