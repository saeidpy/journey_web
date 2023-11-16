import {Theme} from 'src/core/theme'
export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const withMuiTheme = (Story) => (
  <Theme>
    <Story />
  </Theme>
)

export const decorators = [withMuiTheme]
