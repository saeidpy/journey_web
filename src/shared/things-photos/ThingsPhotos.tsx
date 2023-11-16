import {Trans} from '@lingui/macro'
import {styled} from '@mui/material'
import {useState} from 'react'
import {useUserProfile} from 'src/core/auth'
import {AddPhotoButton} from 'src/shared/add-photo-button'
import {FullScreenModalForSlider} from 'src/shared/modal'
import {FlatFullWidthSlideContainer} from 'src/shared/slider-container'
import {MediaEnum} from 'src/shared/types/server'
import {UserInfoSection} from 'src/shared/user-info-section'

const Wrapper = styled('div')(() => ({
  overflow: 'hidden',
  width: '100%',
  height: '100%',
}))

const CenteredBox = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))
const TitleBox = styled('div')(({theme}) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 'auto',
  padding: theme.spacing(2, 0),
}))
const TwoColumnWrapper = styled('div')(() => ({
  overflowY: 'scroll',
  display: 'flex',
  flexWrap: 'wrap',
  height: '85%',
}))

const ImagesColumn = styled('div')({
  width: '100%',
  flex: '50%',
  display: 'flex',
  flexDirection: 'column',
})

const Image = styled('img')(({theme}) => ({
  width: '100%',
  padding: theme.spacing(0.2, 0.2),
}))

type ImageWithOwnerIdType = {
  imageUrl: string
  ownerId: string
}
type ThingsPhotoType = {
  resortId: string
  Image: ImageWithOwnerIdType[]
  count: number
  onScrollDown?: () => {}
}
export const ThingsPhotos = (props: ThingsPhotoType) => {
  const {user} = useUserProfile()
  const [isShown, setIsShown] = useState(false)
  const oddImages = props.Image.filter((_, index) => index % 2 !== 0)
  const evenImages = props.Image.filter((_, index) => index % 2 === 0)

  const handleClick = () => {}
  return (
    <Wrapper>
      <TitleBox>
        <CenteredBox>
          <span>
            <Trans>Photos</Trans>
          </span>
        </CenteredBox>
        <CenteredBox>
          <h3>
            <span> {props.count} </span>
            <span>
              <Trans>Photo</Trans>
            </span>
          </h3>
        </CenteredBox>
      </TitleBox>
      <TwoColumnWrapper
        onClick={() => {
          setIsShown(true)
        }}
      >
        <ImagesColumn>
          {oddImages.map((item, index) => (
            <Image src={item.imageUrl} onClick={handleClick} key={index} />
          ))}
        </ImagesColumn>
        <ImagesColumn>
          {evenImages.map((item, index) => (
            <Image src={item.imageUrl} onClick={handleClick} key={index} />
          ))}
        </ImagesColumn>
      </TwoColumnWrapper>
      {user && <AddPhotoButton resortId={props.resortId} />}
      {isShown ? (
        <FullScreenModalForSlider
          close={() => {
            setIsShown(false)
          }}
          UserInfo={<UserInfoSection theme="light" subtitle="110" name={'علی حسینی'} imageUrl="" userId="" />}
        >
          <FlatFullWidthSlideContainer
            list={props.Image.map((url) => ({
              type: [MediaEnum.IMAGE, [MediaEnum.IMAGE]],
              url: url.imageUrl,
              adder_by_id: Number(url.ownerId),
              created_at: '',
              dislike_count: 0,
              impression_of_the_caller: null,
              is_main: false,
              like_count: 0,
              media_file_storage: null,
              media_id: 0,
              storage_path: null,
              temporary_media_url: null,
            }))}
          />
        </FullScreenModalForSlider>
      ) : null}
    </Wrapper>
  )
}
