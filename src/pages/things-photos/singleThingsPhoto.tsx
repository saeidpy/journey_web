import {Stack, styled} from '@mui/material'
import {useState} from 'react'
import {FullScreenModalForSlider} from 'src/shared/modal'
import {useScrollBasedInfiniteQuery} from 'src/shared/scroll-based-infinite-query'
import {FlatFullWidthSlideContainer} from 'src/shared/slider-container'
import {MediaEnum, MediaResponse, ResortPhotoResponseType} from 'src/shared/types/server'

const Wrapper = styled(Stack)(({theme}) => ({
  width: '50%',
  boxSizing: 'border-box',
  height: theme.spacing(20),
  padding: theme.spacing(0.2, 0.2),
}))

const Image = styled('img')(({theme}) => ({
  width: '100%',
  objectFit: 'fill',
  height: '100%',
}))

const PhotoComponent = (props: MediaResponse & {index: number}) => {
  const [isShown, setIsShown] = useState(false)
  const {data} = useScrollBasedInfiniteQuery<ResortPhotoResponseType['data']>()
  const flatData = data ? data?.pages.map((item) => item?.result as MediaResponse[]).flat() : [props]

  return (
    <>
      <Wrapper>
        <Image
          onClick={() => {
            setIsShown(true)
          }}
          src={props.url}
        />
      </Wrapper>
      {isShown ? (
        <FullScreenModalForSlider
          close={() => {
            setIsShown(false)
          }}
          UserInfo={<></>}
          // UserInfo={<UserInfoSection theme="light" subtitle="110" name={'علی حسینی'} imageUrl="" userId="" />}
        >
          <FlatFullWidthSlideContainer list={flatData} initialSlide={props.index} />
        </FullScreenModalForSlider>
      ) : null}
    </>
  )
}
export const singleThingsPhoto = (props: MediaResponse, index: number, key?: React.Key | null) => {
  return props.type[0] === MediaEnum.IMAGE ? <PhotoComponent {...props} index={index} key={key} /> : null
}
