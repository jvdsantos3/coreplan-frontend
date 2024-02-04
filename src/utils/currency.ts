export const formatCurrency = (value: number) => {
  const valueInReal = value

  const fomatedValue = valueInReal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return fomatedValue
}
