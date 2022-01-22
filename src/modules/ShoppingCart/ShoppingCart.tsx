import { ShoppingCartProvider } from './Context/ContextShoppingCart/ContextShoppingCart'
import ListProducts from './Components/ListProducts'
import NavShoppingCart from './Components/NavShoppingCart'
import InvestmentCaulculator from './Components/InvestmentCaulculator'

const ShoppingCart = () => {
  return (
    <ShoppingCartProvider>
      <NavShoppingCart />
      <ListProducts />
      <InvestmentCaulculator />
    </ShoppingCartProvider>
  )
}

export default ShoppingCart
