import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { ILocale } from '../../models/locale'
import { routes } from '../../routes/routes'
import Navbar from '../../shared/components/navbar/Navbar'

import { useDeleteFavoritePharmacyMutate, useFavoritePharmacyMutate } from '../../shared/request/useConexion'

const UserListFavoritePharmacy = () => {
  const history = useHistory()
  const [localesFavorite, setlocalesFavorite] = useState<ILocale[] | undefined>()
  const email = localStorage.getItem('email')
  const favorite = useFavoritePharmacyMutate()
  const deleteFavorite = useDeleteFavoritePharmacyMutate()
  const jsonEmail = email && JSON.parse(email)
  const sendEmail = { email: jsonEmail?.email }

  useEffect(() => {
    email === null && notify()

    email !== null && favorite.mutate(sendEmail)
  }, [])
  const notify = () => {
    toast('Primero debes iniciar sesión!')
    history.push(routes.login)
  }

  const deletePharmacy = (i: ILocale) => {
    const data = { locale_id: i.locale_id }
    deleteFavorite.mutate(data)
    toast('Has eliminado una farmacia favorita!')
  }
  useEffect(() => {
    if (deleteFavorite.isSuccess) {
      favorite.mutate(sendEmail)
    }
  }, [deleteFavorite.isSuccess])
  useEffect(() => {
    if (favorite.isSuccess) {
      setlocalesFavorite(favorite?.data)
    }
  }, [favorite.isSuccess])

  return (
    <>
      <Navbar />
      <div className='container mx-auto my-16'>
        <div className='grid grid-cols-12 gap-4'>
          {favorite.isSuccess &&
            localesFavorite?.map((i: ILocale, index: number) => {
              return (
                <div className='col-span-4 border border-black p-4 rounded-1xl grid grid-cols-12' key={index}>
                  <div className='col-span-12 grid grid-cols-12 pr-2'>
                    <div className='col-span-10 pb-4'>
                      <p>Nombre del local: {i.local_nombre}</p>
                      <p>Comuna: {i.comuna_nombre}</p>
                      <p>Localidad: {i.localidad_nombre}</p>
                      <p>Dirección: {i.local_direccion}</p>
                      <p>
                        Horario: {i.funcionamiento_dia} {i.funcionamiento_hora_apertura} - {i.funcionamiento_hora_cierre}
                      </p>
                    </div>
                    <div className='col-span-2'>
                      {email !== null && (
                        <button className='button_app' onClick={() => deletePharmacy(i)}>
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                  <div className='col-span-12 mapouter'>
                    <div className='gmap_canvas'>
                      <iframe
                        width='100%'
                        height='120'
                        id='gmap_canvas'
                        src={`https://maps.google.com/maps?q=${i.local_direccion.replaceAll(
                          ' ',
                          '%20'
                        )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        scrolling='no'
                      ></iframe>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default UserListFavoritePharmacy
