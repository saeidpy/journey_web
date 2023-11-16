import {Stack, styled} from '@mui/material'
import {shouldForwardProp} from 'src/shared/utils/shouldForwardProp'

export const Wrapper = styled(Stack, {shouldForwardProp})<{noTopPadding?: boolean}>(({theme, noTopPadding}) => ({
  width: '100%',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderTop: noTopPadding ? 'none' : undefined,
  borderBottom: noTopPadding === false ? 'none' : undefined,
  borderRadius: noTopPadding === undefined ? theme.spacing(2) : noTopPadding ? theme.spacing(0, 0, 2, 2) : theme.spacing(2, 2, 0, 0),
  marginTop: noTopPadding ? theme.spacing(-2) : theme.spacing(2),
  boxShadow:
    noTopPadding === undefined
      ? '0px 0px 4px rgba(51, 51, 51, 0.2)'
      : noTopPadding
      ? '0px 2px 2px rgba(51, 51, 51, 0.2)'
      : '0px px 2px rgba(51, 51, 51, 0.2)',
  padding: noTopPadding ? theme.spacing(0, 2, 2) : theme.spacing(2),
  cursor: 'pointer',
}))
