import {MenuItem} from '@mui/material'
import {forwardRef} from 'react'
import {StandardTextField} from './StandartTextField'
import {DropDownListProps} from './types'
export const DropDownList = forwardRef<HTMLInputElement, DropDownListProps>(({title, optionList, ...rest}: DropDownListProps, ref) => {
  return (
    <StandardTextField {...rest} title={title} select ref={ref} inputProps={{'aria-label': 'Without label'}}>
      {title && <MenuItem disabled>{title}</MenuItem>}
      {optionList.map((option, index) => (
        <MenuItem key={index} value={option.value} aria-label="select-item">
          {option.label}
        </MenuItem>
      ))}
    </StandardTextField>
  )
})
