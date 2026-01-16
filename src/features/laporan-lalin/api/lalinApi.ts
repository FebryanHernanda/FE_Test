import { axiosInstance } from '@/services/axios'
import { validateResponse } from '@/lib/api'
import type { LalinResponse } from '@/types/lalin'

export async function fetchLalins(): Promise<LalinResponse> {
  const response = await axiosInstance.get<LalinResponse>('/lalins')
  return validateResponse(response)
}
