import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const container = style({
  marginTop: 0,
  marginRight: 'auto',
  marginLeft: 'auto',
  marginBottom: 0,
  maxWidth: '1080px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
})

export const error = style({
  color: vars.colors.error,
  fontSize: vars.fontSizes.small,
  textTransform: 'uppercase',
})
