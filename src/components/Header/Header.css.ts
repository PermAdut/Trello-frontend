import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#1e3a8a',
  borderBottom: `1px solid #dee2e6`,
})

export const headerLeft = style({
  flex: '0 0 auto',
})

export const headerTitle = style({
  fontSize: vars.fontSizes.large,
  fontWeight: 'bold',
  color: vars.colors.primary,
  margin: 0,
})

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
})

export const headerUsername = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
})

export const headerLogout = style({
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.secondary,
      color: 'white',
    },
  },
})
