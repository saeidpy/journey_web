import {Trans} from '@lingui/macro'
import {Divider, Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {ChangeEvent} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {LeftArrow} from 'src/assets/icons'
import {Button, MenuButton} from 'src/shared/button'
import {Tag} from 'src/shared/label'
import {useHandleBack} from 'src/shared/layouts/app-layout'
import {Map} from 'src/shared/map'
import {RateReverse} from 'src/shared/rate'
import {FlatFullWidthSlideContainer} from 'src/shared/slider-container'
import {ResortResponseItem, ResortTypeEnum} from 'src/shared/types/server'
import {getGeoPointFromLocationResponse} from 'src/shared/utils/getGeoPointFromLocationResponse'
import RelateSection from './RelateSection'
import {resortInfoQuery} from './resortInfo.query'
import {PlaceExplanation} from './ThingsPageStuff'

const RelatedDivider = styled(Divider)(({theme}) => ({
  margin: theme.spacing(2.5, 1.25),
}))

const InputLabel = styled('label')({
  display: 'block',
  width: '100%',
})

const ThingsPageContainer = styled('div')(({theme}) => ({
  margin: theme.spacing(-2),
  paddingBottom: theme.spacing(2),
}))

const PlaceExplanationWrapper = styled(Stack)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1, 0, 2, 0),
}))

export default function ThingsPage() {
  const {id = ''} = useParams<{id: string}>()
  const resort = useLocation()?.state?.resort as ResortResponseItem
  const navigate = useNavigate()
  const handleBackButton = useHandleBack()

  if (!id) {
    navigate({pathname: '/'}, {replace: true})
  }

  const {data, isSuccess} = useQuery(['ThingsPage', id], resortInfoQuery, {
    placeholderData: resort,
    staleTime: 0,
  })

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      const filesArray = Array.from(files)
      navigate({pathname: 'add-photo'}, {state: {files: filesArray}})
    }
  }

  const tagListGenerator = (resortType: ResortTypeEnum): string[] => {
    switch (resortType) {
      case ResortTypeEnum.TOURISM_ENTITY: {
        return data ? [data?.tourism_entity_type_name_fa, data?.resort_type_fa, data?.category_name_fa] : []
      }
      case ResortTypeEnum.RESIDENCE: {
        // navigate(`/hotel/hotel-details/${id}`)
        //todo After the api comes, it will be fixed
        navigate(`/things/${id}`)
        return data ? [data?.resort_type_fa, data?.residence_type_name_fa] : []
      }
      case ResortTypeEnum.RESTAURANT: {
        return data ? [data?.resort_type_fa, data?.restaurant_type_name_fa] : []
      }
      default:
        return []
    }
  }

  if (isSuccess) {
    const geoPoint = getGeoPointFromLocationResponse(data?.location)
    return (
      <ThingsPageContainer>
        <Stack sx={{position: 'relative'}}>
          {data && (
            <FlatFullWidthSlideContainer
              onClick={() => {
                //navigate(`/things/${id}/things-photos`)
                // window.location.reload()
                navigate({pathname: 'things-photos'}, {state: {resort: data}})
              }}
              noPadding
              list={data.media_list ?? []}
            />
          )}
          <MenuButton variant="contained" onClick={handleBackButton}>
            <LeftArrow />
          </MenuButton>
        </Stack>
        <Stack px={2}>
          <Stack py={1}>
            <Typography variant="h3" mt={2}>
              {data?.name_fa}
            </Typography>
          </Stack>
          <Stack py={1} justifyContent={'flex-start'}>
            <Stack direction={'row'}>
              <RateReverse count={data ? data.comment_count : 0} rate={data?.total_popularity_score} />
              <Stack direction={'row'} flex={'1'} flexWrap={'wrap'}>
                {data &&
                  tagListGenerator(data?.resort_type[0]).map((x, i) => (
                    <Tag variant="subtitle1" key={i}>
                      {x}
                    </Tag>
                  ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="subtitle1" color="shades.5">
              {[
                data?.location?.city?.province?.province_name_fa,
                data?.location?.city?.city_name_fa,
                data?.resort_type_fa,
                data?.tourism_entity_type_name_fa,
              ]
                .filter((i) => i)
                .join(' / ')}
            </Typography>
          </Stack>
          {data?.description && (
            <PlaceExplanationWrapper>
              <PlaceExplanation
                navigate={() => navigate({pathname: 'things-explanation'}, {state: {resort: data}})}
                text={data.description}
              />
            </PlaceExplanationWrapper>
          )}

          <Stack sx={{overflow: 'hidden'}}>
            {geoPoint?.lat && geoPoint?.lon ? <Map name={data?.name_fa || ''} lat={geoPoint.lat} lng={geoPoint.lon} /> : null}
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            {data && (
              <Button
                variant="outlined"
                sx={{mx: 1}}
                fullWidth
                color="inherit"
                onClick={() => {
                  navigate('./add-comment', {
                    state: {
                      data,
                    },
                  })
                }}
              >
                <Trans>Add comment</Trans>
              </Button>
            )}
            <InputLabel htmlFor={`upload-image-file-for-${id}`}>
              <input type="file" onChange={onFileChange} hidden accept="image/*" id={`upload-image-file-for-${id}`} multiple />
              <Button variant="outlined" fullWidth color="inherit" component="span">
                <Trans>Add photo</Trans>
              </Button>
            </InputLabel>
          </Stack>
          <RelatedDivider />
          <RelateSection />
        </Stack>
      </ThingsPageContainer>
    )
  } else {
    return null
  }
}
