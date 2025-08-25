import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const list = style({
  flex: '0 0 250px',
  backgroundColor: vars.colors.listBg,
  borderRadius: '8px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxHeight: 'calc(100vh - 250px)',
})

export const noContent = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  fontWeight: '500',
  maxWidth: '250px',
  whiteSpace: 'normal',
  marginLeft: '10px',
})
