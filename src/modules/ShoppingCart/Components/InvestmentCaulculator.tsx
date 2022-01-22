import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const InvestmentCaulculator = () => {
  const [balance, setBalance] = useState<number>()
  const schema = Yup.object().shape({
    deposit: Yup.number().required('Obligatorio').typeError('El campo es numerico'),
    contribution: Yup.number().required('Obligatorio').typeError('El campo es numerico'),
    years: Yup.number().required('Obligatorio').typeError('El campo es numerico'),
    rate: Yup.number()
      .min(0, 'el minimo es 0')
      .max(1, 'el valor maximo es 1')
      .required('Obligatorio')
      .typeError('El campo es numerico'),
  })
  const compountInterest = (values: { [key: string]: string }) => {
    let total = Number(values.deposit)
    for (let i = 0; i < Number(values.years); i++) {
      total = total + Number(values.contribution) * (Number(values.rate) + 1)
    }
    setBalance(Math.round(total))
  }
  const initialValues = {
    deposit: '',
    contribution: '',
    years: '',
    rate: '',
  }
  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          compountInterest(values)
          actions.resetForm({ values: initialValues })
        }}
        validationSchema={schema}
      >
        {() => (
          <Form>
            <Field name='deposit' />
            <ErrorMessage name='deposit' />
            <Field name='contribution' />
            <ErrorMessage name='contribution' />
            <Field name='years' />
            <ErrorMessage name='years' />
            <Field name='rate' />
            <ErrorMessage name='rate' />
            <br />
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>

      {balance && <p>{balance}</p>}
    </div>
  )
}

export default InvestmentCaulculator
