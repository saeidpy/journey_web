import {Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {useNavigate} from 'react-router'
import {Header} from 'src/shared/layouts/app-layout'
import {FlatFullWidthSlideContainer} from 'src/shared/slider-container'
import {cityInfoQuery} from './cityInfo.query'

export interface CityInfoProps {
  cityId: string
}

const StyledTypography = styled(Typography)(({theme}) => ({
  marginTop: theme.spacing(2),
  textAlign: 'justify',
}))

export function CityInfo({cityId}: CityInfoProps) {
  const {data, isSuccess} = useQuery(['CityInfo', cityId], cityInfoQuery)
  const navigate = useNavigate()
  console.log(data)
  console.log('datadatadatadatadata')
  if (isSuccess) {
    return (
      <>
        <Header title={data?.city_name_fa} hasBackButton fullWidth />
        <Stack width="100%" pb={4} position="relative">
          {data?.media_list && data?.media_list?.length > 0 && (
            <FlatFullWidthSlideContainer
              onClick={() => {
                navigate(`/things/${cityId}/things-photos`, {state: {resort: data}})
                // navigate({pathname: 'things-photos'}, {state: {resort: data}})
              }}
              list={data?.media_list}
            />
          )}

          {data?.description && (
            <StyledTypography color="shades.8" variant="body1">
              {data?.description}
            </StyledTypography>
          )}
        </Stack>
      </>
    )
  } else return null
}
