import {styled} from '@mui/material'

export const ButtonWrapper = styled('div')(({theme}) => ({
  width: '100%',
  padding: theme.spacing(1, 0),
}))

export const InputWrapper = styled('div')(({theme}) => ({
  width: '100%',
  paddingBottom: theme.spacing(10),

  '> div': {
    width: '100%',
  },
}))
