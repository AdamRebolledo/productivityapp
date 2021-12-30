import { ShoppingCartProvider } from './Context/ContextShoppingCart/ContextShoppingCart'
import ListProducts from './Components/ListProducts'
import NavShoppingCart from './Components/NavShoppingCart'

const ShoppingCart = () => {
  return (
    <ShoppingCartProvider>
      <NavShoppingCart />
      <ListProducts />
    </ShoppingCartProvider>
  )
}

export default ShoppingCart
