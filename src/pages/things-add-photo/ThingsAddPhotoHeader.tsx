import {Trans} from '@lingui/macro'
import {IconButton, Stack, styled} from '@mui/material'
import {WhiteClose} from 'src/assets/icons'
import {useHandleBack} from 'src/shared/layouts/app-layout'

const HeaderContainer = styled(Stack)(({theme}) => ({
  color: theme.palette.white,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 1.5, 3),
}))

export const ThingsAddPhotoHeader = () => {
  const back = useHandleBack()
  return (
    <HeaderContainer>
      <Trans>Selected photo</Trans>
      <IconButton size="large" onClick={() => back()}>
        <WhiteClose />
      </IconButton>
    </HeaderContainer>
  )
}
