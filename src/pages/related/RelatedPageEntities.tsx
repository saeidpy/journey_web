import styled from '@emotion/styled'
import {useInfiniteQuery} from '@tanstack/react-query'
import {Fragment, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import {List, ListRowProps} from 'react-virtualized'
import {endPoints} from 'src/shared/constants'
import {Entity} from 'src/shared/entity'
import {Spinner} from 'src/shared/loading'
import {ResortResponseType} from 'src/shared/types/server'
import {ReducedResortResponse} from 'src/shared/types/server/resort/ResortItemResponseType'
import {simpleAxios} from 'src/shared/utils/axios'
import {handleRowHeight} from 'src/shared/utils/handleRowHeight'

interface SlideIndex {
  [id: string]: number
}

const slideIndex: SlideIndex = {}
let isFetchSarted = false

const SpinnerContainer = styled('div')({
  display: 'flex',
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',

  '& div': {
    position: 'absolute',
    top: '50%',
  },
})

const propertiesToKeep = [
  'location',
  'total_popularity_score',
  'comment_count',
  'resort_id',
  'resort_type',
  'media_list',
  'name_fa',
] as const

export const RelatedPageEntities = () => {
  const {id = ''} = useParams<{id: string}>()

  const [isRestored, setIsRestored] = useState(false)

  const fetchRelatedEntity = async ({pageParam = 0}) => {
    const res: {data: ResortResponseType} = await simpleAxios?.get(`${endPoints.resort.detail.related(id)}?page=${pageParam}`)

    // Technical Debt: use reduce
    const cleanData = res?.data?.data?.result?.map((itemFromData) => {
      const reducedItem: ReducedResortResponse = {
        location: {name: '', geo_point: {lat: null, lon: null}},
        total_popularity_score: 0,
        comment_count: 0,
        resort_id: 0,
        resort_type: '',
        media_list: [],
        name_fa: '',
        has_next: false,
      }

      propertiesToKeep.forEach((prop) => {
        if (prop === 'location') {
          ;(reducedItem[prop] as any) = {
            geo_point: itemFromData.location.geo_point,
            name: `${itemFromData.location.city.province.province_name_fa} - ${itemFromData.location.city.city_name_fa}`,
          }
        } else if (prop === 'media_list') {
          reducedItem[prop] = itemFromData.media_list.map((media) => media.url)
        } else {
          ;(reducedItem[prop] as any) = itemFromData[prop]
        }
      })

      return reducedItem
    })

    return cleanData || []
  }

  const onSettled = () => {
    isFetchSarted = false
  }

  const {data, isFetching, fetchNextPage, isLoading} = useInfiniteQuery({
    queryKey: [`RelatedEntityTo${id}`],
    queryFn: fetchRelatedEntity,
    getNextPageParam: (lastPage, totalPages) => totalPages?.length || 0,
    onSettled,
  })

  const listRef = useRef<List>(null)
  const totalData = data?.pages?.flat()

  const isEnd = data?.pages?.at(data?.pages?.length - 1)?.length === 0

  function rowRenderer({
    key, // key with foramt of '0-index'
    index, // index of items
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: Pick<ListRowProps, 'key' | 'index' | 'isScrolling' | 'isVisible' | 'style'>) {
    if (
      (isScrolling || isVisible) &&
      index >= 3 &&
      !isFetchSarted &&
      !isFetching &&
      !isLoading &&
      !isEnd &&
      index >= (totalData?.length || 0) - 7
    ) {
      isFetchSarted = true
      fetchNextPage()
    }

    if (index <= (totalData?.length || 0) - 1) {
      const resort = totalData?.[index]

      if (resort) {
        const {name_fa: placeName, total_popularity_score, location: customlocation, comment_count, resort_id: id} = resort

        return (
          <div key={key} style={style}>
            <Entity
              key={key}
              entityProps={{
                placeName,
                customlocation,
                id,
                resort,
                rate: total_popularity_score || 0,
                voteCount: comment_count || 0,
              }}
              sliderContainerProps={{
                isRounded: true,
                urlList: resort?.media_list,
                resortId: id.toString(),
              }}
            />
          </div>
        )
      }
    } else {
      return isEnd ? (
        <Fragment key={key} />
      ) : (
        <div key={key} style={style}>
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        </div>
      )
    }
  }

  return (
    <>
      {!!data && (
        <List
          ref={listRef}
          width={window.innerWidth <= 450 ? window.innerWidth - 31 : 450}
          height={window.innerHeight}
          rowCount={(totalData?.length || 0) + (isEnd ? 0 : 1)}
          rowHeight={handleRowHeight}
          rowRenderer={rowRenderer}
          style={{direction: 'rtl', borderRadius: 8}}
          overscanRowCount={2}
          onScroll={(e) => {
            if (e.scrollTop < 10) {
              return
            }

            slideIndex[id] = e.scrollTop

            if (!isRestored) {
              setIsRestored(true)
            }
          }}
          scrollTop={isRestored ? undefined : slideIndex[id]}
        />
      )}
    </>
  )
}
