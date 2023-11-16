import {useEffect, useState} from 'react'
import {isReachedBottom} from 'src/shared/utils/isReachedBottom'
import {useMainContentScroll} from './ContentScrollContainer'

export const useScrollPage = (initialPage: number, nextPage: number) => {
  const [page, setPage] = useState(initialPage)
  const scrollElRef = useMainContentScroll()
  useEffect(() => {
    if (scrollElRef?.current && nextPage !== page) {
      const scrollEl = scrollElRef.current
      const onScroll = () => {
        if (nextPage > page && isReachedBottom(scrollEl)) {
          setPage(nextPage)
        }
      }
      scrollEl.addEventListener('scroll', onScroll, {passive: true})
      return () => {
        scrollEl.removeEventListener('scroll', onScroll)
      }
    }
  }, [scrollElRef, nextPage, page])

  return {page, scrollElRef}
}
