import {FormControl, InputLabel, InputLabelProps, styled, TextField, useTheme} from '@mui/material'
import {forwardRef, useId} from 'react'
import {StandardTextFieldProps} from './types'

const CustomTextField = styled(TextField)(({theme, color}) => ({
  '& fieldset': {
    borderColor: !color ? theme.palette.shades[4] : theme.palette[color].main,
  },
  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.shades[2],
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '0px',
  },
}))

const CustomFormControl = styled(FormControl)(({theme, color}) => ({
  '&': {
    padding: 0,
  },
}))

export const StandardLabel = (props: InputLabelProps) => {
  return (
    <InputLabel shrink {...props}>
      {props.children}
    </InputLabel>
  )
}

export const StandardTextField = forwardRef<HTMLInputElement, StandardTextFieldProps>(
  ({formControlProps, titleProps, id, helperTextProps, title, helperText, state: {error, invalid, isDirty}, fullWidth, ...rest}, ref) => {
    const internalId = useId()
    const theme = useTheme()
    const color = !error && isDirty ? 'success' : error ? 'error' : invalid ? 'warning' : undefined

    return (
      <CustomFormControl
        sx={{paddingY: theme.spacing(1)}}
        error={error !== undefined}
        variant="standard"
        {...formControlProps}
        fullWidth={fullWidth}
        color={color}
      >
        <StandardLabel sx={{position: 'relative'}} htmlFor={id ?? internalId} color={color} {...titleProps}>
          {title}
        </StandardLabel>
        <CustomTextField
          {...rest}
          sx={{
            '& fieldset': {
              borderColor: !color ? theme.palette.shades[4] : theme.palette[color].main,
            },
          }}
          fullWidth={fullWidth}
          color={color}
          id={id ?? internalId}
          inputRef={ref}
          helperText={helperText}
          FormHelperTextProps={{
            style: {
              color:
                color === 'error'
                  ? theme.palette.error.main
                  : color === 'success'
                  ? theme.palette.success.main
                  : color === 'warning'
                  ? theme.palette.warning.main
                  : undefined,
            },
          }}
          inputProps={{
            ...(rest?.inputProps ?? {}),
            maxLength: 50,
          }}
          error={false}
        />
      </CustomFormControl>
    )
  }
)
