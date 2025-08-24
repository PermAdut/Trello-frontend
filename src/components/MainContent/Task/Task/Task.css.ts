import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const task = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '10px',
  backgroundColor: 'white',
  borderRadius: '4px',
  marginBottom: '5px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
})

export const taskCheckbox = style({
  marginTop: '5px',
})

export const taskContent = style({
  flex: 1,
})

export const taskTitle = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  fontWeight: '500',
})

export const taskDescription = style({
  fontSize: vars.fontSizes.small,
  color: '#6b7280',
})
