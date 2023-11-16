interface Window {
  ewano: {
    onWebAppReady: () => void
    pay: (amount, orderId, callbackUrl) => boolean
    paymentResult: (status) => void
    //   // code goes here
    //   }
  }
}
declare module 'swiper/react' {
  export {Swiper, SwiperClass, SwiperProps, SwiperRef, SwiperSlide, SwiperSlideProps, useSwiper, useSwiperSlide} from 'swiper/react'
}
