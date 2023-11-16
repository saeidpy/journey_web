import {styled} from '@mui/material'
import {logo} from 'src/assets/img'
import {mobileUI} from 'src/shared/constants'

const LogoBox = styled('div')({
  width: '100%',
  height: mobileUI.auth.logoHeight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Logo = () => {
  return (
    <LogoBox>
      <img alt="Trip" src={logo} />
    </LogoBox>
  )
}

export default Logo
