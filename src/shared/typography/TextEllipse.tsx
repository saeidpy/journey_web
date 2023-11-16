import {styled, Typography, TypographyProps} from '@mui/material'

type TextEllipseProps = TypographyProps & {
  clamp?: number
}

const CustomTypography = styled(Typography)(({theme}) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
}))

export const TextEllipse = ({clamp, sx, ...props}: TextEllipseProps) => {
  const size = clamp || 1

  return (
    <CustomTypography
      sx={{
        ...sx,
        '-webkit-line-clamp': `${size}`,
      }}
      {...props}
    />
  )
}
