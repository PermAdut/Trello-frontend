import { createTheme, globalStyle } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  colors: {
    primary: 'black',
    secondary: 'blue',
    error: 'red',
  },
  fontSizes: {
    small: '0.7rem',
    medium: '1rem',
    large: '1.5rem',
  },
})

globalStyle('body', {
  margin: 0,
  width: '100%',
  maxWidth: '100%',
})

globalStyle('a', {
  textDecoration: 'none',
})

globalStyle('button', {
  color: vars.colors.primary,
  textTransform: 'capitalize',
  borderRadius: '8px',
  background: 'white',
  paddingTop: '12px',
  paddingBottom: '12px',
  paddingLeft: '24px',
  paddingRight: '24px',
})
