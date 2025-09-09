import { ErrorMessage, Field } from 'formik'
import type { LoginFormType } from '../../../schemas/login.schema'
import * as styles from './FormInputField.css'
import type { SingUpFormType } from '../../../schemas/singup.schema'

export interface FormInputFieldProps<T extends LoginFormType | SingUpFormType> {
  name: Extract<keyof T, string>
  inputType?: string
}

function FormInputField<T extends LoginFormType | SingUpFormType>({ name, inputType }: FormInputFieldProps<T>) {
  return (
    <div className={styles.flexBlock}>
      <ErrorMessage name={name} component="div" className={styles.error} />
      <label className={styles.labelInput} htmlFor={name}>
        {name}
      </label>
      <Field className={styles.InputStyle} type={inputType ?? 'text'} name={name} />
    </div>
  )
}

export default FormInputField
