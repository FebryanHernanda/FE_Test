import { axiosInstance } from '@/services/axios'
import { setToken, clearToken } from '@/lib/storage'
import { validateResponse } from '@/lib/api'
import type { LoginPayload, LoginResponse } from '@/types/auth'

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axiosInstance.post<LoginResponse>('/auth/login', payload)
  const data = validateResponse(response)
  setToken(data.token)
  return data
}

export function logout(): void {
  clearToken()
}
