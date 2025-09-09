import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const tableItem = style({
  padding: '8px 16px',
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  border: '2px solid transparent',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: 'white',
  selectors: {
    '&:hover': {
      backgroundColor: '#e5e7eb',
    },
  },
  minWidth: '100px',
  maxWidth: '100px',
  overflow: 'hidden',
})

export const tableItemSelected = style({
  borderColor: vars.colors.green,
})
