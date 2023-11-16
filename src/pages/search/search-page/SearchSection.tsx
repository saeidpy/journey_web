import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Entertainment, ForkAndKnife, Location, Rest, SearchIcon} from 'src/assets/icons'
import {useUserProfile} from 'src/core/auth'
import {mobileUI} from 'src/shared/constants'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {Spinner} from 'src/shared/loading'
import {NoDataContentSection, SearchItem} from 'src/shared/search'
import {SearchForm} from 'src/shared/search-form'
import {LocationCityResponse, SearchEntityTypeEnum, SearchResponseType} from 'src/shared/types/server'
import {parseParamQuery} from 'src/shared/utils/paramQuery'
import {mostVisitedQuery} from './mostVisited.query'
import {searchMutation} from './search.mutation'
import {searchClickMutation} from './searchClick.mutation'
import {searchHistoryMutation} from './searchHistory.mutation'

type SearchDataToShow = {
  id: number
  result_text: string
  type: SearchEntityTypeEnum
}

const ResultText = styled(Typography)(({theme}) => ({
  padding: theme.spacing(0, 1, 0, 1),
  color: theme.palette.shades[8],
  fontWeight: 300,
  fontSize: '16px',
}))

const SearchFormWrapper = styled(Stack)({
  position: 'sticky',
  top: 0,
  zIndex: mobileUI.zIndex.header,
  width: '100%',
})

export const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()
  const {search} = useLocation()
  const {type: filter = ''} = parseParamQuery(search)
  const filtersearch = filter
  const handleBackButton = useHandleBack()
  const {user} = useUserProfile()

  const {data, isSuccess, isLoading, mutate, isIdle} = useMutation(searchMutation)
  const {mutateAsync: clickMutateAsync} = useMutation(searchClickMutation)
  const {mutate: historyMutate, data: historyData} = useMutation(searchHistoryMutation)
  const {data: mostVisitedCityData, isFetched: mostVisitedCityIsFetched} = useQuery(['SearchSection'], mostVisitedQuery, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (user) {
      const abortController = new AbortController()
      historyMutate({signal: abortController.signal})
    }
  }, [historyMutate, user])

  useEffect(() => {
    if (searchTerm.length > 0) {
      const abortController = new AbortController()
      mutate({searchTerm, filter, signal: abortController.signal})
      return () => {
        if (!abortController.signal.aborted) {
          abortController.abort()
        }
      }
    }
  }, [searchTerm, filter, mutate])

  const ContentWithData = (props: {data: SearchResponseType[]}) => {
    const records = props.data.map((item) => {
      return {id: item.id, result_text: item.result_text, type: item.entity_type[0]} as SearchDataToShow
    })

    return (
      <Stack pt={1}>
        {records.map((item, i) => (
          <SearchItem
            key={i}
            onClick={() => {
              if (user) {
                const abortController = new AbortController()
                clickMutateAsync({
                  entity_type: item.type,
                  id: item.id.toString(),
                  result_text: item.result_text,
                  search_text: searchTerm,
                  signal: abortController.signal,
                })
              }

              item.type === SearchEntityTypeEnum.CITY
                ? navigate({pathname: `/city/${item.id}`})
                : item.type === SearchEntityTypeEnum.RESIDENCE
                ? navigate({pathname: `/things/${item.id}`})
                : //todo After the api comes, it will be fixed
                  // ? navigate({pathname: `/hotel/hotel-details/${item.id}`})
                  navigate({pathname: `/things/${item.id}`})
            }}
          >
            {item.type === SearchEntityTypeEnum.CITY ? (
              <Location />
            ) : item.type === SearchEntityTypeEnum.RESTAURANT ? (
              <ForkAndKnife />
            ) : item.type === SearchEntityTypeEnum.RESIDENCE ? (
              <Rest />
            ) : (
              <Entertainment />
            )}
            <ResultText>{item.result_text}</ResultText>
          </SearchItem>
        ))}
        <SearchItem
          onClick={() => {
            navigate({pathname: 'search-result', search: `q=${window.encodeURIComponent(searchTerm)}`})
          }}
        >
          <SearchIcon width="24px" height="24px" />
          <ResultText>{t`See all results for «${searchTerm}»`}</ResultText>
        </SearchItem>
      </Stack>
    )
  }

  const PrimaryContent = (props: {data: LocationCityResponse[] | undefined; historyData: SearchResponseType[] | undefined}) => (
    <Stack>
      {historyData && historyData.length > 0 && user && (
        <Stack>
          <Typography py={2} color="shades.6" variant="caption">
            <Trans>Recently viewed</Trans>
          </Typography>
          {props.historyData?.map((item, i) => (
            <SearchItem
              key={i}
              onClick={() => {
                item.entity_type[0] === SearchEntityTypeEnum.CITY
                  ? navigate({pathname: `/city/${item.id}`})
                  : item.entity_type[0] === SearchEntityTypeEnum.RESIDENCE
                  ? //todo After the api comes, it will be fixed
                    // ? navigate({pathname: `/hotel/hotel-details/${item.id}`})
                    navigate({pathname: `/things/${item.id}`})
                  : navigate({pathname: `/things/${item.id}`})
              }}
            >
              {item.entity_type[0] === SearchEntityTypeEnum.CITY ? (
                <Location />
              ) : item.entity_type[0] === SearchEntityTypeEnum.RESTAURANT ? (
                <ForkAndKnife />
              ) : item.entity_type[0] === SearchEntityTypeEnum.RESIDENCE ? (
                <Rest />
              ) : (
                <Entertainment />
              )}
              <ResultText>{item.result_text}</ResultText>
            </SearchItem>
          ))}
        </Stack>
      )}
      <Stack mt={3}>
        <Typography py={2} variant="caption" color="shades.6">
          <Trans>Popular cities</Trans>
        </Typography>
        {props.data?.map((item, i) => (
          <SearchItem
            key={i}
            onClick={() => {
              navigate({pathname: `/city/${item.city_id}`})
            }}
          >
            <Location />
            <ResultText>{item.city_name_fa}</ResultText>
          </SearchItem>
        ))}
      </Stack>
    </Stack>
  )

  return (
    <>
      <SearchFormWrapper>
        <SearchForm
          onSubmit={(value) => {
            navigate({
              pathname: 'search-result',
              search: `q=${window.encodeURIComponent(searchTerm)}${filter ? `&filter=${filtersearch}` : ''}`,
            })
          }}
          onChange={setSearchTerm}
          name="search-page-input"
          onClear
          autoFocus
          onBack={handleBackButton}
        />
      </SearchFormWrapper>
      {isLoading && (
        <Stack justifyContent="center" alignItems="Center" height={300}>
          <Spinner />
        </Stack>
      )}

      {searchTerm && isSuccess && !isLoading && data && <ContentWithData data={data} />}
      {searchTerm && isSuccess && !isLoading && data?.length === 0 && <NoDataContentSection searchTerm={searchTerm} />}
      {(isIdle || !searchTerm) && mostVisitedCityIsFetched && <PrimaryContent data={mostVisitedCityData} historyData={historyData} />}
    </>
  )
}
