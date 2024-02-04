export function storeTokens(token: string) {
  sessionStorage.setItem('@sneakers_token', token)
}

export function removeTokens() {
  sessionStorage.removeItem('@sneakers_token')
}

export function getToken() {
  return sessionStorage.getItem('@sneakers_token')
}
