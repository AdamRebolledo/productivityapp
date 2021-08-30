import { useQuery } from 'react-query'
import { apiClient } from '../utils/apiClient'

export function useGetLocales() {
  return useQuery(['getLocales'], () => apiClient.getLocales())
}

export function useGetLocalesByRegions(id: string) {
  return useQuery(['useGetLocalesByRegions', id], () => apiClient.getLocalesByRegion(id))
}
