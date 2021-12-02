import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { routes } from '../../routes/routes'
import Navbar from '../../shared/components/navbar/Navbar'
import ListPharmacy from './ListPharmacy'

const FavoritePharmacy = () => {
  const history = useHistory()
  const email = localStorage.getItem('email')
  const notify = () => {
    toast('Primero debes iniciar sesión!')
    history.push(routes.login)
  }
  useEffect(() => {
    email === null && notify()
  }, [])

  return (
    <div>
      <Navbar />
      <ListPharmacy />
    </div>
  )
}

export default FavoritePharmacy
