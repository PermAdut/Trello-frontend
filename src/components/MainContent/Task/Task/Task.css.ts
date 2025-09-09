import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const task = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '10px',
  backgroundColor: 'white',
  borderRadius: '4px',
  marginBottom: '10px',
  boxShadow: '0 1px 3px black',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  },
})

export const taskCheckbox = style({
  marginTop: '5px',
})

export const taskContent = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
})

export const taskTitle = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  fontWeight: '500',
  maxWidth: '250px',
  whiteSpace: 'normal',
})

export const taskDescription = style({
  fontSize: vars.fontSizes.small,
  color: '#6b7280',
  marginTop: '5px',
})
