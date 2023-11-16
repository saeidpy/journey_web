import {styled} from '@mui/material/styles'
import {useInfiniteQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {noImagePng} from 'src/assets/img'
import {MediaResponse} from 'src/shared/types/server'
import {shouldForwardProp} from 'src/shared/utils/shouldForwardProp'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {Pagination} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import {getResortPhotos} from './getResortPhotos.query'

interface SliderProps {
  list?: MediaResponse[]
  initialSlide?: number
  urlList?: string[]
  resortId?: string
  count?: number
  media_count?: number
}

const SlideImageWrapper = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})

const SlideImage = styled('img', {shouldForwardProp})<{contain?: boolean}>(({contain, theme}) => ({
  width: '100%',
  height: '100%',
  boxShadow: `${theme.spacing(0, 0, 0.625, 0.25)} ${theme.palette.shades[8]}1A`,
  objectFit: contain ? 'contain' : 'cover',
}))

const StyledSwiper = styled(Swiper)(({theme}) => ({
  width: '100%',
  height: '100%',
  '& .swiper-button-disabled': {
    pointerEvents: 'auto !important',
  },
  '& .swiper-pagination-bullet': {
    backgroundColor: theme.palette.shades['4'],
    opacity: 1,
    height: 6,
    width: 6,
    margin: `0 ${theme.spacing(0.25)} !important`,
    '&.swiper-pagination-bullet-active': {
      backgroundColor: theme.palette.shades['1'],
      height: 8,
      width: 8,
      marginBottom: '-1px !important',
    },
  },
}))

export const Slider = ({list, resortId, initialSlide, urlList = [], media_count = 0}: SliderProps) => {
  const [goNextPage, setGoNextPage] = useState(false)

  const {data, fetchNextPage} = useInfiniteQuery(
    ['getResortPhotos', resortId],
    ({pageParam}) => getResortPhotos(resortId, pageParam), // Pass the arguments separately
    {
      enabled: media_count - urlList.length > 0 && goNextPage,
      getNextPageParam: (lastPage, totalPages) => totalPages?.length + 1 || 1,
    }
  )

  const handleSlideChange = (swiper: {realIndex: number}) => {
    setGoNextPage(true)
    //@ts-ignore
    if (data?.pages?.at(-1)?.has_next) {
      fetchNextPage()
    }
  }

  //@ts-ignore
  const dataFromQuery = data?.pages?.at(-1)?.result?.map((item: any) => item.url)
  const dataFinal = dataFromQuery ? [...urlList, ...dataFromQuery] : [...urlList]

  return (
    <StyledSwiper
      modules={[Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      centeredSlidesBounds
      pagination={{clickable: false, dynamicBullets: true}}
      onSlideChange={handleSlideChange}
    >
      {list?.length ? (
        list.map(({url}, index) => (
          <SwiperSlide key={index}>
            <SlideImageWrapper>
              <SlideImage
                src={url}
                loading="lazy"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = noImagePng
                }}
              />
              <div className="swiper-lazy-preloader" />
            </SlideImageWrapper>
          </SwiperSlide>
        ))
      ) : dataFinal?.length ? (
        dataFinal.map((url, index) => (
          <SwiperSlide key={index}>
            <SlideImageWrapper>
              <SlideImage
                src={url}
                loading="lazy"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = noImagePng
                }}
              />
              <div className="swiper-lazy-preloader" />
            </SlideImageWrapper>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <SlideImageWrapper>
            <SlideImage src={noImagePng} alt="Nothing's here" contain sx={{backgroundColor: 'rgb(208,208,208)'}} />
          </SlideImageWrapper>
        </SwiperSlide>
      )}
    </StyledSwiper>
  )
}
