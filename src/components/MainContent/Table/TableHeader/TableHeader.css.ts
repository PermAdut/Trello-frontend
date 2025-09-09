import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const tableHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 20px',
  backgroundColor: '#f8f9fa',
})

export const tableHeaderInput = style({
  fontSize: vars.fontSizes.large,
  fontWeight: 'bold',
  color: vars.colors.primary,
  border: `2px solid ${vars.colors.green}`,
  borderRadius: '4px',
  padding: '8px',
  width: '100%',
  maxWidth: '700px',
  backgroundColor: 'transparent',
  ':focus': {
    outline: 'none',
    borderColor: vars.colors.secondary,
  },
})

export const deleteButton = style({
  padding: '8px',
  fontSize: vars.fontSizes.medium,
  color: 'white',
  backgroundColor: vars.colors.error,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#b91c1c',
    },
  },
})
