import { useContext } from 'react'
import { ContexShoppingCart } from '../Context/ContextShoppingCart/ContextShoppingCart'
import { productsList, TProduct } from '../products'
import ButtonShopping from './ButtonShopping'
import ProductCard from './ProductCard'

const ListProducts = () => {
  const ctx = useContext(ContexShoppingCart)
  return (
    <div className='container mx-auto pt-5'>
      <div className=' grid grid-cols-12 gap-4'>
        {productsList.map((i: TProduct) => {
          return (
            <div className='col-span-4'>
              <ProductCard>
                <p>{i.name}</p>
                <ButtonShopping onClick={() => ctx.addProduct(i)}>add product</ButtonShopping>
              </ProductCard>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListProducts
