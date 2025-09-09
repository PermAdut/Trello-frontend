import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const listHeader = style({
  padding: '5px',
})

export const listHeaderInput = style({
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  color: vars.colors.primary,
  border: `2px solid transparent`,
  borderRadius: '4px',
  padding: '5px',
  width: '80%',
  backgroundColor: 'transparent',
  ':focus': {
    outline: 'none',
    borderColor: vars.colors.green,
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
