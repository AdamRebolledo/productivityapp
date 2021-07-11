import './buttons.css'

type props = {
  variant?: any
  size?: any
  className?: string
  children: any
  onClick?: any
}

const variantProp: any = {
  'contained-primary': 'btn-contained-primary',
  'contained-secondary': 'btn-contained-secondary',
  'outlined-primary': 'btn-outlined-primary',
  'rounded-full': 'rounded-full',
}

const sizeProp: any = {
  large: 'btn-large',
  medium: 'btn-medium',
  small: 'btn-small',
}

function Button({ children, variant, size = sizeProp.medium, className, onClick, ...rest }: props) {
  return (
    <button onClick={onClick} className={`button ${className} ${variantProp[variant]} ${sizeProp[size]}`} {...rest}>
      <p className='p14'>{children}</p>
    </button>
  )
}

export default Button
