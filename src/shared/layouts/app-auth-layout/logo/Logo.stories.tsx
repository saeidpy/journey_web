import {ComponentMeta, ComponentStory} from '@storybook/react'
import Logo from './Logo'

export default {
  title: 'Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = () => <Logo />

export const LoginPageLogo = Template.bind({})
