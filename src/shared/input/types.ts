import {FormControlProps, InputBaseProps, InputLabelProps, TextFieldProps, TypographyProps} from '@mui/material'
import {DatePickerProps} from '@mui/x-date-pickers'
import {FieldError} from 'react-hook-form'

export type MenuItemProps = {
  value: string | number
  label: string
}

export type DropDownListProps = StandardTextFieldProps & {
  optionList: MenuItemProps[]
}

export type AsyncDropDownListProps = {
  optionList: MenuItemProps[]
  inputLabel: string
  helperText?: string
  state: InputState
}

export type MultipleChoiceDropDownListProps = {
  optionList: MenuItemProps[]
  inputLabel: string
  helperText: string
  value: string[]
  onChange: (...event: any[]) => void
}
export interface InputState {
  invalid: boolean
  isDirty: boolean
  isTouched: boolean
  error?: FieldError
}

export type InputProps = InputBaseProps & {
  state: InputState
  id?: string
  titleProps?: InputLabelProps
  formControlProps?: Omit<FormControlProps, 'fullWidth'>
  helperTextProps?: TypographyProps
  title?: string
  helperText?: string
  error?: boolean
  success?: boolean
}

export type StandardTextFieldProps = TextFieldProps & {
  state: InputState
  id?: string
  titleProps?: InputLabelProps
  formControlProps?: Omit<FormControlProps, 'fullWidth'>
  helperTextProps?: TypographyProps
  title?: string
  error?: boolean
  success?: boolean
}

export type RangeDatePickerProps = Omit<DatePickerProps<TextFieldProps, Date>, 'onChange' | 'value'> & {
  state: InputState
  id?: string
  titleProps?: InputLabelProps
  formControlProps?: Omit<FormControlProps, 'fullWidth'>
  helperTextProps?: TypographyProps
  title?: string
  helperText?: string
  error?: boolean
  success?: boolean
  fullWidth?: boolean
  onChange: (data: [Date | null, Date | null]) => void
  onAccept: (data: [Date | null, Date | null]) => void
  value: [Date | null, Date | null]
  setOpen: (prev: boolean) => void
}

export type RadioItemProps = {
  value: string | number
  label: string
}

export type CustomizedRadioProps = {
  RadioList: RadioItemProps[]
}
