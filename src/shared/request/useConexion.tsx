import { useMutation, useQuery } from 'react-query'
import { apiClient } from '../utils/apiClient'

export function useGetRegions() {
  return useQuery(['useGetRegions'], () => apiClient.getRegions())
}

export function useGetCommunesByRegion() {
  return useQuery(['useGetCommunesByRegion'], () => apiClient.getCommunesbyRegion())
}

export function useGetLocales() {
  return useQuery(['getLocales'], () => apiClient.getLocales())
}

export function useGetLocalesByRegions(id: string) {
  return useQuery(['useGetLocalesByRegions', id], () => apiClient.getLocalesByRegion(id))
}

export function useSavePharmacyMutate() {
  return useMutation('savePharmacy', apiClient.savePhamacy)
}

export function useFavoritePharmacyMutate() {
  return useMutation('favorite', apiClient.favoritePhamacy)
}

export function useDeleteFavoritePharmacyMutate() {
  return useMutation('deletefavorite', apiClient.deleteFavoritePhamacy)
}
