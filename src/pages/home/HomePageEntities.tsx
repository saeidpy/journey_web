import {entityFromResort} from 'src/shared/entity'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {homePageQuery} from './homePage.query'

export const HomePageEntities = () => {
  return <ScrollBasedInfiniteQuery queryKey={['homePageQuery']} queryFn={homePageQuery} selectData={entityFromResort} />
}
