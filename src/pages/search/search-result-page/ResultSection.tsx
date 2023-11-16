import {Grid} from '@mui/material'
import {ScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {NoDataContentSection} from 'src/shared/search'
import {searchResultQuery} from './searchResult.query'
import {singleResultContent} from './singleResultContent'

type ResultSectionProps = {
  searchTerm: string
  filter: string
}
export const ResultSection = ({searchTerm, filter}: ResultSectionProps) => {
  return (
    <>
      <Grid py={2} container spacing={3}>
        <ScrollBasedInfiniteQuery
          queryKey={filter ? [searchTerm, filter] : ['searchResult', searchTerm]}
          queryFn={searchResultQuery}
          selectData={singleResultContent}
          noResult={
            <Grid item width="100%">
              <NoDataContentSection searchTerm={searchTerm} />
            </Grid>
          }
        />
      </Grid>
    </>
  )
}
