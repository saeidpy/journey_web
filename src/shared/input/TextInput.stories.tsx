import {ComponentMeta, ComponentStory} from '@storybook/react'
import {CustomizedRadio} from './Radio'

export default {
  title: 'TextInputComponent',
  component: CustomizedRadio,
} as ComponentMeta<typeof CustomizedRadio>

// const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />
const RadioGroupTemplate: ComponentStory<typeof CustomizedRadio> = (args) => <CustomizedRadio {...args} />
// export const disabledTextInput = Template.bind({})
// disabledTextInput.args = {onChange: () => {}, placeholder: 'متن', title: 'عنوان', value: '', name: 'متن ورودی'}

// export const confirmedTextInput = Template.bind({})
// confirmedTextInput.args = {onChange: () => {}, placeholder: 'متن', title: 'عنوان', value: '', name: 'متن ورودی'}

// export const errorTextInput = Template.bind({})
// errorTextInput.args = {onChange: () => {}, placeholder: 'متن', title: 'عنوان', value: '', name: 'متن ورودی'}

export const Radio = RadioGroupTemplate.bind({})
Radio.args = {
  RadioList: [
    {label: 'one', value: 'sdf'},
    {label: 'two', value: 'zsdfgb'},
  ],
}
