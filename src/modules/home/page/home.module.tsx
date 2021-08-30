import { useEffect, useMemo, useState } from 'react'
import LoaderCompoenent from '../../../shared/components/loader/Loader'
import SelectComponent from '../../../shared/components/select/SelectComponent'
import { useGetLocalesByRegions, useGetLocales } from '../../../shared/request/useConexion'
import { regions, TSelect } from '../../../shared/utils/ChileanRegions'

const Home = () => {
  const [regionSelect, setRegionSelect] = useState<string>('')
  const locales = useGetLocales()
  const getLocalesRegion = useGetLocalesByRegions(regionSelect)
  console.log(getLocalesRegion?.data)
  if (locales.isLoading || getLocalesRegion.isLoading) return <LoaderCompoenent />

  return (
    <div className='text-primary'>
      <SelectComponent data={regions} select={(selected: any) => setRegionSelect(selected)} />
      {getLocalesRegion?.data.map((foo: any) => {
        return foo.comuna_nombre === 'RECOLETA' && <p>{foo.local_direccion}</p>
      })}
    </div>
  )
}

export default Home
