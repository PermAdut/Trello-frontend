import { useNavigate } from 'react-router'
import type { FormInputFieldProps } from '../../components/ui/FormInputField/FormInputField'
import GenericForm from '../../components/ui/GenericForm/GenericForm'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import * as styles from './SignUpPage.css'
import { registerUser, authActions } from '../../store/slices/authSlice'
import { useEffect } from 'react'
import { defaultSingUpFormValues, singupSchema, type SingUpFormType } from '../../schemas/singup.schema'
const SingUpPage = () => {
  const fields: FormInputFieldProps<SingUpFormType>[] = [
    { name: 'username' },
    { name: 'email' },
    { name: 'firstName' },
    { name: 'password', inputType: 'password' },
    { name: 'repeatedPassword', inputType: 'password' },
  ]
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useAppSelector((state) => state.auth)

  const handleSingUp = (credentials: SingUpFormType) => {
    dispatch(registerUser(credentials))
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  useEffect(() => {
    dispatch(authActions.сlearErrors())
    return () => {
      dispatch(authActions.сlearErrors())
    }
  }, [dispatch])

  return (
    <div className={styles.container}>
      <h1>SignUp page</h1>
      <GenericForm
        getInitialValues={defaultSingUpFormValues}
        schema={singupSchema}
        submitForm={handleSingUp}
        fields={fields}
      />
      {error && <div className={styles.error}>Error: {error}</div>}
    </div>
  )
}
export default SingUpPage
