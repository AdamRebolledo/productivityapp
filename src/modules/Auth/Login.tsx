import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { routes } from '../../routes/routes'
import Navbar from '../../shared/components/navbar/Navbar'
import { useLoginMutate } from '../../shared/request/useAuth'

const Login = () => {
  const history = useHistory()
  const form = useForm()
  const email = form.watch('email')
  const loginMutate = useLoginMutate()
  const onSubmit = (data: { email: string; password: string }) => {
    loginMutate.mutate(data)
  }
  useEffect(() => {
    if (loginMutate.isSuccess && loginMutate?.data?.message === email) {
      localStorage.setItem('email', JSON.stringify({ email: email }))
      history.push(routes.favorite_pharmacy)
    }
    if (loginMutate?.isSuccess && loginMutate?.data?.message !== email) {
      toast(loginMutate?.data?.message)
    }
  }, [loginMutate.isSuccess])
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
              <span>Contraseña debe der mayor a 8 caracteres</span>
            )}
            <button type='submit'>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
function AuthContext(AuthContext: any): { userProfile: any; setUserProfile: any } {
  throw new Error('Function not implemented.')
}
