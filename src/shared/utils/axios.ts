import origAxios, {AxiosInstance} from 'axios'
import {servers} from 'src/shared/constants'

export const simpleAxios = origAxios.create({
  baseURL: servers.apiUrl,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
})

export let axiosWithAuth: AxiosInstance = simpleAxios
// axiosWithAuth.defaults.headers.common['Content-Type'] = 'application/json'
// axiosWithAuth.defaults.headers.post['Content-Type'] = 'application/json'

export const setAxiosWithAuth = (instance: AxiosInstance) => {
  axiosWithAuth = instance
}
