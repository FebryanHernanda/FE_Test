import { axiosInstance } from '@/services/axios'
import { validateResponse } from '@/lib/api'
import type { LalinResponse } from '@/types/lalin'
import type { MasterGerbang, GerbangApiResponse } from '@/types/masterGerbang'

export async function fetchDashboardLalins(): Promise<LalinResponse> {
  const response = await axiosInstance.get<LalinResponse>('/lalins')
  return validateResponse(response)
}

export async function fetchDashboardGerbangs(): Promise<MasterGerbang[]> {
  const response = await axiosInstance.get<GerbangApiResponse>('/gerbangs')
  const data = validateResponse(response)
  return data?.data?.rows?.rows ?? []
}
