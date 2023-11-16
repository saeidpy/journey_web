import {Stack, styled} from '@mui/material'
import {ComponentType, PropsWithChildren} from 'react'
import {useLocation} from 'react-router'
import {mobileUI} from 'src/shared/constants'
import {groupChildrenByType} from 'src/shared/utils/groupChildrenByType'
import {ContentScrollContainer} from './ContentScrollContainer'

// typescript only allows string when it defined at `JSX.IntrinsicElements`
export const ContentRegion = 'ContentRegion' as unknown as ComponentType<PropsWithChildren<{}>>
export const BottomNavigationRegion = 'BottomNavigationRegion' as unknown as ComponentType<PropsWithChildren<{}>>

const regions = [ContentRegion, BottomNavigationRegion]

interface Props {}

export type AppLayoutProps = PropsWithChildren<Props>

const Main = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: mobileUI.shared.maxWidth,
  height: '100%',
  width: '100%',
  position: 'relative',
  margin: '0 auto',
})

const BottomNavigationContainer = styled('footer')(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.white,
  boxShadow: `${theme.spacing(0, -0.25, 0.75, 0)} #EBEBEB`,
}))

const ROUTES_WITHOUT_NAVIGATION = ['/flight', '/hotel']

export function AppLayout({children}: AppLayoutProps) {
  const location = useLocation()
  const withoutNavigation = ROUTES_WITHOUT_NAVIGATION.some((value) => location.pathname.startsWith(value))
  const map = groupChildrenByType(children, regions)
  const contentChild = map.get(ContentRegion)
  const bottomNavigationChild = map.get(BottomNavigationRegion)

  return (
    <Main>
      {contentChild && (
        <ContentScrollContainer className="main-scroll">
          <Stack direction="column" height="100%">
            {contentChild}
          </Stack>
        </ContentScrollContainer>
      )}
      {bottomNavigationChild && !withoutNavigation && <BottomNavigationContainer>{bottomNavigationChild}</BottomNavigationContainer>}
    </Main>
  )
}
