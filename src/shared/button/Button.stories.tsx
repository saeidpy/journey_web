import {ComponentMeta} from '@storybook/react'
import {Button} from './Button'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

// const Template: ComponentStory<typeof Button> = (args) => (
//    <Button {...args} />
// )

// export const fullwidthButton = Template.bind({})
// fullwidthButton.args = {variant: 'contained', fullWidth: true, children: 'Test Button'}

// export const halfwidthButton = Template.bind({})
// halfwidthButton.args = {variant: 'outlined', children: 'Test Button', fullWidth: false}

// export const iconButton = Template.bind({})
// iconButton.args = {variant: 'outlined', startIcon = {<GIcon />}, fullWidth: true, children: 'ورود با گوگل'}
