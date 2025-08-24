import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const listBottom = style({
  padding: '5px',
})

export const addTaskForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
})

export const addTaskInput = style({
  fontSize: vars.fontSizes.medium,
  padding: '8px',
  border: `2px solid ${vars.colors.green}`,
  borderRadius: '4px',
  ':focus': {
    outline: 'none',
    borderColor: vars.colors.secondary,
  },
})

export const addTaskButton = style({
  backgroundColor: vars.colors.secondary,
  color: 'white',
  border: 'none',
  selectors: {
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
})
