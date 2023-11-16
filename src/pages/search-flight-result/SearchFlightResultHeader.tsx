import {IconButton, Stack, styled, Typography} from '@mui/material'
import {LeftArrow, PencilWithGreenBackground} from 'src/assets/icons'
import {mobileUI} from 'src/shared/constants'
import {useHandleBack} from 'src/shared/layouts/app-layout'

export type HeaderProps = {
  title1?: string
  title2?: string
}

export const HeaderContainer = styled('header')(({theme}) => ({
  position: 'sticky',
  zIndex: mobileUI.zIndex.header,
  width: `calc(100% + ${theme.spacing(4)})`,
  minHeight: 65,
  margin: theme.spacing(-2, -2, 0),
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.shades[1],
  borderBottomColor: theme.palette.shades[3],
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
  boxShadow: `${theme.spacing(0, 0.25, 0.75, 0)} ${theme.palette.shades[8]}1A`,
  alignItems: 'center',
  flex: '0 0 auto',
  padding: theme.spacing(1),
}))

export const SearchFlightResultHeader = ({title1, title2}: HeaderProps) => {
  const handleBackButton = useHandleBack()
  return (
    <HeaderContainer>
      <Stack flex={1}>
        <PencilWithGreenBackground onClick={() => handleBackButton()} />
      </Stack>

      <Stack justifyContent="flex-start" flex={4}>
        <Typography variant="h2">{title1}</Typography>
        <Typography variant="body1">{title2}</Typography>
      </Stack>

      <Stack flex={1} justifyContent="center" alignItems="flex-end">
        <Stack>
          <IconButton size="large" onClick={() => handleBackButton()}>
            <LeftArrow width="14px" height="14px" />
          </IconButton>
        </Stack>
      </Stack>
    </HeaderContainer>
  )
}
