import {t, Trans} from '@lingui/macro'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {Button} from 'src/shared/button'
import {TextInput} from 'src/shared/input'
import {ButtonWrapper, InputWrapper} from 'src/shared/login-things'

type Inputs = {
  email: string
}
export default function RestorePasswordPage() {
  const {handleSubmit, control} = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.info(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Controller
          name="email"
          control={control}
          rules={{required: true}}
          render={(field) => (
            <TextInput
              state={field.fieldState}
              title={t`Enter your email`}
              helperText={field.fieldState.error ? t`This is required.` : undefined}
            />
          )}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button fullWidth variant="contained" color="primary" type="submit">
          <Trans>Submit</Trans>
        </Button>
      </ButtonWrapper>
    </form>
  )
}
