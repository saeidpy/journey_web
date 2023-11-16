import {t, Trans} from '@lingui/macro'
import {Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router'
import {noContent} from 'src/assets/img'
import {useBookHotel} from 'src/core/book-hotel/useBookHotel'
import {Button} from 'src/shared/button'
import {HotelRoomSelection} from 'src/shared/hotel'
import {HotelSearchByResortIdRequestType} from 'src/shared/types/server'
import {hotelSearchQuery} from './hotelSearch.query'

const CentricWrapper = styled(Stack)(({theme}) => ({
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2, 0),
  textAlign: 'center',
}))

function HotelRoomSelectionSection() {
  const {id = ''} = useParams<{id: string}>()
  const {
    bookHotel: {count, rangeDate},
  } = useBookHotel()
  const queryData: HotelSearchByResortIdRequestType = {
    resort_id: Number(id),
    city_id: null,
    rooms:
      count?.map((item, index) => ({
        room_no: index + 1,
        adult_count: item.adult,
        child_count: item.child,
        child_ages: item.childAge,
      })) ?? [],
    checkin_date: rangeDate?.[0] ?? '',
    checkout_date: rangeDate?.[1] ?? '',
  }

  const {data: hotelSearchData, isError} = useQuery(['hotelRooms', queryData], hotelSearchQuery, {retry: 1, useErrorBoundary: false})

  return (
    <Stack>
      {hotelSearchData?.length && !isError ? (
        <Stack>
          <Stack>
            <Typography variant="h1">
              <Trans>Choose the room you want</Trans>
            </Typography>
          </Stack>
          {hotelSearchData.map((item, index) => (
            <HotelRoomSelection
              facilities={item.residence.amenities}
              nightsCount={0}
              passengerCount={0}
              roomName={item.seating?.[0]?.bed_group || ''}
              address={item.residence?.location?.['address'] ?? ''}
              hotelName={item.residence.name_fa}
              pricePerNight={item.total_price.total}
            />
          ))}
          <Stack mt={1}>
            <Button variant="outlined" color="inherit">
              <Trans>Show more rooms</Trans>
            </Button>
          </Stack>
        </Stack>
      ) : (
        <CentricWrapper px={1}>
          <CentricWrapper>
            <img alt={t`No result content.`} src={noContent} width="100%" />
          </CentricWrapper>
          <CentricWrapper>
            <Typography variant="caption" width="277px" height="38px" textAlign="center">
              <Trans>There is no available room in your selected time frame, choose another date</Trans>
            </Typography>
          </CentricWrapper>
        </CentricWrapper>
      )}
    </Stack>
  )
}

export default HotelRoomSelectionSection
