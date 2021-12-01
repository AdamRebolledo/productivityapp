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
  getRegions() {
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.listRegions}`)
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        return res
      })
  }

  getCommunesbyRegion() {
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.listCommunesByRegion}`)
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        return res
      })
  }
  get() {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.listCommunesByRegion}`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ reg_id: 7 }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => console.log(res))
  }

  getRegion() {
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.listRegions}`)
      .then((res) => {
        return res.text()
      })
      .then((res) => {
        return res
      })
  }
  getLocales() {
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.list}`).then((res) => res.json())
  }
  getLocalesByRegion(id: string) {
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL!}${this.endpoints.listByRegions}${id}`).then((res) => res.json())
  }

  login(data: any) {
    return fetch(`http://localhost:5000/api/v1/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  register(data: any) {
    return fetch(`http://localhost:5000/api/v1/users/create`, {
      method: 'POST',
      body: data,
    }).then((res) => res.json())
  }

  changePass(data: any) {
    return fetch(`${process.env.REACT_APP_BACKEND_NODE_URL!}${this.endpoints.changePass}`, {
      method: 'POST',
      body: data,
    }).then((res) => res.json())
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
