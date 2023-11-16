import {Stack, Typography} from '@mui/material'
import {forwardRef, useState} from 'react'
import {StandardTextField} from './StandartTextField'
import {StandardTextFieldProps} from './types'

export const TextAreaInput = forwardRef<HTMLInputElement, StandardTextFieldProps>(({minRows, multiline, ...rest}, ref) => {
  const [count, setCount] = useState<number>(0)
  return (
    <Stack>
      <StandardTextField
        {...rest}
        onChangeCapture={(value: React.ChangeEvent<HTMLInputElement>) => {
          setCount(value.target.value.length)
        }}
        multiline={true}
        minRows={minRows}
        ref={ref}
      />
      <Typography variant="subtitle1" color="shades.5">{`50 / ${count}`}</Typography>
    </Stack>
  )
})
