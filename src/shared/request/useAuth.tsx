import { useMutation, useQuery } from 'react-query'
import { apiClient } from '../utils/apiClient'

export function useLoginMutate() {
  return useMutation('loginMutation', apiClient.login)
}

export function useRegisterMutate() {
  console.log('ncdnslnlcd')
  return useMutation('registerMutation', apiClient.register)
}

export function useChangePassMutate() {
  return useMutation('changePassMutation', apiClient.changePass)
}
