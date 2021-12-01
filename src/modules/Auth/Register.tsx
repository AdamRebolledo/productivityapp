import { useForm } from 'react-hook-form'
import { useLoginMutate, useRegisterMutate } from '../../shared/request/useAuth'

const Register = () => {
  const form = useForm()
  const loginMutate = useRegisterMutate()
  const onSubmit = (data: { email: string; password: string }) => {
    loginMutate.mutate(data)
  }
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
              message: 'invalid email address',
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
          <span>minLength length exceeded</span>
        )}
        <button type='submit'>enviar</button>
      </form>
      {loginMutate?.isSuccess && loginMutate?.data?.message}
    </div>
  )
}

export default Register
