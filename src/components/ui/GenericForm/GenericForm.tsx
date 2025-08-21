import { Form, Formik } from 'formik'
import { type LoginFormType } from '../../../schemas/login.schema'
import FormInputField, { type FormInputFieldProps } from '../FormInputField/FormInputField'
import * as styles from './GenericForm.css'
import type { SingUpFormType } from '../../../schemas/singup.schema'
import type { ObjectSchema } from 'yup'
interface LoginFormProps<T extends LoginFormType | SingUpFormType> {
  getInitialValues: () => T
  schema: ObjectSchema<T>
  submitForm: (values: T) => void
  fields: FormInputFieldProps<T>[]
}
const GenericForm = <T extends LoginFormType | SingUpFormType>({
  getInitialValues,
  schema,
  submitForm,
  fields,
}: LoginFormProps<T>) => {
  return (
    <>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          submitForm(values)
          setSubmitting(false)
        }}
      >
        {() => (
          <Form className={styles.formGrid}>
            {fields.map((field, ind) => (
              <FormInputField key={ind} name={field.name} inputType={field.inputType} />
            ))}
            <button className={styles.submitButton} type="submit">
              submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GenericForm
