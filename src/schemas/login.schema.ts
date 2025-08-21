import { object, string, type InferType } from 'yup'
export const loginSchema = object({
  username: string()
    .required('username required')
    .min(5, 'username must be at least 5 characters long')
    .max(20, 'username contains maximum 20 characters long')
    .matches(/^[a-zA-Z0-9_]{5,20}$/, 'username can contains only latin, digits and _'),
  password: string()
    .required()
    .min(5, 'password must be at least 5 characters long')
    .max(30, 'password contains maximum 30 characters long'),
})

export type LoginFormType = InferType<typeof loginSchema>

export const defaultLoginFormValues = (): LoginFormType => {
  return {
    username: '',
    password: '',
  }
}
