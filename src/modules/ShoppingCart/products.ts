export type TProduct = {
  id: string
  name: string
  price: number
  img: string
  count: number
}
export const productsList: TProduct[] = [
  { id: '1', name: 'vaso', price: 1000, img: 'url', count: 0 },
  { id: '2', name: 'tasa', price: 1000, img: 'url', count: 0 },
  { id: '3', name: 'jarro', price: 1000, img: 'url', count: 0 },
]
