import {styled, ThemeOptions} from '@mui/material'

// TODO: check styles here

type ZIndex = ThemeOptions['zIndex']

export const Overlay = styled('div')(({theme}) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: ((theme.zIndex as ZIndex)?.tooltip ?? 1500) + 50,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffffdd',
}))
