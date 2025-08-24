import type { FormInputFieldProps } from '../../components/ui/FormInputField/FormInputField'
import GenericForm from '../../components/ui/GenericForm/GenericForm'
import { useAppDispatch } from '../../hooks/redux'
import * as styles from './SignUpPage.css'
import { registerUser } from '../../store/slices/authSlice'
import { defaultSingUpFormValues, singupSchema, type SingUpFormType } from '../../schemas/singup.schema'
import useGetAuth from '../../hooks/useGetAuth'
const SingUpPage = () => {
  const error = useGetAuth()
  const dispatch = useAppDispatch()
  const fields: FormInputFieldProps<SingUpFormType>[] = [
    { name: 'username' },
    { name: 'email' },
    { name: 'firstName' },
    { name: 'password', inputType: 'password' },
    { name: 'repeatedPassword', inputType: 'password' },
  ]
  const handleSingUp = (credentials: SingUpFormType) => {
    dispatch(registerUser(credentials))
  }

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
