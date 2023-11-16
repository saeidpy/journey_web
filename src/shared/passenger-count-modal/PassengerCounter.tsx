import {Stack, styled, Typography} from '@mui/material'
import {Minus, Plus} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import AgeMenu from './AgeMenu'

const IconButton = styled(Button)(({theme}) => ({
  padding: theme.spacing(0),
  minWidth: 'auto',
  width: theme.spacing(3),
  height: theme.spacing(3),
  borderRadius: theme.spacing(1),
}))

interface PassengerCounterProps<T extends string> {
  onChange: (name: T, count: number) => void
  value: number
  name: T
  title: string
  disabled?: boolean
  index: number
  withAge?: boolean
}

export const PassengerCounter = <T extends string>({onChange, value, name, title, disabled, index, withAge}: PassengerCounterProps<T>) => {
  const setCount = (count: number) => {
    onChange(name, count)
  }

  const increment = () => {
    setCount(value + 1)
  }

  const decrement = () => {
    setCount(value - 1)
  }

  return (
    <>
      <Stack flexDirection={'row'} width={'100%'} alignItems="center" justifyContent={'space-between'}>
        <Typography>{title}</Typography>
        <Stack flexDirection={'row'} justifyContent={'space-evenly'} gap={3.5}>
          <IconButton size="small" variant="contained" onClick={increment} disabled={disabled}>
            <Plus />
          </IconButton>
          <Typography>{value}</Typography>
          <IconButton disabled={value === 0} size="small" variant="contained" onClick={decrement}>
            <Minus />
          </IconButton>
        </Stack>
      </Stack>
      {withAge && (
        <Stack flexDirection={'row'} gap={1} flexWrap={'wrap'}>
          {Array(value)
            .fill(undefined)
            .map((_, indexValue) => (
              <AgeMenu index={index} indexValue={indexValue} />
            ))}
        </Stack>
      )}
    </>
  )
}
