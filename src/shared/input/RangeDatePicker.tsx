import {FormControl, Stack, styled, useTheme} from '@mui/material'
import {MobileDatePicker, PickersDay, pickersDayClasses, PickersDayProps} from '@mui/x-date-pickers'
import {forwardRef, useState} from 'react'
import {StandardTextField} from './StandartTextField'
import {RangeDatePickerProps} from './types'
// import {t} from '@lingui/macro'

const CustomPickersDay = styled(PickersDay<Date>)(({theme}) => ({
  [`&&.${pickersDayClasses.root}`]: {
    margin: 0,
  },
  [`&&.${pickersDayClasses.selected}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [`&&.innerDay`]: {
    backgroundColor: theme.palette.secondary.light,
  },
}))

const CustomFirstPickersDayWrapper = styled(Stack)(({theme}) => ({
  borderTopLeftRadius: '60%',
  borderBottomLeftRadius: '60%',
  backgroundColor: theme.palette.secondary.light,

  [`&>.MuiStack-root`]: {
    borderRadius: '100%',
    padding: theme.spacing(0, 0.25),
  },
  [`& button`]: {
    borderRadius: '100%',
  },
}))

const CustomInnerPickersDayWrapper = styled(Stack)(({theme, children}) => ({
  backgroundColor: theme.palette.secondary.light,
  [`&>.MuiStack-root`]: {
    padding: theme.spacing(0, 0.25),
  },
}))
const CustomLastPickersDayWrapper = styled(Stack)(({theme}) => ({
  borderTopRightRadius: '60%',
  borderBottomRightRadius: '60%',
  backgroundColor: theme.palette.secondary.light,
  [`&>.MuiStack-root`]: {
    borderRadius: '100%',
    padding: theme.spacing(0, 0.25),
  },
  [`& button`]: {
    borderRadius: '100%',
  },
}))

export const InputForDepartureDate = styled(StandardTextField)(({theme, state}) => ({
  '&>div': {
    borderRadius: theme.spacing(1),
    borderTopRightRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
    border: `1px solid ${state.error ? theme.palette.error.main : undefined}`,
  },
  '& input': {
    padding: `${theme.spacing(1, 2)} !important`,
    height: theme.spacing(4),
  },
}))

export const InputForReturnDate = styled(StandardTextField)(({theme, state}) => ({
  '&>div': {
    borderRadius: theme.spacing(1),
    borderTopLeftRadius: '0 !important',
    borderBottomLeftRadius: '0 !important',
    border: `1px solid ${state.error ? theme.palette.error.main : undefined}`,
  },
  '& input': {
    padding: `${theme.spacing(1, 2)} !important`,
    height: theme.spacing(4),
  },
}))

export const RangeDatePicker = forwardRef<HTMLInputElement, RangeDatePickerProps>(
  (
    {formControlProps, titleProps, id, helperTextProps, title, onChange, helperText, state, fullWidth, open, setOpen, renderInput, ...rest},
    ref
  ) => {
    // const internalId = useId()
    const theme = useTheme()
    const color = !state.error && state.isDirty ? 'success' : state.error ? 'error' : state.invalid ? 'warning' : undefined
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(rest.value)
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toLocaleDateString('fa-IR').split('/')[1])

    return (
      <FormControl error={state.error !== undefined} variant="standard" {...formControlProps} fullWidth={fullWidth} color={color}>
        <MobileDatePicker
          {...rest}
          value={{}}
          onMonthChange={(month) => {
            setSelectedMonth(month.toLocaleDateString('fa-IR').split('/')[1])
          }}
          renderDay={(date: Date, selectedDates: Array<Date | null>, pickersDayProps: PickersDayProps<Date>) => {
            if (dateRange[0] && date.toISOString().split('T')[0] === dateRange[0].toISOString().split('T')[0]) {
              return (
                <>
                  <CustomFirstPickersDayWrapper>
                    <Stack>
                      <CustomPickersDay key={pickersDayProps.key} className={pickersDayClasses.selected} {...pickersDayProps} />
                    </Stack>
                  </CustomFirstPickersDayWrapper>
                </>
              )
            } else if (dateRange[1] && date.toISOString().split('T')[0] === dateRange[1].toISOString().split('T')[0]) {
              return (
                <>
                  <CustomLastPickersDayWrapper>
                    <Stack>
                      <CustomPickersDay className={pickersDayClasses.selected} {...pickersDayProps} key={pickersDayProps.key} />
                    </Stack>
                  </CustomLastPickersDayWrapper>
                </>
              )
            }
            if (dateRange[1] && dateRange[0] && date < dateRange[1] && date > dateRange[0]) {
              return (
                <>
                  {selectedMonth === date.toLocaleDateString('fa-IR').split('/')[1] ? (
                    <CustomInnerPickersDayWrapper>
                      <Stack>
                        <CustomPickersDay key={pickersDayProps.key} className={'innerDay'} {...pickersDayProps} />
                      </Stack>
                    </CustomInnerPickersDayWrapper>
                  ) : (
                    <PickersDay {...pickersDayProps} key={pickersDayProps.key} />
                  )}
                </>
              )
            } else {
              return <PickersDay {...pickersDayProps} key={pickersDayProps.key} />
            }
          }}
          onChange={(_date) => {
            if (!_date) {
              return 0
            }
            const date = new Date(_date?.getTime() ?? 0 + 86400000)
            if (dateRange[0] === null) {
              setDateRange([date, null])
              onChange([date, null])
            } else if (dateRange[0] !== null && dateRange[1] === null) {
              if (date <= dateRange[0]) {
                setDateRange([date, null])
                onChange([date, null])
              } else {
                setDateRange((prev) => [prev[0], date])
                onChange([dateRange[0], date])
              }
            } else {
              setDateRange([date, null])
              onChange([dateRange[0], null])
            }
          }}
          DialogProps={{dir: theme.direction}}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          onAccept={(data) => {
            onChange(dateRange)
          }}
          renderInput={renderInput}
        />
      </FormControl>
    )
  }
)
