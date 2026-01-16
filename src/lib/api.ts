import type { AxiosResponse } from 'axios'

export function validateResponse<T>(response: AxiosResponse<T>): T {
  const contentType = response?.headers?.['content-type']
  if (contentType && typeof contentType === 'string' && contentType.includes('text/html')) {
    throw new Error('Terjadi kesalahan pada server. Silakan coba lagi.')
  }
  return response.data
}
