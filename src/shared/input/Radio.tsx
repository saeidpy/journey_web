import {FormControl, FormControlLabel, FormControlLabelProps, Radio, RadioGroup, RadioGroupProps, styled, Typography} from '@mui/material'
import {forwardRef, useId} from 'react'
import {mobileUI} from 'src/shared/constants'
import {StandardLabel} from './StandartTextField'
import {CustomizedRadioProps, InputProps} from './types'
const UncheckedRadioButton = styled(Typography)(({theme}) => ({
  ...theme.typography.caption,
  width: mobileUI.radio.unchecked.width,
  textAlign: 'center',
  border: `1px solid ${theme.palette.shades['4']}`,
  borderRadius: theme.spacing(10),
  backgroundColor: theme.palette.shades['1'],
  color: theme.palette.shades['9'],
  padding: theme.spacing(1.5, 2.5),
}))

const CheckedRadioButton = styled(Typography)(({theme}) => ({
  ...theme.typography.caption,
  width: mobileUI.radio.unchecked.width,
  border: `1px solid ${theme.palette.shades['4']}`,
  borderRadius: theme.spacing(10),
  backgroundColor: theme.palette.shades['8'],
  color: theme.palette.shades['1'],
  padding: theme.spacing(1.5, 2.5),
  textAlign: 'center',
}))
const RadioGroupStyle = styled(RadioGroup)(({theme}) => ({
  paddingTop: theme.spacing(1),
  flexDirection: 'row',
  justifyContent: 'space-around',
}))

export type RadioProps = CustomizedRadioProps & InputProps & RadioGroupProps & FormControlLabelProps
export const CustomizedRadio = forwardRef(
  (
    {
      RadioList,
      formControlProps,
      titleProps,
      id,
      label,
      state: {error, isDirty, invalid},
      helperText,
      helperTextProps: ___,
      onChange,
      ...rest
    }: RadioProps,
    ref
  ) => {
    const internalId = useId()
    const color = !error && isDirty ? 'success' : error ? 'error' : invalid ? 'warning' : undefined

    return (
      <FormControl {...formControlProps}>
        <StandardLabel htmlFor={id ?? internalId} {...titleProps}>
          {label}
        </StandardLabel>
        <RadioGroupStyle onChange={onChange} {...rest} id={id ?? internalId} ref={ref}>
          {RadioList.map((item, i) => (
            <FormControlLabel
              key={i}
              sx={{marginLeft: 0, marginRight: 0}}
              value={item.value}
              control={
                <Radio
                  sx={{width: '100px'}}
                  checkedIcon={<CheckedRadioButton>{item.label}</CheckedRadioButton>}
                  icon={<UncheckedRadioButton>{item.label}</UncheckedRadioButton>}
                />
              }
              label=""
            />
          ))}
        </RadioGroupStyle>
        {helperText ? (
          <Typography variant="caption" color={color}>
            {helperText}
          </Typography>
        ) : (
          ''
        )}
      </FormControl>
    )
  }
)
