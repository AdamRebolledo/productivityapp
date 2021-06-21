import './menu_mobile.css'

const MenuMobile = () => {
  const recomended = () => {
    console.log('recomended')
  }
  const minPrice = () => {
    console.log('minPrice')
  }
  const maxPrice = () => {
    console.log('maxPrice')
  }
  const publish = () => {
    console.log('publish')
  }
  return (
    <div className='fixed bottom-menu bg-white h-14 block md:hidden p-2 grid grid-cols-4 w-full'>
      <div className='text-center cursor-pointer h-12'>
        <p className='p14'>Mapa</p>
      </div>
      <div className='text-center cursor-pointer h-12'>
        <p className='p14'>Buscar</p>
      </div>
      <div className='text-center cursor-pointer h-12'>
        <p className='p14'>Ordenar</p>
      </div>

      <div className='text-center cursor-pointer h-12'>
        <p className='p14'>Filtrar</p>
      </div>
    </div>
  )
}

export default MenuMobile
