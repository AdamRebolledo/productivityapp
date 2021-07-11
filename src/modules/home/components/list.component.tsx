import { useQuery } from 'react-query'
import { regions } from '../../../shared/mockups/regions'
const ListComponent = () => {
  // const { isLoading, error, data }: any = useQuery('repoData', () =>
  //   fetch('http://farmanet.minsal.cl/index.php/ws/getLocales').then((res) => res.json())
  // )

  const { isLoading, error, data }: any = useQuery('repoData', () =>
    fetch('https://farmanet.minsal.cl/index.php/ws/getLocalesTurnos').then((res) => res.json())
  )

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error...</div>

  console.log(data)

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

      <select>
        <option disabled>Selecciona una región</option>
        {regions.map((region: any) => (
          <option key={region?.id}>{region?.name}</option>
        ))}
      </select>
    </>
  )
}

export default ListComponent
