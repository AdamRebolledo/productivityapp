import { useState } from 'react'
import LoaderCompoenent from '../../../shared/components/loader/Loader'
import SelectComponent from '../../../shared/components/select/SelectComponent'
import { useGetLocalesByRegions, useGetLocales, useGetRegions, useGetCommunesByRegion } from '../../../shared/request/useConexion'

const Home = () => {
  const [regionSelect, setRegionSelect] = useState<string>('')
  const listRegions = useGetRegions()
  const listComunnesByRegion = useGetCommunesByRegion()
  console.log(listComunnesByRegion)
  const locales = useGetLocales()
  const getLocalesRegion = useGetLocalesByRegions(regionSelect)

  if (locales.isLoading || getLocalesRegion.isLoading) return <LoaderCompoenent />
  return (
    <div className='text-primary'>
      {listRegions.data && <SelectComponent data={listRegions.data} select={(selected: any) => setRegionSelect(selected)} />}
    </div>
  )
}

export default Home
