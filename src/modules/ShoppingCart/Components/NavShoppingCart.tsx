import _ from 'lodash'
import { useContext, useState } from 'react'
import { ContexShoppingCart } from '../Context/ContextShoppingCart/ContextShoppingCart'
import useCountListCart from '../Helpers/Hooks/useCountListCart'
import { TProduct } from '../products'

const NavShoppingCart = () => {
  const [show, setShow] = useState<boolean>(false)
  const ctx = useContext(ContexShoppingCart)
  const [countListCart] = useCountListCart()

  return (
    <div>
      <div className='w-full text-right p-4'>
        <button onClick={() => setShow(!show)} className='bg-alternative p-4 rounded-2xl text-white '>
          Cart
        </button>
        <div className='bg-yellow py-1 px-2 rounded-full text-white inline relative top-6 -left-16'>{countListCart}</div>
      </div>
      {show && (
        <div className='shadow-lg w-64 p-4 absolute right-4 z-30 bg-white'>
          {_.orderBy(ctx.products, ['name'], ['asc']).map((i: TProduct) => {
            return (
              <>
                {i.count > 0 && (
                  <div className='grid grid-cols-12'>
                    <p className='col-span-4'>{i.name}</p>
                    <div className='col-span-4'>{i.count}</div>
                    <div className='col-span-4'>
                      <button
                        onClick={() => ctx.deleteProduct(i)}
                        className='bg-alternative py-0.5 px-2 rounded-full text-white inline'
                      >
                        x
                      </button>
                    </div>
                  </div>
                )}
              </>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default NavShoppingCart
