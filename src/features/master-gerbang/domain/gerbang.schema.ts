import { z } from 'zod'

export const gerbangFormSchema = z.object({
  id: z.number({ message: 'ID Gerbang wajib diisi' }).min(0, { message: 'ID Gerbang tidak boleh negatif' }),
  IdCabang: z.number({ message: 'ID Cabang wajib diisi' }).min(0, { message: 'ID Cabang tidak boleh negatif' }),
  NamaCabang: z.string({ message: 'Nama Cabang wajib diisi' }).min(1, { message: 'Nama Cabang wajib diisi' }),
  NamaGerbang: z.string({ message: 'Nama Gerbang wajib diisi' }).min(1, { message: 'Nama Gerbang wajib diisi' }),
})

export type GerbangFormSchema = z.infer<typeof gerbangFormSchema>
