import {styled} from '@mui/material'
import {Button} from './Button'

export const SearchButton = styled(Button)(({theme}) => ({
  ...theme.typography.caption,
  gap: theme.spacing(1),
  height: 50,
  border: 'none',
  backgroundColor: theme.palette.shades[1],
  padding: theme.spacing(2),
  color: theme.palette.shades[5],
  borderRadius: theme.spacing(12.5),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  boxShadow: '0px 0px 8px rgba(160, 160, 160, 0.5)',
  '&:hover': {
    border: 'none',
    backgroundColor: theme.palette.shades[1],
  },
  '.MuiButton-iconSizeMedium': {
    marginRight: 0,
    '&>*:nth-of-type(1)': {
      fontSize: 18,
      width: 18,
      height: 18,
    },
  },
}))
