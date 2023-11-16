import {FormControl, FormControlLabel, FormControlLabelProps, FormLabel, Radio, RadioGroup, RadioGroupProps} from '@mui/material'
import {forwardRef, useId} from 'react'
import {CustomizedRadioProps, InputProps} from './types'

export type BasicRadioProps = CustomizedRadioProps & InputProps & RadioGroupProps & FormControlLabelProps
export const BasicRadio = forwardRef(
  (
    {
      RadioList,
      formControlProps,
      titleProps,
      id,
      title,
      state: _,
      helperText: __,
      helperTextProps: ___,
      onChange,
      ...rest
    }: BasicRadioProps,
    ref
  ) => {
    const internalId = useId()
    return (
      <FormControl {...formControlProps}>
        <FormLabel htmlFor={id ?? internalId} {...titleProps}>
          {title}
        </FormLabel>
        <RadioGroup
          onChange={onChange}
          sx={{flexDirection: 'row', justifyContent: 'space-between'}}
          {...rest}
          id={id ?? internalId}
          ref={ref}
        >
          {RadioList.map((item, i) => (
            <FormControlLabel key={i} sx={{marginLeft: 0, marginRight: 0}} value={item.value} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    )
  }
)
