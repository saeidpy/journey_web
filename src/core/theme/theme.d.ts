declare module '@mui/material/styles' {
  interface TypographyVariants {
    link: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    link?: React.CSSProperties
  }
}

declare module '@mui/material' {
  interface PaletteOptions {
    main: {
      primary0: string
      primary1: string
      primary2: string
      primary3: string
      primary4: string
      primary5: string
    }
    white: string
    black: string
    shades: {
      1: string
      2: string
      '2.5': string
      3: string
      4: string
      5: string
      6: string
      '6.5': string
      7: string
      8: string
      9: string
    }
    disabled: string
  }
  interface Palette {
    main: {
      primary0: string
      primary1: string
      primary2: string
      primary3: string
      primary4: string
      primary5: string
    }
    white: string
    black: string
    shades: {
      1: string
      2: string
      '2.5': string
      3: string
      4: string
      5: string
      6: string
      '6.5': string
      7: string
      8: string
      9: string
    }
    disabled: string
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
