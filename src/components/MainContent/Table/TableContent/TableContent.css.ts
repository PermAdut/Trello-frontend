import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const tableContent = style({
  padding: '20px',
  backgroundColor: '#f4f5f7',
  minHeight: 'calc(100vh - 100px)',
})

export const listsContainer = style({
  display: 'flex',
  gap: '15px',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  minHeight: 'calc(100vh - 250px)',
})

export const addListButton = style({
  flex: '0 0 auto',
  padding: '8px 16px',
  fontSize: vars.fontSizes.medium,
  backgroundColor: vars.colors.secondary,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  minWidth: '200px',
  selectors: {
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  maxHeight: '50px',
})
