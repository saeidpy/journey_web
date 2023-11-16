import {Checkbox, FormControl, FormControlLabel, FormControlLabelProps} from '@mui/material'
import {forwardRef} from 'react'
import {CheckboxChecked, CheckboxUnchecked} from 'src/assets/icons'

export const CustomCheckBox = forwardRef(({onChange, label}: FormControlLabelProps, ref) => {
  return (
    <FormControl>
      <FormControlLabel
        ref={ref}
        control={<Checkbox onChange={onChange} icon={<CheckboxUnchecked />} checkedIcon={<CheckboxChecked />} />}
        label={label}
      />
    </FormControl>
  )
})
