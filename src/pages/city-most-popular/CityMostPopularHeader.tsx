import {Stack, Typography} from '@mui/material'
import {Filter, LeftArrow} from 'src/assets/icons'
import {useHandleBack} from 'src/shared/layouts/app-layout'

export type HeaderProps = {
  title?: string
  hasBackButton?: boolean
  onFilter?: () => void
}
export const CityMostPopularHeader = ({hasBackButton, onFilter, title}: HeaderProps) => {
  const handleBackButton = useHandleBack()

  return (
    <Stack flexDirection={'row'} justifyContent={'space-between'}>
      <Stack>{onFilter && <Filter onClick={onFilter} />}</Stack>
      {title && (
        <Typography align="center" variant="h2">
          {title}
        </Typography>
      )}
      {hasBackButton && <LeftArrow onClick={() => handleBackButton()} />}
    </Stack>
  )
}
