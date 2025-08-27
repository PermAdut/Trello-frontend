import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const noContent = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  fontWeight: '500',
  maxWidth: '250px',
  whiteSpace: 'normal',
  marginLeft: '10px',
})

export const listContent = style({
  overflowY: 'auto',
  padding: '5px',
})
