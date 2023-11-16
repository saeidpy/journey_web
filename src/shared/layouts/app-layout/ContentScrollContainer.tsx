import {styled} from '@mui/material'
import {createContext, DetailedHTMLProps, PropsWithChildren, RefObject, useContext, useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'

const ContentContainer = styled('main')(({theme}) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.shades[1],
  width: '100%',
  flex: '1 1 auto',
  overflowY: 'auto',
  overflowX: 'hidden',
}))

export const MainScrollContext = createContext<RefObject<HTMLElement> | null>(null)

export const useMainContentScroll = (): RefObject<HTMLElement> | null => {
  const context = useContext(MainScrollContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used inside the AuthGuard')
  }
  return context
}

export type ContentScrollContainerProps = PropsWithChildren<DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>

export const ContentScrollContainer = (props: ContentScrollContainerProps) => {
  const scrollElement = useRef<HTMLElement>(null)
  const locationHistoryKeys = useRef<string[]>([])
  const location = useLocation()
  useEffect(() => {
    if (scrollElement.current && !locationHistoryKeys.current.includes(location.key)) {
      locationHistoryKeys.current.push(location.key)
      scrollElement.current.scrollTo(0, 0)
    }
  }, [location])
  return (
    <MainScrollContext.Provider value={scrollElement}>
      <ContentContainer {...props} ref={scrollElement} />
    </MainScrollContext.Provider>
  )
}
