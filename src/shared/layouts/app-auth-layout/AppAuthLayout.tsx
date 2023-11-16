import {styled} from '@mui/material'
import {ComponentType, PropsWithChildren} from 'react'
import {mobileUI} from 'src/shared/constants'
import {groupChildrenByType} from 'src/shared/utils/groupChildrenByType'

// typescript only allows string when it defined at `JSX.IntrinsicElements`
export const HeaderRegion = 'HeaderRegion' as unknown as ComponentType<PropsWithChildren<{}>>
export const ContentRegion = 'ContentRegion' as unknown as ComponentType<PropsWithChildren<{}>>
export const FooterRegion = 'FooterRegion' as unknown as ComponentType<PropsWithChildren<{}>>

const regions = [HeaderRegion, ContentRegion, FooterRegion]

interface Props {}

export type AppAuthLayoutProps = PropsWithChildren<Props>

const Main = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: mobileUI.shared.maxWidth,
  padding: theme.spacing(2),
  height: '100%',
  width: '100%',
  position: 'relative',
  margin: '0 auto',
  backgroundColor: 'white',
}))

const HeaderContainer = styled('header')({
  width: '100%',
  flex: '0 0 auto',
})

const ContentContainer = styled('main')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  flex: '1 1 auto',
  overflowY: 'auto',
  overflowX: 'hidden',

  '& form': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

const FooterContainer = styled('footer')({
  width: '100%',
  flex: '0 0 auto',
  textAlign: 'center',
})

export function AppAuthLayout({children}: AppAuthLayoutProps) {
  const map = groupChildrenByType(children, regions)
  const headerChild = map.get(HeaderRegion)
  const contentChild = map.get(ContentRegion)
  const footerChild = map.get(FooterRegion)

  return (
    <Main>
      <HeaderContainer>{headerChild}</HeaderContainer>
      <ContentContainer>{contentChild}</ContentContainer>
      <FooterContainer>{footerChild}</FooterContainer>
    </Main>
  )
}
