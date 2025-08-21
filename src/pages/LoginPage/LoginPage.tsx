import { Link, useNavigate } from 'react-router'
import type { FormInputFieldProps } from '../../components/ui/FormInputField/FormInputField'
import GenericForm from '../../components/ui/GenericForm/GenericForm'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { defaultLoginFormValues, loginSchema, type LoginFormType } from '../../schemas/login.schema'
import * as styles from './LoginPage.css'
import { authActions, loginUser } from '../../store/slices/authSlice'
import { useEffect } from 'react'
const LoginPage = () => {
  const fields: FormInputFieldProps<LoginFormType>[] = [
    { name: 'username' },
    { name: 'password', inputType: 'password' },
  ]
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useAppSelector((state) => state.auth)

  const handleLogin = (credentials: LoginFormType) => {
    dispatch(loginUser(credentials))
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
      <h1>Login page</h1>
      <GenericForm
        getInitialValues={defaultLoginFormValues}
        schema={loginSchema}
        submitForm={handleLogin}
        fields={fields}
      />
      <h4>
        Not registered? <Link to={'/signup'}>sign up</Link>
      </h4>
      {error && <div className={styles.error}>Error: {error}</div>}
    </div>
  )
}
export default LoginPage
