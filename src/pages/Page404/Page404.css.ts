import { style } from '@vanilla-extract/css'

export const centerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  height: '90vh',
})

export const heading = style({
  color: 'red',
})

export const button = style({
  height: '50px',
  width: '200px',
  textAlign: 'center',
  fontSize: '1rem',
  background: 'white',
  transition: 'all 0.2s ease',
  ':hover': {
    background: 'green',
  },
})
