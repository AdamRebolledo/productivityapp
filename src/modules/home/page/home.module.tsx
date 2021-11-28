import { useEffect, useState } from 'react'
import LoaderCompoenent from '../../../shared/components/loader/Loader'
import SelectComponent from '../../../shared/components/select/SelectComponent'
import { useGetLocalesByRegions, useGetLocales, useGetRegions, useGetCommunesByRegion } from '../../../shared/request/useConexion'
import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import { ILocale } from '../../../models/locale'
import { useForm } from 'react-hook-form'
import InfiniteScroll from 'react-infinite-scroller'

const Home = () => {
  const [regionSelect, setRegionSelect] = useState<string>('')
  const [localeByComune, setLocaleByComune] = useState<{ text: string; value: [ILocale, ...ILocale[]] }[]>()
  const [selectedLocale, setSelectedLocale] = useState<ILocale[]>()
  const listRegions = useGetRegions()
  const listComunnesByRegion = useGetCommunesByRegion()
  const locales = useGetLocales()
  const getLocalesRegion = useGetLocalesByRegions(regionSelect)
  const form = useForm()
  const comune = form.watch('comune')
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
        {localeByComune?.map((i) => {
          return <option value={i.text}>{i.text}</option>
        })}
      </select>
      <br />
      Locales disponibles
      {selectedLocale?.map((i) => {
        return (
          <div>
            <p>{i.local_nombre}</p>
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

export default Home
