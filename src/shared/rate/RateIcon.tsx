import {Stack, styled, Typography, useTheme} from '@mui/material'
import {useId, useState} from 'react'
import {RateContained, RateHalf, RateOutlined} from 'src/assets/icons'
import {InputProps} from '../input'
import {StandardLabel} from '../input/StandartTextField'

const StyledSpan = styled('span')({
  display: 'flex',
})

type RateProp = {
  rate: number
  onChangeRate?: (rateNumber: number) => void
  isChangeable?: boolean
} & Partial<InputProps>

type rateIcon = {
  icon: 'contained' | 'half' | 'outlined'
}

interface RateIconCollectionProps extends Partial<InputProps> {
  icons: rateIcon[]
  isChangeable?: boolean
  onChangeRate?: (rateNumber: number) => void
}

const RateIconCollection = (props: RateIconCollectionProps) => {
  const {state: {error, isDirty, invalid} = {}, helperText, title, id, titleProps} = props
  const theme = useTheme()
  const internalId = useId()

  const [rateIcons, setRateIcons] = useState(props.icons)
  const handleClickToSetRate = (iconIndex: number) => {
    if (props.onChangeRate) {
      setRateIcons((prev) => prev.map((_, i) => (i <= iconIndex ? ({icon: 'contained'} as rateIcon) : ({icon: 'outlined'} as rateIcon))))
      props.onChangeRate(iconIndex + 1)
    }
  }
  const color = !error && isDirty ? 'success' : error ? 'error' : invalid ? 'warning' : undefined

  return (
    <Stack gap={1}>
      <StandardLabel sx={{position: 'relative'}} htmlFor={id ?? internalId} color={color} {...titleProps}>
        {title}
      </StandardLabel>
      <StyledSpan id={id ?? internalId}>
        {rateIcons.map((item, i) => (
          <Stack
            key={i}
            px={0.1}
            mr={props.isChangeable ? 1 : '1px'}
            onClick={() => {
              if (props.isChangeable) handleClickToSetRate(i)
            }}
          >
            {item.icon === 'contained' ? (
              <RateContained
                width={props.isChangeable ? theme.spacing(3.5) : theme.spacing(1.5)}
                height={props.isChangeable ? theme.spacing(3.5) : theme.spacing(1.5)}
              />
            ) : item.icon === 'half' ? (
              <RateHalf
                width={props.isChangeable ? theme.spacing(3.5) : theme.spacing(1.5)}
                height={props.isChangeable ? theme.spacing(3.5) : theme.spacing(1.5)}
              />
            ) : (
              <RateOutlined
                width={props.isChangeable ? theme.spacing(3.5) : theme.spacing(1.5)}
                height={props.isChangeable ? theme.spacing(3.5) : theme.spacing(1.5)}
              />
            )}
          </Stack>
        ))}
      </StyledSpan>
      {helperText && (
        <Typography color={color} variant="caption">
          {helperText}
        </Typography>
      )}
    </Stack>
  )
}

export const RateIcon = (props: RateProp) => {
  const handleChangeRate = (rateNumber: number) => {
    props.onChangeRate && props.onChangeRate(rateNumber)
  }
  const IconArray: rateIcon[] = []
  const containedNumber: number = Math.floor(props.rate)
  Array.from({length: containedNumber}).forEach(() => IconArray.push({icon: 'contained'}))
  const halfNumber: boolean = props.rate % 1 > 0 ? true : false
  if (halfNumber === true) IconArray.push({icon: 'half'})
  const outlinedNumber: number = halfNumber ? 5 - containedNumber - 1 : 5 - containedNumber
  Array.from({length: outlinedNumber}).forEach(() => IconArray.push({icon: 'outlined'}))
  return (
    <RateIconCollection
      {...props}
      onChangeRate={(val) => {
        handleChangeRate(val)
      }}
      icons={IconArray}
    />
  )
}
