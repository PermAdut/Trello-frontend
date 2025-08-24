import { style } from '@vanilla-extract/css'
import { vars } from '../../../../styles/theme.css'

export const logMenu = style({
  padding: '10px',
  overflowY: 'auto',
  height: 'calc(100vh - 150px)',
  backgroundColor: '#f4f5f7',
})

export const logItem = style({
  padding: '8px 16px',
  borderBottom: `1px solid #dee2e6`,
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
})

export const logAction = style({
  fontSize: vars.fontSizes.medium,
  color: vars.colors.primary,
  fontWeight: '500',
})

export const logTimestamp = style({
  fontSize: vars.fontSizes.small,
  color: '#6b7280',
})

export const noLogs = style({
  fontSize: vars.fontSizes.medium,
  color: '#6b7280',
  textAlign: 'center',
  padding: '20px',
})
