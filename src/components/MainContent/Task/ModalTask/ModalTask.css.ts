import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
})

export const modal = style({
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '600px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
})

export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

export const modalTitleInput = style({
  fontSize: vars.fontSizes.large,
  fontWeight: 'bold',
  color: vars.colors.primary,
  border: `2px solid ${vars.colors.green}`,
  borderRadius: '4px',
  padding: '8px',
  flex: 1,
  ':focus': {
    outline: 'none',
    borderColor: vars.colors.secondary,
  },
})

export const closeButton = style({
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

export const modalBody = style({
  display: 'flex',
  flexDirection: 'column',
})

export const modalDescriptionInput = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  border: `2px solid ${vars.colors.green}`,
  borderRadius: '4px',
  padding: '8px',
  minHeight: '100px',
  resize: 'vertical',
  ':focus': {
    outline: 'none',
    borderColor: vars.colors.secondary,
  },
})

export const modalFooter = style({
  display: 'flex',
  gap: '10px',
  justifyContent: 'flex-end',
})

export const saveButton = style({
  backgroundColor: vars.colors.secondary,
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
})

export const deleteButton = style({
  backgroundColor: vars.colors.error,
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#b91c1c',
    },
  },
})
