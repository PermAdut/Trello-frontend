import { Link } from 'react-router'
import type { FormInputFieldProps } from '../../components/ui/FormInputField/FormInputField'
import GenericForm from '../../components/ui/GenericForm/GenericForm'
import { defaultLoginFormValues, loginSchema, type LoginFormType } from '../../schemas/login.schema'
import * as styles from './LoginPage.css'
import useGetAuth from '../../hooks/useGetAuth'
import { useAppDispatch } from '../../hooks/redux'
import { loginUser } from '../../store/slices/authSlice'
const LoginPage = () => {
  const error = useGetAuth()
  const fields: FormInputFieldProps<LoginFormType>[] = [
    { name: 'username' },
    { name: 'password', inputType: 'password' },
  ]
  const dispatch = useAppDispatch()
  const handleLogin = (credentials: LoginFormType) => {
    dispatch(loginUser(credentials))
  }

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
