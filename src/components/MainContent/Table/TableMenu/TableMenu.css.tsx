import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const tableMenu = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 20px',
  backgroundColor: '#f8f9fa',
  borderTop: `1px solid #dee2e6`,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  overflowX: 'auto',
  whiteSpace: 'nowrap',
})

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
})

export const tableItemSelected = style({
  borderColor: vars.colors.green,
})

export const addTableButton = style({
  padding: '8px 16px',
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  backgroundColor: vars.colors.secondary,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
})
