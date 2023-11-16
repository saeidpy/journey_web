import {Stack, styled} from '@mui/material'

export const SearchItem = styled(Stack)(({theme}) => ({
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.main.primary0}`,
  flexDirection: 'row',
  alignItems: 'center',
}))
