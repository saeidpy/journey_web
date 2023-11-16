import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {ChangeEvent, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {CustomCheckBox, TextInput} from 'src/shared/input'
import {Wrapper} from './FlightFormWrapper'

type OtherPersonPhoneNumberFormType = {
  checkboxOnChange: (checked: boolean) => void
  fieldOnChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  mobileNumberFieldName: string
}
export const OtherPersonPhoneNumberForm = (props: OtherPersonPhoneNumberFormType) => {
  const {control} = useForm()
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState<boolean>(true)
  return (
    <Wrapper>
      <Stack py={2}>
        <Stack py={2}>
          <CustomCheckBox
            control={<></>}
            onChange={(e) => {
              props.checkboxOnChange((e.target as HTMLInputElement).checked)
              setIsCheckboxDisabled(!(e.target as HTMLInputElement).checked)
            }}
            label={t`Sending ticket to other person`}
          />
        </Stack>
        <Stack py={2}>
          <Controller
            name={props.mobileNumberFieldName}
            control={control}
            render={({fieldState}) => (
              <TextInput
                fullWidth
                disabled={isCheckboxDisabled}
                onChange={(e) => {
                  props.fieldOnChange(e)
                }}
                title={t`Mobile number`}
                state={fieldState}
              />
            )}
          />
        </Stack>
      </Stack>
    </Wrapper>
  )
}
