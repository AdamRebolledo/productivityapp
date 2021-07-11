import { useState } from 'react'

import './header.css'
import logo from '../../../assets/img/logo.png'
import Button from '../buttons/buttons.component'

const Header = () => {
  const [headerCollapse, setHeaderCollapse] = useState(false)
  const showHeader = () => {
    setHeaderCollapse(!headerCollapse)
  }
  return (
    <nav className='flex items-center justify-between flex-wrap bg-alternative py-3 md:py-5 header-shadow header-fixed layout-padding w-full'>
      <div className='flex items-center flex-shrink-0 text-white ml-12'>
        <img className='h-12 w-12' src={logo} />
      </div>
      <div className='block lg:hidden pr-12'>
        <button
          type='button'
          onClick={showHeader}
          className='flex items-center px-3 py-2  rounded text-teal-200  text-grey hover:text-white'
        >
          <svg className='fill-current h-6 w-6' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path className='block h-12 w-12 text-blue-ribbon' d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
      </div>
      <div id='menu' className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${headerCollapse ? '' : 'hidden'} `}>
        {/* links togles */}
        <div className='text-sm lg:flex-grow md:text-center'></div>
        <div className='mr-12'>
          <Button variant='contained-primary'>Salir</Button>
        </div>
      </div>
    </nav>
  )
}

export default Header
