import {InputLabel, Stack, styled, TextField, TextFieldProps, Typography} from '@mui/material'

const CustomTextField = styled(TextField)(({theme}) => ({
  height: theme.spacing(4),
}))
export const StandardField = (props: TextFieldProps) => {
  return (
    <>
      <InputLabel>
        <Typography variant="body1" color="shades.8">
          {props.title}
        </Typography>
      </InputLabel>
      <Stack py={1}>
        <CustomTextField {...props} />
      </Stack>
    </>
  )
}
