import {t} from '@lingui/macro'
import {Stack} from '@mui/material'
import {useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {Calendar} from 'src/assets/icons'
import {RangeDatePicker, StandardTextField} from 'src/shared/input'

interface HotelDateInputProps {
  withoutLabel?: boolean
  className?: string
}

const toLocaleDate = (date: string) => new Date(date).toLocaleDateString('fa-IR')
const HotelDateInput = (props: HotelDateInputProps) => {
  const {withoutLabel = false, className = ''} = props
  const [open, setOpen] = useState(false)

  const {control, getValues} = useFormContext()
  const value = getValues('rangeDate.0') ? t`${toLocaleDate(getValues('rangeDate.0'))} to ${toLocaleDate(getValues('rangeDate.1'))}` : ''

  return (
    <Stack className={className}>
      <Controller
        name="rangeDate"
        control={control}
        rules={{required: true}}
        render={({fieldState, field}) => (
          <RangeDatePicker
            open={open}
            setOpen={setOpen}
            value={[null, null]}
            state={fieldState}
            disablePast
            onChange={(data: [Date | null, Date | null]) => {
              field.onChange(data)
            }}
            onAccept={(data) => {}}
            fullWidth
            renderInput={(params) => (
              <StandardTextField
                title={withoutLabel ? '' : t`Select Date`}
                state={fieldState}
                fullWidth
                onChange={(data) => {
                  field.onChange(data)
                }}
                onClick={() => {
                  setOpen(true)
                }}
                value={value}
                placeholder={t`Arrival and departure date`}
                helperText={fieldState.error?.type === 'required' ? t`This field is required.` : undefined}
                InputProps={{
                  ...params.InputProps,
                  readOnly: true,
                  startAdornment: (
                    <Stack mr={1}>
                      {params.InputProps?.endAdornment}
                      <Calendar color="inherit" />
                    </Stack>
                  ),
                }}
              />
            )}
          />
        )}
      />
    </Stack>
  )
}

export default HotelDateInput
