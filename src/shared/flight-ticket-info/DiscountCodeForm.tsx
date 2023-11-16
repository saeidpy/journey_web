import {t, Trans} from '@lingui/macro'
import {Stack, Typography} from '@mui/material'
import {ChangeEvent} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Button} from 'src/shared/button'
import {TextInput} from 'src/shared/input'

type DiscountCodeFormType = {
  FieldName: string
  fieldOnChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
export const DiscountCodeForm = (props: DiscountCodeFormType) => {
  const {control} = useForm()
  return (
    <>
      <Stack py={2}>
        <Stack py={2}>
          <Typography variant="h3">
            <Trans>If you have a discount code, enter it in the field below.</Trans>
          </Typography>
        </Stack>
        <Stack py={1}>
          <Controller
            name={props.FieldName}
            control={control}
            render={({fieldState}) => (
              <TextInput
                fullWidth
                onChange={(e) => {
                  props.fieldOnChange(e)
                }}
                title={t`Discount code`}
                state={fieldState}
                placeholder={t`Discount code`}
              />
            )}
          />
        </Stack>
        <Stack>
          <Button fullWidth variant="outlined" color="inherit">
            <Trans>Submit code</Trans>
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
