import {ComponentMeta, ComponentStory} from '@storybook/react'
import imgUrl from 'src/assets/img/img.jpg'
import {HotelCart} from './HotelCart'
export default {
  title: 'HotelCart',
  component: HotelCart,
} as ComponentMeta<typeof HotelCart>

const Template: ComponentStory<typeof HotelCart> = (args) => <HotelCart {...args} />

export const HotelCartEx = Template.bind({})
HotelCartEx.args = {
  cityName: 'تهران',
  country: 'ایران',
  imageUrl: imgUrl,
  minPrice: 1236000,
  name_fa: 'هتل هما',
  rate: 3.5,
  star: 5,
  voteCount: 20,
}
