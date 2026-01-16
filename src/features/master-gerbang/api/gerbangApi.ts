import { axiosInstance } from '@/services/axios'
import { validateResponse } from '@/lib/api'
import type {
  MasterGerbang,
  MasterGerbangPayload,
  DeleteGerbangPayload,
  GerbangApiResponse,
} from '@/types/masterGerbang'

export async function fetchGerbangs(): Promise<MasterGerbang[]> {
  const response = await axiosInstance.get<GerbangApiResponse>('/gerbangs')
  const data = validateResponse(response)
  return data?.data?.rows?.rows ?? []
}

export async function createGerbangMutation(payload: MasterGerbangPayload): Promise<MasterGerbang> {
  const response = await axiosInstance.post('/gerbangs', payload)
  return validateResponse(response)
}

export async function updateGerbangMutation(payload: MasterGerbangPayload): Promise<MasterGerbang> {
  const response = await axiosInstance.put('/gerbangs', payload)
  return validateResponse(response)
}

export async function deleteGerbangMutation(payload: DeleteGerbangPayload): Promise<void> {
  const response = await axiosInstance.delete('/gerbangs', { data: payload })
  return validateResponse(response)
}
