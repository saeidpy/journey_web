import {styled} from '@mui/material'
import {QueryFunction, QueryKey, useInfiniteQuery, UseInfiniteQueryResult} from '@tanstack/react-query'
import {atom, useAtom} from 'jotai'
import {ReactNode, useEffect, useMemo} from 'react'
import {mobileUI} from 'src/shared/constants'
import {useScrollPage} from 'src/shared/layouts/app-layout'
import {Spinner} from 'src/shared/loading'
import {BaseResponseType} from 'src/shared/types/server'

const SpinnerContainer = styled('div')({
  display: 'flex',
  height: mobileUI.scroll.bottomLoadingHeight,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

export interface ScrollBasedInfiniteQueryProps<Data, Key extends QueryKey> {
  queryKey: Key
  queryFn: QueryFunction<BaseResponseType<Data[]>['data'], Key>
  selectData: (data: Data, index: number) => ReactNode
  initialData?: Data[]
  noResult?: ReactNode
}

export const scrollBasedInfiniteQueryAtom = atom<UseInfiniteQueryResult<unknown, unknown> | null>(null)

export function useScrollBasedInfiniteQuery<Data = unknown, Error = unknown>() {
  const [queryResult] = useAtom(scrollBasedInfiniteQueryAtom)
  if (!queryResult) {
    throw new Error('useScrollBasedInfiniteQuery must be used inside the ScrollBasedInfiniteQuery component')
  }
  return queryResult as UseInfiniteQueryResult<Data, Error>
}

export function ScrollBasedInfiniteQuery<Data = unknown, Key extends QueryKey = QueryKey>({
  queryKey,
  queryFn,
  selectData,
  initialData,
  noResult,
}: ScrollBasedInfiniteQueryProps<Data, Key>) {
  const [, setQueryResult] = useAtom(scrollBasedInfiniteQueryAtom)

  const queryConfig = {
    queryKey,
    queryFn,
    suspense: false,
    placeholderData: initialData
      ? {
          count: initialData.length + 1,
          result: initialData,
        }
      : undefined,
    staleTime: initialData ? 0 : undefined,
  }
  //@ts-ignore
  const queryResult = useInfiniteQuery(queryConfig)

  useEffect(() => {
    setQueryResult(queryResult)
  }, [])

  const {data, fetchNextPage, isFetching, isFetchedAfterMount} = queryResult
  const totalData = useMemo(
    () =>
      data?.pages
        .map((i) => i?.result ?? [])
        .flat()
        .filter((i) => i) ?? [],
    [data]
  )

  const shouldFetchTheNextPage = !isFetching && isFetchedAfterMount && (data?.pages[data.pages.length - 1]?.result.length ?? 0) > 0
  const lastPageParam = data ? (data.pageParams[data.pageParams.length - 1] as number) ?? 0 : 0
  const {page} = useScrollPage(0, shouldFetchTheNextPage ? lastPageParam + 1 : lastPageParam)

  useEffect(() => {
    if (page > lastPageParam && shouldFetchTheNextPage) {
      fetchNextPage({pageParam: page})
    }
  }, [page, fetchNextPage, lastPageParam, shouldFetchTheNextPage])

  return (
    <>
      {totalData.map(selectData)}
      {isFetching ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : null}
      {!isFetching && !shouldFetchTheNextPage && !totalData.length ? noResult : null}
    </>
  )
}
