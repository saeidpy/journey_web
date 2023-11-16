import {Stack, Typography} from '@mui/material'
import {LeftArrow} from 'src/assets/icons'
import {useHandleBack} from 'src/shared/layouts/app-layout'

export type HeaderProps = {
  title?: string
  hasBackButton?: boolean
}
export const RelatedHeader = ({hasBackButton, title}: HeaderProps) => {
  const handleBackButton = useHandleBack()

  return (
    <Stack flexDirection={'row'} justifyContent={'space-between'} marginY={2}>
      {title && (
        <Typography align="center" variant="h1">
          {title}
        </Typography>
      )}
      {hasBackButton && <LeftArrow onClick={() => handleBackButton()} />}
    </Stack>
  )
}
