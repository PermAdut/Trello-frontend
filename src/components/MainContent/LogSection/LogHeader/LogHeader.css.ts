import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const logHeader = style({
  padding: '10px 20px',
  backgroundColor: '#f8f9fa',
  borderBottom: `1px solid #dee2e6`,
})

export const logHeaderTitle = style({
  fontSize: vars.fontSizes.large,
  fontWeight: 'bold',
  color: vars.colors.primary,
  margin: 0,
})
