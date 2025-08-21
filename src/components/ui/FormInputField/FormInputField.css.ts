import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/theme.css'
export const error = style({
  color: vars.colors.error,
  fontSize: vars.fontSizes.small,
  textTransform: 'uppercase',
  width: '100%',
  maxWidth: '500px',
  minWidth: '300px',
  boxSizing: 'border-box',
})

export const flexBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  marginBottom: '15px',
  width: '100%',
  maxWidth: '500px',
})

export const labelInput = style({
  textTransform: 'capitalize',
  fontSize: vars.fontSizes.large,
})

export const InputStyle = style({
  width: '100%',
  maxWidth: '500px',
  minWidth: '350px',
  borderRadius: '4px',
  height: '40px',
  border: `5px solid black`,
  fontSize: vars.fontSizes.medium,
})
