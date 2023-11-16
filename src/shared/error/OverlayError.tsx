import {Trans} from '@lingui/macro'
import {Button, Typography} from '@mui/material'
import {Overlay} from 'src/shared/overlay'

// TODO: check styles here

export interface OverlayErrorProps {
  errorText?: string
  retry?: (e: React.MouseEvent) => void
  buttonText?: string
}

export function OverlayError({buttonText, errorText, retry}: OverlayErrorProps) {
  return (
    <Overlay>
      <Typography variant="h3">
        <Trans>An error occurred</Trans>
      </Typography>
      <Typography>{errorText}</Typography>
      {!!retry && (
        <Button onClick={retry} variant="outlined" color="primary">
          {buttonText || <Trans>Retry</Trans>}
        </Button>
      )}
    </Overlay>
  )
}
