export function isEmailValid(input: string) {
  if (/[a-zA-Z0-9.]*@[a-z]*[.a-z]*/.test(input)) {
    return true
  } else {
    return false
  }
}
