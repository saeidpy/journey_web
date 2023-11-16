export const isValidPassportNumber = (input: string) => {
  const regex = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/
  return regex.test(input)
}
