import {Button as MuiButton, ButtonProps, CircularProgress, styled} from '@mui/material'
import {ElementType} from 'react'

const StyledButton = styled(MuiButton)(({theme}) => ({
  padding: theme.spacing(1.3125),
  borderRadius: theme.spacing(1),
  boxShadow: 'none',
}))

export function Button<D extends ElementType = 'button', P extends {isLoading?: boolean; [key: string]: unknown} = {}>(
  props: ButtonProps<D, P>
) {
  return (
    <StyledButton
      {...props}
      children={props?.isLoading ? <CircularProgress color="secondary" size="28px" /> : props.children}
      disabled={props?.isLoading || props.disabled}
    />
  )
}
