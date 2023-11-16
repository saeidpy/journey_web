import {IconButton, Stack, Typography} from '@mui/material'
import {ReactNode} from 'react'
import {LeftArrow} from 'src/assets/icons'
import {HeaderContainer, useHandleBack} from 'src/shared/layouts/app-layout'

type TitleAndIconHeaderProps = {
  title?: string
  hasBackButton?: boolean
  backButtonCallback?: () => void
  icon?: ReactNode
}
export const TitleAndIconHeader = ({backButtonCallback, hasBackButton, title, icon}: TitleAndIconHeaderProps) => {
  const handleBackButton = useHandleBack()
  return (
    <>
      <HeaderContainer fullWidth>
        {title && (
          <Stack justifyContent="center" flexDirection="row">
            {icon && (
              <Stack justifyContent="center" px={1}>
                {icon}
              </Stack>
            )}
            <Typography align="center" variant="h2">
              {title}
            </Typography>
          </Stack>
        )}
        {hasBackButton && (
          <IconButton size="large" onClick={() => (backButtonCallback ? backButtonCallback() : handleBackButton())}>
            <LeftArrow />
          </IconButton>
        )}
      </HeaderContainer>
    </>
  )
}
