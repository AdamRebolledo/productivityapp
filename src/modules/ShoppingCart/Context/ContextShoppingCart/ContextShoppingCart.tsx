import _ from 'lodash'
import { createContext, useContext, ReactElement, JSXElementConstructor, FC, useState, useEffect } from 'react'
import { productsList, TProduct } from '../../products'

type ContextState = {
  products: TProduct[]
  addProduct: (product: TProduct) => void
  deleteProduct: (product: TProduct) => void
}

export const ContexShoppingCart = createContext<ContextState | any>({})

export const ShoppingCartProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<TProduct[]>(productsList)
  const addProduct = (product: TProduct) => {
    const find = products.find((i) => i.id === product.id)
    const add = find && { ...find, count: find.count + 1 }
    const filter = products.filter((i) => i.id !== product.id)
    add && setProducts([...filter, add])
  }
  const deleteProduct = (product: TProduct) => {
    const find = products.find((i) => i.id === product.id)
    const remove = find && { ...find, count: find.count > 0 ? find.count - 1 : 0 }
    const filter = products.filter((i) => i.id !== product.id)
    remove && setProducts([...filter, remove])
  }
  return <ContexShoppingCart.Provider value={{ products, addProduct, deleteProduct }}>{children}</ContexShoppingCart.Provider>
}
