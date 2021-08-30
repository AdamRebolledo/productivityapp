import endpoints from './endpoints'
class APIClient {
  server: string
  endpoints = endpoints
  mode: any
  constructor(props: { SERVER: 'PROD' | 'STAGING' | 'DEV' | 'LOCAL' }) {
    this.server = getServerUrl(props.SERVER)
    this.endpoints = endpoints
    this.mode = props.SERVER
  }

  getLocales() {
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.list}`).then((res) => res.json())
  }
  getLocalesByRegion(id: string) {
    console.log(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.listByRegions}${id}`)
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.listByRegions}${id}`).then((res) => res.json())
  }
}
function getServerUrl(mode: 'DEV' | 'PROD' | 'STAGING' | 'LOCAL') {
  switch (mode) {
    case 'LOCAL':
      return 'http://731c34b28ff8.ngrok.io/'
    /*return 'http://localhost:8000/';*/
    case 'DEV':
      // console.log("DEV", process.env.REACT_APP_BACKEND_SERVER_URL);
      return process.env.REACT_APP_BACKEND_SERVER_URL!
    case 'PROD':
      return process.env.REACT_APP_BACKEND_SERVER_URL!
    default:
      return 'localhost:8000/'
  }
}
const prod_or_dev_server = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

const apiClient = new APIClient({ SERVER: prod_or_dev_server })
export { apiClient }

export default APIClient
