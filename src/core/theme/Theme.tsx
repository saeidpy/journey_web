import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react'
import {Box, createTheme, CssBaseline, Direction, PaletteOptions, responsiveFontSizes, ThemeOptions, ThemeProvider} from '@mui/material'
import {faIR} from '@mui/material/locale'
import {PropsWithChildren} from 'react'
import rtlPlugin from 'stylis-plugin-rtl'

import 'vazirmatn/misc/UI-Farsi-Digits/Vazirmatn-UI-FD-font-face.css'

import 'vazirmatn/misc/UI/Vazirmatn-UI-font-face.css'

interface OwnProps {
  direction?: Direction
}

createTheme({
  typography: {},
})

const getFontFamily = (dir: Direction) =>
  dir === 'ltr'
    ? '"Vazirmatn UI", "Roboto", "Tahoma", "Helvetica", "Arial", sans-serif'
    : '"Vazirmatn UI FD", "Roboto", "Tahoma", "Helvetica", "Arial", sans-serif'

export type ThemeProps = PropsWithChildren<OwnProps>

export function Theme({direction = 'rtl', children}: ThemeProps) {
  const palette: PaletteOptions = {
    primary: {
      dark: '#263238',
      main: '#00897b',
      light: '#eceff1',
    },
    secondary: {
      main: '#4db8ac',
      light: '#e8e8e8',
    },
    error: {
      main: '#B2001A',
    },
    warning: {
      main: '#FC8E0D',
    },
    success: {
      main: '#006B2B',
      light: '#39AE00',
    },
    info: {
      main: '#09DDE3',
    },
    disabled: '#D7D7D7',
    background: {default: '#FEFEFE'},
    white: '#FFFFFF',
    black: '#000000',
    main: {
      primary0: '#CCE2E2',
      primary1: '#99C4C5',
      primary2: '#66A7A9',
      primary3: '#006C6F',
      primary4: '#004143',
      primary5: '#004143',
    },
    shades: {
      1: '#FEFEFE',
      2: '#FAFAFA',
      '2.5': '#F2F2F2',
      3: '#DCDCDC',
      4: '#C7C7C7',
      5: '#A9A9A9',
      6: '#8C8C8C',
      '6.5': '#717171',
      7: '#515151',
      8: '#333333',
      9: '#141414',
    },
  }

  const fontFamily = getFontFamily(direction)

  const typography: ThemeOptions['typography'] = {
    fontFamily,
    h1: {fontSize: '20px', fontWeight: 600},
    h2: {fontSize: '16px', fontWeight: 500, lineHeight: '25px'},
    h3: {fontSize: '14px', fontWeight: 500, lineHeight: '21.88px'},
    body1: {fontSize: '16px', fontWeight: 300, lineHeight: '25px'},
    caption: {fontSize: '14px', fontWeight: 300, lineHeight: '21.88px'},
    subtitle1: {fontSize: '12px', fontWeight: 300, lineHeight: '18.75px'},
    button: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '25px',
      fontFamily,
      '.MuiButton-iconSizeSmall': {
        '& > *:nth-of-type(1)': {
          fontSize: 10,
          width: 10,
          height: 10,
        },
      },
      '.MuiButton-iconSizeMedium': {
        '& > *:nth-of-type(1)': {
          fontSize: 16,
          width: 16,
          height: 16,
        },
      },
      '.MuiButton-iconSizeLarge': {
        '& > *:nth-of-type(1)': {
          fontSize: 24,
          width: 24,
          height: 24,
        },
      },
    },
    link: {fontSize: '14px', fontWeight: 400, lineHeight: '21.88px', color: palette.main.primary3},
  }

  const theme = createTheme(
    {
      direction,
      palette,
      typography,
      spacing: 8,
      components: {
        MuiInputBase: {
          styleOverrides: {
            input: {
              ...typography.caption,
              color: palette.shades[8],

              '::placeholder': {
                ...typography.caption,
                color: palette.shades[5],
              },
            },
          },
        },
      },
    },
    faIR
  )

  const cache = createCache({
    key: 'mui-rtl',
    stylisPlugins: [rtlPlugin],
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <Box dir={direction} sx={{height: '100%'}}>
          {children}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  )
}
