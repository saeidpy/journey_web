import {styled} from '@mui/material'
import {Button} from 'src/shared/button'

export const OutlinedButton = styled(Button)(({theme}) => ({
  boxShadow: 'none',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
  border: '1px solid',
  backgroundColor: theme.palette.shades[1],
  borderColor: theme.palette.shades[6.5],
  color: theme.palette.shades[8],
  borderRadius: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 300,
  '&:hover': {
    backgroundColor: theme.palette.shades[1],
    borderColor: theme.palette.shades[8],
    boxShadow: 'none',
  },
}))
