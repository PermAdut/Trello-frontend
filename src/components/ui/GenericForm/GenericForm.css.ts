import { style } from '@vanilla-extract/css'

export const submitButton = style({
  textTransform: 'uppercase',
  fontWeight: '600',
  minWidth: '30%',
  maxWidth: '50%',
  width: '100%',
  ':hover': {
    background: 'green',
  },
  border: '5px solid black',
})

export const formGrid = style({
  display: 'grid',
  justifyItems: 'center',
  border: '10px solid blue',
  padding: '20px',
  borderRadius: '10px',
})
