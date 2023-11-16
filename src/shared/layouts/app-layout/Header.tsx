import {IconButton, Stack, styled, Typography} from '@mui/material'
import {LeftArrow} from 'src/assets/icons'
import {mobileUI} from 'src/shared/constants'
import {shouldForwardProp} from 'src/shared/utils/shouldForwardProp'
import {useHandleBack} from './useHandleBack'

export type HeaderProps = {
  title?: string
  hasBackButton?: boolean
  backButtonCallback?: () => void
  onShare?: () => void
  fullWidth?: boolean
}

export const HeaderContainer = styled('header', {shouldForwardProp})<{fullWidth?: boolean}>(({theme, fullWidth}) => ({
  position: 'sticky',
  top: theme.spacing(-2),
  zIndex: mobileUI.zIndex.header,
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
  ...(fullWidth
    ? {
        margin: theme.spacing(-2, -2, 2),
        width: `calc(100% + ${theme.spacing(4)})`,
      }
    : {
        width: '100%',
      }),
}))

export const Header = ({hasBackButton, onShare: _onShare, title, backButtonCallback, fullWidth}: HeaderProps) => {
  const handleBackButton = useHandleBack()
  return (
    <HeaderContainer fullWidth={fullWidth}>
      <Stack>{/* {onShare && <IconButton size="large" onClick={onShare}><ShareOutlined /></IconButton>} */}</Stack>
      {title && (
        <Typography align="center" variant="h2">
          {title}
        </Typography>
      )}
      {hasBackButton && (
        <IconButton size="large" onClick={() => (backButtonCallback ? backButtonCallback() : handleBackButton())}>
          <LeftArrow width="14px" height="14px" />
        </IconButton>
      )}
    </HeaderContainer>
  )
}
