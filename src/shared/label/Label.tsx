import {Typography, useTheme} from '@mui/material'

type LabelProps = {
  labelTheme: 'disabled' | 'active'
  text: string
}
export const Label = (props: LabelProps) => {
  const theme = useTheme()
  return (
    <Typography
      variant="subtitle2"
      p={theme.spacing(0.5, 1)}
      sx={{
        backgroundColor: props.labelTheme === 'active' ? theme.palette.grey[200] : theme.palette.grey[100],
        width: 'fit-content',
        borderRadius: theme.spacing(1.5),
        border: props.labelTheme === 'active' ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.disabled}`,
        color: props.labelTheme === 'active' ? theme.palette.primary.main : theme.palette.grey[300],
      }}
    >
      {props.text}
    </Typography>
  )
}
