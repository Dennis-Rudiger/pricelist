export function formatMoney(value: number, currency: string = 'KES', locale: string = 'en-KE') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}
