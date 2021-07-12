import { useRef, useState } from 'react'
import { useQuery } from 'react-query'
const ListComponent = () => {
  const regionsInput = useRef<any>(0)
  const communeInput = useRef<any>(0)
  const [communes, setCommunes] = useState<any>(null)
  const [pharmacy, setPharmacy] = useState<any>(null)
  const [commune, setCommune] = useState<any>(null)
  const { isLoading, error, data }: any = useQuery('repoData', () =>
    fetch('https://apis.digital.gob.cl/dpa/regiones').then((res) => res.json())
  )

  //https://farmanet.minsal.cl/maps/index.php/ws/getLocalesUrgencia
  //populares
  //https://farmanet.minsal.cl/maps/index.php/ws/getLocalesMunicipal

  //https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=4

  // const { isLoading, error, data }: any = useQuery('repoData', () =>
  //   fetch('https://farmanet.minsal.cl/index.php/ws/getLocalesTurnos').then((res) => res.json())
  // )

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error...</div>

  const getCommune = async () => {
    const response = await fetch(`https://apis.digital.gob.cl/dpa/regiones/${regionsInput.current.value}/comunas`)
    const jsonCommunes = await response.json()
    setCommunes(jsonCommunes)
  }

  const setSelectedCommune = () => {
    const communeSelected = communes.filter((commune: any) => commune?.codigo === communeInput.current.value)
    setCommune(communeSelected)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    if (value === 'turn') {
      getPharmacy('https://farmanet.minsal.cl/index.php/ws/getLocalesTurnos')
    } else if (value === 'municipal') {
      getPharmacy('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesMunicipal')
    } else {
      getPharmacy('https://farmanet.minsal.cl/index.php/ws/getLocales')
    }
  }

  const getPharmacy = async (url: string) => {
    const response = await fetch(url)
    const jsonPharmacy = await response.json()
    const pharmacyFilter = jsonPharmacy.filter((pharmacy: any) => {
      let pharmacyCommuna = pharmacy?.comuna_nombre.toLowerCase().replace(/ /g, '').trim()
      let communeSelected = commune[0]?.nombre.toLowerCase().replace(/ /g, '').trim()
      return pharmacyCommuna === communeSelected
    })
    setPharmacy(pharmacyFilter)
  }

  return (
    <>
      {/* <div>
        {data.map((pharmacy: any) => (
          <p key={pharmacy.local_id}>{pharmacy.local_direccion}</p>
        ))}
      </div> */}
      <div>
        {/* {data.map((pharmacy: any) => (
          // <p key={pharmacy.local_id}>{pharmacy.localidad_nombre === 'LA CISTERNA' && `${pharmacy.local_direccion}`}</p>
          <p>{pharmacy}</p>
        ))} */}
      </div>

      <select ref={regionsInput} className='form-control' onChange={getCommune}>
        <option>Selecciona una región</option>
        {data.map((region: any) => (
          <option key={region?.codigo} value={region?.codigo}>
            {region?.nombre}
          </option>
        ))}
      </select>

      <select
        ref={communeInput}
        className='form-control'
        onChange={setSelectedCommune}
        disabled={communes === null ? true : false}
        defaultValue={'DEFAULT'}
      >
        <option value='DEFAULT' disabled={communes === null ? true : false}>
          Selecciona una comuna
        </option>
        {communes !== null &&
          communes.map((commune: any) => (
            <option value={commune?.codigo} key={commune?.codigo}>
              {commune?.nombre}
            </option>
          ))}
      </select>
      <label>
        <input type='radio' name='pharmacy' value='all' onChange={(e: any) => handleChange(e)} /> Todas las farmacias
      </label>
      <label>
        <input type='radio' name='pharmacy' value='turn' onChange={(e: any) => handleChange(e)} /> Farmacias de turno
      </label>
      <label>
        <input type='radio' name='pharmacy' value='municipal' onChange={(e: any) => handleChange(e)} /> Farmacias municipales
      </label>
      <div>{pharmacy !== null && pharmacy.map((pharmacy: any) => <p key={pharmacy.local_id}>{pharmacy.local_direccion}</p>)}</div>
    </>
  )
}

export default ListComponent
