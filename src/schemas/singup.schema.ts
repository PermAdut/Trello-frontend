import { object, ref, string, type InferType } from 'yup'

export const singupSchema = object({
  username: string()
    .required('username required')
    .min(5, 'username must be at least 5 characters long')
    .max(20, 'username contains maximum 20 characters long')
    .matches(/^[a-zA-Z0-9_]{5,20}$/, 'username can contains only latin letters, digits and _'),
  email: string()
    .required('email is required')
    .email('Invalid email')
    .min(10, 'username must be at least 10 characters long')
    .max(30, 'username contains maximum 30 characters long'),
  firstName: string()
    .required('firstname required')
    .min(2, 'firstname must be at least 2 characters long')
    .max(20, 'firstname contains maximum 20 characters long')
    .matches(/^[a-zA-Z]{2,20}$/, 'firstname can contains only latin letters'),
  password: string()
    .required()
    .min(5, 'password must be at least 5 characters long')
    .max(30, 'password contains maximum 30 characters long'),
  repeatedPassword: string()
    .required()
    .min(5, 'password must be at least 5 characters long')
    .max(30, 'password contains maximum 30 characters long')
    .oneOf([ref('password')], 'Passwords must match'),
})

export type SingUpFormType = InferType<typeof singupSchema>

export const defaultSingUpFormValues = (): SingUpFormType => {
  return {
    username: '',
    firstName: '',
    email: '',
    repeatedPassword: '',
    password: '',
  }
}
