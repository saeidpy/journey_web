import {Trans} from '@lingui/macro'
import {Stack, styled, Typography, useTheme} from '@mui/material'
import {useNavigate} from 'react-router'
import {SelectedRoom, useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {Button} from 'src/shared/button'
import {toMoneyCurrency} from 'src/shared/utils/currency'

export type HotelRoomSelectionProps = SelectedRoom

const Wrapper = styled(Stack)(({theme}) => ({
  border: `1px solid ${theme.palette.shades[1]}`,
  boxShadow: `0px 0px 4px 0px rgba(51, 51, 51, 0.20)`,
  padding: theme.spacing(1.5, 3.5),
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1, 0),
  minHeight: theme.spacing(30),
}))

export const HotelRoomSelection = (props: HotelRoomSelectionProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const {setBookHotel} = useBookHotel()
  const goToDetailHotel = () => {
    setBookHotel({selectedRoom: props})
    navigate('/hotel/hotel-information')
  }

  return (
    <>
      <Wrapper flexDirection="column">
        <Stack flex="1" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Stack>
            <Typography variant="h2">{props.roomName}</Typography>
          </Stack>
        </Stack>
        {/* <Stack flexDirection="row" flex="1" mt={1}>
          <Stack px={1}>
            {props.facilities.map((item) => (
              <Typography key={item} color="shades.7">
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack> */}

        <Stack mt={1} justifyContent="space-between" flex="1" flexDirection="row" py={2} borderTop={`1px solid ${theme.palette.shades[3]}`}>
          <Stack>
            <Typography variant="caption">
              <Trans>Price per night: </Trans>
            </Typography>
          </Stack>
          <Stack flexDirection="row">
            <Typography variant="h2" color="main.primary3" px={0.5}>
              {/* <Trans>{parseInt(toMoneyCurrency(props.pricePerNight), 10)} </Trans> */}
              <Trans>{toMoneyCurrency(props.pricePerNight)} </Trans>
            </Typography>
            <Typography variant="caption" color="main.primary3">
              <Trans>Tomans</Trans>
            </Typography>
          </Stack>
        </Stack>
        <Stack mx={-3} py={2} borderTop={`1px solid ${theme.palette.shades[3]}`}>
          <Stack
            borderRadius={theme.spacing(1)}
            flexDirection="row"
            justifyContent="space-between"
            bgcolor={theme.palette.shades[2.5]}
            p={0.5}
            mx={3}
          >
            <Stack>
              <Typography>
                <Trans>Price of {props.nightsCount} nights</Trans>
              </Typography>
            </Stack>
            <Stack>
              <Stack flexDirection="row">
                <Typography variant="h1" color="main.primary3" px={0.5}>
                  {toMoneyCurrency(props.nightsCount * props.pricePerNight)}
                </Typography>
                <Typography variant="caption" color="main.primary3">
                  <Trans>Tomans</Trans>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack flexDirection="row">
          <Stack flex={1}>
            <Button variant="text" color="secondary" fullWidth>
              <Trans>Cancelation Rules</Trans>
            </Button>
          </Stack>
          <Stack flex={1}>
            <Button variant="contained" color="primary" fullWidth onClick={goToDetailHotel}>
              <Trans>Registration of reservation inquiry</Trans>
            </Button>
          </Stack>
        </Stack>
      </Wrapper>
    </>
  )
}
