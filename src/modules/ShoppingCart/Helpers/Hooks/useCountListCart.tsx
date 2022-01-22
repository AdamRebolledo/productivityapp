import { useContext } from 'react'
import { ContexShoppingCart } from '../../Context/ContextShoppingCart/ContextShoppingCart'
import { TProduct } from '../../products'

const useCountListCart = () => {
  const ctx = useContext(ContexShoppingCart)
  const count = ctx?.products?.reduce((a: number, b: TProduct) => a + b.count, 0)
  const countListCart = count > 9 ? '9+' : count
  return [countListCart]
}

export default useCountListCart
