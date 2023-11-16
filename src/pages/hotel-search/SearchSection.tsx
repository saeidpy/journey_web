import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {noContent} from 'src/assets/img'
import {useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {mobileUI} from 'src/shared/constants'
import {HotelCart} from 'src/shared/hotel'
import {Spinner} from 'src/shared/loading'
import {dateApiFormat} from 'src/shared/utils/jalaliDate'
import {hotelCityQuery} from './hotel.query'

const SpinnerContainer = styled('div')({
  display: 'flex',
  height: mobileUI.scroll.bottomLoadingHeight,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

const CentricWrapper = styled(Stack)(({theme}) => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2, 0),
  textAlign: 'center',
}))

export const SearchSection = () => {
  const {
    bookHotel: {destination, rangeDate, count},
  } = useBookHotel()
  const data = {
    city_id: destination?.value ?? '',
    checkin_date: dateApiFormat(rangeDate?.[0] ?? ''),
    checkout_date: dateApiFormat(rangeDate?.[1] ?? ''),
    rooms:
      count?.map((item, index) => ({
        room_no: index + 1,
        adult_count: item.adult,
        child_count: item.child,
        child_ages: item.childAge,
      })) ?? [],
  }
  const {data: _data, isFetching} = useQuery(['hotel', data], hotelCityQuery, {useErrorBoundary: false})

  return (
    <Stack pt={2} gap={2}>
      {isFetching ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : _data?.length ? (
        <>
          <Typography px={0.5} variant="h6">
            <Trans>{_data?.length} The hotel was found</Trans>
          </Typography>
          {_data.map((item: any, index: any) => (
            <HotelCart
              key={index}
              name_fa={item.residence.name_fa}
              imageUrl={''}
              star={item.residence.star}
              rate={item.residence.total_popularity_score}
              voteCount={item.residence.visited_count}
              minPrice={item.total_price.total}
              country={''}
              cityName={''}
              id={item.resortId}
            />
          ))}
        </>
      ) : (
        <>
          <CentricWrapper px={1} mt={20}>
            <CentricWrapper>
              <CentricWrapper>
                <img alt={t`No result content.`} src={noContent} width="100%" />
              </CentricWrapper>
              <CentricWrapper>
                <Typography variant="caption" width="277px" height="38px" textAlign="center">
                  <Trans>There is no available room in your selected time frame, choose another date</Trans>
                </Typography>
              </CentricWrapper>
            </CentricWrapper>
          </CentricWrapper>
        </>
      )}
    </Stack>
  )
}
