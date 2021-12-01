import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useChangePassConfirmMutate, useChangePassMutate, useLoginMutate } from '../../shared/request/useAuth'

const ChangePass = () => {
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const form = useForm()
  const formPassword = useForm()
  const email = form.watch('email')
  const password = formPassword.watch('password')
  const passwordConfirm = formPassword.watch('passwordConfirm')
  const changeMutate = useChangePassMutate()
  const confirmMutate = useChangePassConfirmMutate()
  const onSubmit = (data: { email: string }) => {
    setSaveEmail(data.email)
    changeMutate.mutate(data)
  }

  const confirmPass = () => {
    return password === passwordConfirm ? true : false
  }

  const onSubmitPassWord = (data: { password: string; passwordConfirm: string }) => {
    const dataAll = { ...data, email: saveEmail }
    confirmMutate.mutate(dataAll)
  }

  useEffect(() => {
    if (changeMutate.isSuccess && changeMutate?.data?.message === email) {
      setIsShowConfirmPass(true)
    }
  }, [changeMutate.isSuccess])

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          placeholder='Ingresa email'
          type='text'
          {...form.register('email', {
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email debe tener el formato xxxx@xxxx.xx',
            },
          })}
        />
        {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}

        <button type='submit'>enviar</button>
      </form>
      {changeMutate?.isSuccess && changeMutate?.data?.message !== email && changeMutate?.data?.message}
      {isShowConfirmPass && (
        <>
          <form onSubmit={formPassword.handleSubmit(onSubmitPassWord)}>
            <input
              placeholder='Ingresa contraseña'
              type='password'
              {...formPassword.register('password', { minLength: 8, maxLength: 99, required: true })}
            />
            {formPassword.formState.errors.password && <span>{formPassword.formState.errors.password.message}</span>}
            {formPassword.formState.errors.password && formPassword.formState.errors.password.type === 'minLength' && (
              <span>La contraseña debe tener al menos 8 caracteres</span>
            )}
            <input
              placeholder='Ingresa contraseña'
              type='password'
              {...formPassword.register('passwordConfirm', {
                validate: confirmPass,
                minLength: 8,
                maxLength: 99,
                required: true,
              })}
            />
            {formPassword.formState.errors.passwordConfirm && (
              <span>{formPassword.formState.errors.passwordConfirm.message}</span>
            )}
            {formPassword.formState.errors.passwordConfirm &&
              formPassword.formState.errors.passwordConfirm.type === 'minLength' && (
                <span>La contraseña debe tener al menos 8 caracteres</span>
              )}
            {formPassword.formState.errors.passwordConfirm &&
              formPassword.formState.errors.passwordConfirm.type === 'validate' && (
                <div className='error'>Las contraseñas deben coincidir</div>
              )}
            <button type='submit'>enviar</button>
          </form>
          {confirmMutate?.isSuccess && confirmMutate?.data?.message}
        </>
      )}
    </div>
  )
}

export default ChangePass
