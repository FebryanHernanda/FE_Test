import { isAxiosError } from 'axios'

export function formatErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return 'Gagal terhubung ke server. Periksa koneksi Anda.'
    }

    const data = error.response.data

    if (
      typeof data === 'string' &&
      (data.includes('<!DOCTYPE') || data.includes('<html') || data.includes('<body>'))
    ) {
      return 'Terjadi kesalahan pada server. Silakan coba lagi.'
    }

    const backendMessage = (data as { message?: string })?.message
    if (backendMessage && typeof backendMessage === 'string' && backendMessage.trim() !== '') {
      return backendMessage
    }
  }

  return 'Terjadi kesalahan. Silakan coba lagi.'
}
