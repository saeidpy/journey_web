import {FormControl, InputBase, InputLabel, styled, Typography, useTheme} from '@mui/material'
import {forwardRef, useId} from 'react'
import {InputProps} from './types'

export const BootstrapInput = styled(InputBase)(({theme, color, fullWidth}) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    width: fullWidth ? '100%' : 'auto',
  },
  '& .MuiInputBase-input': {
    borderRadius: theme.spacing(1),
    position: 'relative',
    backgroundColor: theme.palette.shades[2],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: !color ? theme.palette.shades[4] : theme.palette[color].main,
    padding: theme.spacing(1, 2),
    width: fullWidth ? '100%' : 'auto',
    height: theme.spacing(4),
  },
}))

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({formControlProps, titleProps, id, helperTextProps, title, helperText, state: {error, invalid, isDirty}, fullWidth, ...rest}, ref) => {
    const internalId = useId()
    const color = !error && isDirty ? 'success' : error ? 'error' : invalid ? 'warning' : undefined
    const theme = useTheme()
    return (
      <FormControl
        sx={{paddingY: theme.spacing(1)}}
        error={error !== undefined}
        variant="standard"
        {...formControlProps}
        fullWidth={fullWidth}
        color={color}
      >
        <InputLabel shrink htmlFor={id ?? internalId} {...titleProps} style={{transform: 'unset'}}>
          {title}
        </InputLabel>
        <BootstrapInput
          {...rest}
          fullWidth={fullWidth}
          color={color}
          id={id ?? internalId}
          inputRef={ref}
          inputProps={{
            ...(rest?.inputProps ?? {}),
            maxLength: 50,
          }}
        />
        {helperText ? (
          <Typography variant="subtitle1" color={color}>
            {helperText}
          </Typography>
        ) : (
          ''
        )}
      </FormControl>
    )
  }
)
