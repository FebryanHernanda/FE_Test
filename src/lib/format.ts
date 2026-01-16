const numberFormatter = new Intl.NumberFormat('id-ID')

export const formatNumber = (value: number): string => {
  return numberFormatter.format(value)
}
