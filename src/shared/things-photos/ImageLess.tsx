import {Trans} from '@lingui/macro'
import {styled} from '@mui/material'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
})

const Text = styled('div')({
  flex: 1,
})

const Illustration = styled('div')({
  backgroundColor: 'gray',
  display: 'flex',
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
})

const MessageContent = () => {
  return (
    <Text>
      <h4>
        <Trans>No photos for this place!</Trans>
      </h4>
      <p>
        <Trans>Be the first one to add photo for this place</Trans>
      </p>
    </Text>
  )
}
export const ImageLess = () => {
  return (
    <Wrapper>
      <MessageContent />
      <Illustration>الستریشن</Illustration>
    </Wrapper>
  )
}
