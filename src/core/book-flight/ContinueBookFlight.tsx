import {t, Trans} from '@lingui/macro'
import {Divider, Stack, styled, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router'
import {ArrowDown, ArrowUp} from 'src/assets/icons'
import {Button} from 'src/shared/button'
import {mobileUI} from 'src/shared/constants'
import {useMainContentScroll} from 'src/shared/layouts/app-layout'
import {getPricesFromTicket} from 'src/shared/utils/getPricesFromTicket'
import {locationToStep} from './locationToStep'
import {BookFlightSteps, useBookFlight} from './useBookFlight'

const Wrapper = styled(Stack)(({theme}) => ({
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

const DetailContainer = styled(Stack)({
  transition: 'height .2s',
  overflow: 'hidden',
})

const ExpandableStack = styled(Stack)({
  cursor: 'pointer',
})

const getNameFromStep = (step: BookFlightSteps) => {
  switch (step) {
    case 'ticket-confirmation':
      return t`Continue`
    case 'return-ticket-confirmation':
      return t`Confirm and continue`
    case 'final-check':
      return t`Choose payment method`
    default:
      return t`Continue buying`
  }
}
const nextStep = (step: BookFlightSteps, isOneWay?: boolean): {nav: string; step: BookFlightSteps} => {
  switch (step) {
    case 'ticket-confirmation':
      return {
        nav: isOneWay ? '/flight/passengers-info' : '/flight/return-flight-information',
        step: isOneWay ? 'passengers-form' : 'return-ticket-confirmation',
      }
    case 'return-ticket-confirmation':
      return {
        nav: '/flight/passengers-info',
        step: 'passengers-form',
      }
    case 'passengers-form':
      return {
        nav: '/flight/final-check',
        step: 'final-check',
      }
    case 'final-check':
      return {
        nav: '/flight/payment',
        step: 'payment',
      }
    default:
      return {
        nav: '/flight',
        step: 'search-form',
      }
  }
}

export const ContinueBookFlight = () => {
  const {bookFlight} = useBookFlight()
  const {adultCount, childCount, infantCount, selectedTicket, isOneWay, onNextStep} = bookFlight
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const scroll = useMainContentScroll()
  const step = locationToStep(location.pathname)
  const handleClick = async () => {
    if (onNextStep?.current) {
      const result = await onNextStep.current?.()
      if (!result) {
        return
      }
    }
    const next = nextStep(step, isOneWay)
    navigate(next.nav)
  }
  const prices = getPricesFromTicket(selectedTicket?.type_based_passengers ?? [])
  const totalPrice = selectedTicket?.total_price.total ?? 0
  useEffect(() => {
    const currentScroll = scroll?.current
    if (currentScroll) {
      currentScroll.style.marginBottom =
        (
          (expanded ? mobileUI.continueBookFlight.expandedHeight : mobileUI.continueBookFlight.height) + mobileUI.continueBookFlight.rest
        ).toString() + 'px'
      return () => {
        if (currentScroll) {
          currentScroll.style.marginBottom = '0px'
        }
      }
    }
  }, [scroll, expanded, location.pathname])
  return (
    <Wrapper>
      <Divider />
      <DetailContainer height={expanded ? mobileUI.continueBookFlight.expandedHeight : mobileUI.continueBookFlight.height}>
        <Stack justifyContent="space-between" color="black" flexDirection="row" mt={1.25}>
          <ExpandableStack flexDirection="row" onClick={() => setExpanded((prev) => !prev)}>
            <Typography variant="h3" color="shades.9">
              <Trans>Total Price</Trans>
            </Typography>
            <Stack>
              {expanded ? <ArrowUp width={24} height={24} fontSize={24} /> : <ArrowDown width={24} height={24} fontSize={24} />}
            </Stack>
          </ExpandableStack>
          <Stack flexDirection="row">
            <Typography variant="h2" color="main.primary3">
              {totalPrice.toLocaleString('fa-IR', {useGrouping: true})}
            </Typography>
            <Typography variant="subtitle1" color="main.primary3" ml={0.5}>
              <Trans>Tomans</Trans>
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" flexDirection="row" mt={1}>
          <Typography variant="subtitle1">
            <Trans>Adult ({adultCount})</Trans>
          </Typography>
          <Stack flexDirection="row">
            <Typography variant="caption">{prices.adult.toLocaleString('fa-IR', {useGrouping: true})}</Typography>
            <Typography variant="subtitle1" ml={0.5}>
              <Trans>Tomans</Trans>
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" flexDirection="row" mt={1}>
          <Typography variant="subtitle1">
            <Trans>Child ({childCount})</Trans>
          </Typography>
          <Stack flexDirection="row">
            <Typography variant="caption">{prices.child.toLocaleString('fa-IR', {useGrouping: true})}</Typography>
            <Typography variant="subtitle1" ml={0.5}>
              <Trans>Tomans</Trans>
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" flexDirection="row" mt={1}>
          <Typography variant="subtitle1">
            <Trans>Infant ({infantCount})</Trans>
          </Typography>
          <Stack flexDirection="row">
            <Typography variant="caption">{prices.infant.toLocaleString('fa-IR', {useGrouping: true})}</Typography>
            <Typography variant="subtitle1" ml={0.5}>
              <Trans>Tomans</Trans>
            </Typography>
          </Stack>
        </Stack>
      </DetailContainer>
      <Stack mt={1.25}>
        <Button fullWidth variant="contained" onClick={handleClick}>
          {getNameFromStep(step)}
        </Button>
      </Stack>
    </Wrapper>
  )
}
