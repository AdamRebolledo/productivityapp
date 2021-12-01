import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { routes } from '../../routes/routes'
import ListPharmacy from './ListPharmacy'

const FavoritePharmacy = () => {
  const history = useHistory()
  const email = localStorage.getItem('email')

  useEffect(() => {
    email === null && history.push(routes.login)
  }, [])
  return (
    <div>
      <ListPharmacy />
    </div>
  )
}

export default FavoritePharmacy
