import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../../routes/routes'

const Navbar = () => {
  const [show, setShow] = useState(true)
  const history = useHistory()
  const email = localStorage.getItem('email')
  const onClick = () => {
    console.log(show)
    setShow(!show)
  }
  const singOut = () => {
    localStorage.removeItem('email')
    history.push(routes.home)
  }

  return (
    <nav className='flex items-center justify-between flex-wrap bg-black text-white p-6'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <svg className='fill-current h-8 w-8 mr-2' width='54' height='54' viewBox='0 0 54 54' xmlns='http://www.w3.org/2000/svg'>
          <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
        </svg>
        <span className='font-semibold text-xl tracking-tight mr-12'>Pharmacy App</span>
      </div>
      <div className='block lg:hidden'>
        <button
          onClick={onClick}
          className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'
        >
          <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
      </div>
      <div className={'w-full flex-grow lg:flex lg:items-center lg:w-auto'}>
        <div className={show ? `block text-sm lg:flex-grow ` : `hidden text-sm lg:flex-grow `}>
          <Link to={routes.home} className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
            Inicio
          </Link>
          <Link to={routes.login} className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
            Ir al login
          </Link>
          <Link to={routes.register} className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4'>
            Ir al registro
          </Link>
          <Link to={routes.change_password} className='block mt-4 mr-4 lg:inline-block lg:mt-0 text-white hover:text-white'>
            Cambiar Contraseña
          </Link>
          <Link to={routes.list_pharmacy_user} className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white'>
            Ver mis Farmacias Favoritas
          </Link>
          <Link to={routes.favorite_pharmacy} className='block mt-4 md:ml-4 lg:inline-block lg:mt-0 text-white hover:text-white'>
            Administrar Farmacias
          </Link>
        </div>
        <div>
          {email !== null && (
            <a
              onClick={singOut}
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'
            >
              Cerrar Cuenta
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
