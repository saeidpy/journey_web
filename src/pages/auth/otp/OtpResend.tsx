import {Trans} from '@lingui/macro'
import {styled} from '@mui/material'
import {MouseEvent, useEffect, useState} from 'react'
import {Button} from 'src/shared/button'
import {servers} from 'src/shared/constants'

interface OtpResendProps {
  onResend: (event: MouseEvent<HTMLButtonElement>) => void
  date: Date
  disabled: boolean
}

const TimerWrapper = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export function OtpResend({onResend, date, disabled}: OtpResendProps) {
  const [counter, setCounter] = useState<number>(0)
  useEffect(() => {
    let timer: number | null = null
    const newCounter = date.getTime() - new Date().getTime() + servers.otpResendTimeout * 1000
    if (newCounter > 0) {
      if (newCounter / 1000 > counter) {
        setCounter(servers.otpResendTimeout)
      } else {
        timer = window.setTimeout(() => {
          setCounter(Math.ceil((date.getTime() - new Date().getTime()) / 1000 + servers.otpResendTimeout))
        }, 1000)
      }
    } else if (counter > 0) {
      setCounter(0)
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
  }, [counter, date])
  const minute = Math.floor(counter / 60)
  const second = counter % 60
  return (
    <TimerWrapper>
      <Button variant="text" color="inherit" disabled={counter > 0 || disabled} onClick={onResend}>
        <Trans>Re-send code</Trans>
      </Button>
      {counter > 0 && (
        <span>
          {minute}:{second >= 10 ? '' : '0'}
          {second}
        </span>
      )}
    </TimerWrapper>
  )
}
