import {Stack} from '@mui/material'
import {ComponentType, PropsWithChildren} from 'react'
import {Header} from 'src/shared/layouts/app-layout'
import {groupChildrenByType} from 'src/shared/utils/groupChildrenByType'

// typescript only allows string when it defined at `JSX.IntrinsicElements`
export const ContentRegionHotel = 'ContentRegionHotel' as unknown as ComponentType<PropsWithChildren<{}>>
export const ActionButtonHotel = 'ActionButtonHotel' as unknown as ComponentType<PropsWithChildren<{}>>

const regions = [ContentRegionHotel, ActionButtonHotel]
interface Props {
  headerTitle: string
}

type HotelPassengersLayoutProps = PropsWithChildren<Props>

export const HotelPassengersLayout = ({children, headerTitle}: HotelPassengersLayoutProps) => {
  const map = groupChildrenByType(children, regions)
  const contentChild = map.get(ContentRegionHotel)
  const actionButton = map.get(ActionButtonHotel)
  return (
    <Stack>
      <Header hasBackButton title={headerTitle} fullWidth />
      <Stack gap={3} pb={25}>
        {contentChild && contentChild}
      </Stack>
      {actionButton && actionButton}
    </Stack>
  )
}
