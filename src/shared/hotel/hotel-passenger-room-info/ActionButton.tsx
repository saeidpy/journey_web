import {Trans} from '@lingui/macro'
import {Button, Stack, styled, Typography} from '@mui/material'
import {mobileUI} from 'src/shared/constants'

const Wrapper = styled(Stack)(({theme}) => ({
  boxShadow: theme.shadows[13],
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  margin: '0 auto',
  width: '100%',
  maxWidth: mobileUI.shared.maxWidth,
  background: theme.palette.shades[1],
  zIndex: mobileUI.zIndex.header,
  padding: theme.spacing(1.25, 2, 4),
}))

export const ActionButton = ({
  totalPrice,
  onClick,
  type = 'loading',
  onClickFactor,
}: {
  totalPrice: number
  onClick?: () => void
  onClickFactor?: () => void
  type?: 'loading' | 'paymentPending' | 'success'
}) => {
  return (
    <Wrapper>
      <Stack justifyContent="space-between" flexDirection="row" mt={1.25}>
        <Typography variant="h3" color="shades.9">
          <Trans>Total Price</Trans>
        </Typography>

        <Stack flexDirection="row">
          <Typography variant="h2" color="main.primary3">
            {totalPrice.toLocaleString('fa-IR', {useGrouping: true})}
          </Typography>
          <Typography variant="subtitle1" color="main.primary3" ml={0.5}>
            <Trans>Tomans</Trans>
          </Typography>
        </Stack>
      </Stack>
      {type === 'paymentPending' && (
        <>
          <Stack justifyContent="space-between" flexDirection="row" mt={1.25}>
            <Typography variant="h3" color="shades.9">
              <Trans>Wallet balance</Trans>
            </Typography>

            <Stack flexDirection="row">
              <Typography variant="h2" color="main.primary3">
                {totalPrice.toLocaleString('fa-IR', {useGrouping: true})}
              </Typography>
              <Typography variant="subtitle1" color="main.primary3" ml={0.5}>
                <Trans>Tomans</Trans>
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="caption" color="green">
              <Trans>Sufficient inventory</Trans>
            </Typography>
          </Stack>
        </>
      )}
      <Stack mt={1.25}>
        {type === 'loading' && (
          <Button fullWidth variant="contained" type="submit" onClick={onClick}>
            <Trans>Continue shopping</Trans>
          </Button>
        )}
        {type === 'paymentPending' && (
          <Button fullWidth variant="contained" type="submit" onClick={onClick}>
            <Trans>Payment by credit</Trans>
          </Button>
        )}
        {type === 'success' && (
          <Stack gap={2}>
            <Button fullWidth variant="contained" type="submit" onClick={onClick}>
              <Trans>Receive watcher</Trans>
            </Button>
            <Button fullWidth variant="outlined" onClick={onClickFactor}>
              <Trans>Receipt of invoice</Trans>
            </Button>
          </Stack>
        )}
      </Stack>
    </Wrapper>
  )
}
