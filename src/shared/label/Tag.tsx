import {styled, Typography} from '@mui/material'

export const Tag = styled(Typography)(({theme}) => ({
  color: theme.palette.grey[500],
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: theme.spacing(1),
  width: 'fit-content',
  padding: theme.spacing(0.25, 0.5),
  margin: theme.spacing(0, 0.25),
  height: 'fit-content',
}))
