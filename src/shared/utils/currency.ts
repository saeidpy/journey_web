export const toMoneyCurrency = (price: number) => {
  var rest = price
  var result: string[] = []
  if (price === 0) {
    return '0'
  }
  for (var i = 0; rest > 0; i++) {
    const firstDigit = rest % 10
    rest = Math.floor(rest / 10)
    if (i % 3 === 0 && result.length > 0) {
      result.push('.')
    }
    result.push(`${firstDigit}`)
  }

  return [...result].reverse().join('')
}
