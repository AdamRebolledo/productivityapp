import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Navbar from '../../shared/components/navbar/Navbar'
import { useLoginMutate, useRegisterMutate } from '../../shared/request/useAuth'

const Register = () => {
  const form = useForm()
  const loginMutate = useRegisterMutate()
  const onSubmit = (data: { email: string; password: string }) => {
    loginMutate.mutate(data)
  }
  useEffect(() => {
    if (loginMutate?.isSuccess) {
      toast(loginMutate?.data?.message)
    }
  }, [loginMutate?.isSuccess])

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
                required: 'Campo requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Formato de email invalido',
                },
              })}
            />
            {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}
            <input
              placeholder='Ingresa contraseña'
              type='password'
              {...form.register('password', { minLength: 8, maxLength: 99, required: true })}
            />
            {form.formState.errors.password && <span>{form.formState.errors.password.message}</span>}
            {form.formState.errors.password && form.formState.errors.password.type === 'minLength' && (
              <span>Lacontraseña debe tener al menos 8 caracteres</span>
            )}
            <button type='submit'>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
