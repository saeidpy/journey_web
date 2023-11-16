import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {CardReceive, CardSend, MoneyWalletOpen} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {TitleAndIconHeader} from 'src/shared/layouts/app-layout'
import {toMoneyCurrency} from 'src/shared/utils/currency'
import {TransactionsList} from './TransactionsList'

const Wrapper = styled(Stack)(({theme}) => ({
  padding: theme.spacing(2, 0),
}))
const BalanceBox = styled(Stack)(({theme}) => ({
  padding: theme.spacing(4, 1),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.main.primary3,
}))

export default function MoneyWalletPage() {
  return (
    <>
      <TitleAndIconHeader hasBackButton title={t`Money wallet`} icon={<MoneyWalletOpen />} />
      <Wrapper>
        <BalanceBox justifyContent="space-between" flexDirection="row">
          <Stack>
            <Typography variant="body1" color="shades.1">
              <Trans>Credit balance</Trans>
            </Typography>
          </Stack>
          <Stack>
            <Stack flexDirection="row">
              <Typography variant="h2" color="shades.1" px={1}>
                {toMoneyCurrency(18000)}
              </Typography>
              <Typography variant="h2" color="shades.1">
                <Trans>Tomans</Trans>
              </Typography>
            </Stack>
          </Stack>
        </BalanceBox>
        <Stack flexDirection="row" py={2}>
          <Stack flex={1} pr={1} pt={1}>
            <Button variant="outlined" color="inherit" endIcon={<CardReceive />}>
              <Typography color="shades.8" variant="caption" py={1}>
                <Trans>Increase balance</Trans>
              </Typography>
            </Button>
          </Stack>
          <Stack flex={1} pl={1} pt={1}>
            <Button variant="outlined" color="inherit" endIcon={<CardSend />}>
              <Typography color="shades.8" variant="caption" py={1}>
                <Trans>Cash withdrawal</Trans>
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Stack py={2}>
          <TransactionsList />
        </Stack>
      </Wrapper>
    </>
  )
}
