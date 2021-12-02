import { useEffect, useState } from 'react'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { ILocale } from '../../models/locale'
import { useGetLocalesByRegions, useGetRegions, useSavePharmacyMutate } from '../../shared/request/useConexion'
import SelectComponent from '../../shared/components/select/SelectComponent'
import { toast } from 'react-toastify'

const ListPharmacy = () => {
  const email = localStorage.getItem('email')
  const [regionSelect, setRegionSelect] = useState<string>('')
  const [localeByComune, setLocaleByComune] = useState<{ text: string; value: [ILocale, ...ILocale[]] }[]>()
  const [selectedLocale, setSelectedLocale] = useState<ILocale[]>()
  const listRegions = useGetRegions()
  const getLocalesRegion = useGetLocalesByRegions(regionSelect)
  const saveMutate = useSavePharmacyMutate()
  const form = useForm()
  const comune = form.watch('comune')

  const savePharmacy = (item: ILocale) => {
    const jsonEmail = email && JSON.parse(email)
    const data = {
      comuna_nombre: item.comuna_nombre,
      fecha: item.fecha,
      fk_comuna: item.fk_comuna,
      fk_region: item.fk_region,
      funcionamiento_dia: item.funcionamiento_dia,
      funcionamiento_hora_apertura: item.funcionamiento_hora_apertura,
      funcionamiento_hora_cierre: item.funcionamiento_hora_cierre,
      local_direccion: item.local_direccion,
      locale_id: item.local_id,
      local_lat: item.local_lat,
      local_lng: item.local_lng,
      local_nombre: item.local_nombre,
      local_telefono: item.local_telefono,
      localidad_nombre: item.localidad_nombre,
      email: jsonEmail.email,
    }
    saveMutate.mutate(data)
  }

  useEffect(() => {
    if (getLocalesRegion.isSuccess) {
      const group = _.chain(getLocalesRegion.data)
        .groupBy('comuna_nombre')
        .map((value, key) => ({ key: key, value: value, flag: key, text: key }))
        .value()
      setLocaleByComune(group)
    }
  }, [getLocalesRegion.isSuccess])
  useEffect(() => {
    if (comune) {
      const locales = localeByComune?.find((i) => i.text === comune)
      setSelectedLocale(locales?.value)
    }
  }, [comune])

  useEffect(() => {
    if (saveMutate.isSuccess) {
      toast(saveMutate?.data?.message)
    }
  }, [saveMutate.isSuccess])

  return (
    <>
      <div className='container grid grid-cols-12 px-4'>
        <div className='md:col-span-6 md:col-start-4 col-start-0 col-span-12 mx-auto rounded-2xl my-16 border border-black md:px-16 px-8 pt-12 pb-16'>
          {listRegions.data && <SelectComponent data={listRegions.data} select={(selected: any) => setRegionSelect(selected)} />}
          <select {...form.register('comune')}>
            <option>Selecciona una comuna</option>
            {localeByComune?.map((i, index) => {
              return (
                <option key={index} value={i.text}>
                  {i.text}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-12 mx-auto'>
          <div className='col-span-12'>
            {selectedLocale && <h3>Resultados de farmacias</h3>}
            <div className='grid grid-cols-12 gap-8'>
              {selectedLocale?.map((i, index) => {
                return (
                  <div className='col-span-4 border border-black p-4 rounded-1xl grid grid-cols-12' key={index}>
                    <div className='col-span-12 grid grid-cols-12 pb-4 pr-2'>
                      <div className='col-span-10'>
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
                          <button className='button_app ' onClick={() => savePharmacy(i)}>
                            Guardar
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
        </div>
      </div>
    </>
  )
}

export default ListPharmacy
