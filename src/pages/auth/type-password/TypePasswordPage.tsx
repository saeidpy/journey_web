import {t, Trans} from '@lingui/macro'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Button} from 'src/shared/button'
import {TextInput} from 'src/shared/input'
import {ButtonWrapper, InputWrapper} from 'src/shared/login-things'

type Inputs = {
  password: string
}

export default function TypePasswordPage() {
  const {handleSubmit, control} = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.info(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Controller
          name="password"
          control={control}
          rules={{required: true}}
          render={(field) => (
            <TextInput
              state={field.fieldState}
              title={t`Enter your password`}
              helperText={field.fieldState.error ? t`This is required.` : undefined}
            />
          )}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button variant="text" color="inherit" fullWidth>
          <Trans>Forget your password?</Trans>
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button fullWidth variant="contained" color="primary" type="submit">
          <Trans>Login</Trans>
        </Button>
      </ButtonWrapper>
    </form>
  )
}
