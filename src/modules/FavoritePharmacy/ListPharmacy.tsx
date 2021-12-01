import { useEffect, useState } from 'react'
import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'
import InfiniteScroll from 'react-infinite-scroller'
import { ILocale } from '../../models/locale'
import { useGetLocalesByRegions, useGetRegions, useSavePharmacyMutate } from '../../shared/request/useConexion'
import SelectComponent from '../../shared/components/select/SelectComponent'

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
    console.log(item)
    const jsonEmail = email && JSON.parse(email)
    const data = { locale_id: item.local_id, email: jsonEmail.email }
    saveMutate.mutate(data)
  }
  console.log(saveMutate)
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

  return (
    <div className='text-primary h-screen'>
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
      <br />
      Locales disponibles
      {selectedLocale?.map((i, index) => {
        return (
          <div key={index}>
            <p>{i.local_nombre}</p> {email !== null && <button onClick={() => savePharmacy(i)}>Guardar en favoritos</button>}
            {saveMutate.isSuccess && <p>{saveMutate?.data?.message}</p>}
            <div className='mapouter'>
              <div className='gmap_canvas'>
                <iframe
                  width='600'
                  height='500'
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
  )
}

export default ListPharmacy
