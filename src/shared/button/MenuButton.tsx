import {styled} from '@mui/material'
import {mobileUI} from 'src/shared/constants'
import {Button} from './Button'

export const MenuButton = styled(Button)(({theme}) => ({
  width: '40px',
  height: '40px',
  borderRadius: '40px',
  position: 'absolute',
  top: 16,
  right: 17,
  backgroundColor: 'white',
  padding: 0,
  minWidth: 0,
  minHeight: 0,
  zIndex: mobileUI.zIndex.backButton,
}))
