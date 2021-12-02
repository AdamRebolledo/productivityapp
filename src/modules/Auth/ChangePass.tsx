import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Navbar from '../../shared/components/navbar/Navbar'
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
    if (changeMutate?.isSuccess && changeMutate?.data?.message !== email) {
      toast(confirmMutate?.data?.message)
    }
  }, [changeMutate.isSuccess])
  useEffect(() => {
    if (confirmMutate?.isSuccess) {
      toast(confirmMutate?.data?.message)
    }
  }, [confirmMutate?.isSuccess])

  return (
    <div>
      <Navbar />
      <div className='container grid grid-cols-12 px-4'>
        <div className='md:col-span-6 md:col-start-4 col-start-0 col-span-12 mx-auto rounded-2xl my-16 border border-black md:px-16 px-8 pt-12 pb-16'>
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

            <button type='submit'>Confirmar email</button>
          </form>
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
                <button type='submit'>Cambiar contraseña</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChangePass
