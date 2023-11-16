import {styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {resortInfoQuery} from 'src/pages/things/resortInfo.query'
import {ResortResponseItem} from 'src/shared/types/server'

type PlaceExplanationType = {
  resort?: ResortResponseItem | null
  id: string
}

type textProp = {
  text: string
}

const Wrapper = styled('div')(({theme}) => ({
  display: 'flex',
  position: 'relative',
  height: theme.spacing(99),
}))

const Text = styled('div')({
  width: '100%',
  overflowY: 'auto',
  textAlign: 'justify',
})

const Gradient = styled('div')(({theme}) => ({
  position: 'absolute',
  width: '100%',
  height: theme.spacing(20),
  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0),rgba(255,255,255,1))',
  bottom: '0px',
}))

const TextContent = (prop: textProp) => {
  return (
    <Text>
      <Typography color="shades.8" variant="caption" py={10}>
        {prop.text}
      </Typography>
    </Text>
  )
}
export const PlaceExplanation = ({resort, id}: PlaceExplanationType) => {
  const {data} = useQuery(['ThingsPage', id], resortInfoQuery, {
    refetchOnWindowFocus: false,
    placeholderData: resort ?? undefined,
    staleTime: 0,
  })
  console.log(data?.description)
  console.log('descriptiondescriptiondescriptiondescriptiondescription')
  return (
    <Wrapper>
      {data && <TextContent text={data?.description as string} />}
      <Gradient />
    </Wrapper>
  )
}
