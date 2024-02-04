import { IUser } from '../interfaces/IUser'

export function storeTokens(token: string) {
  sessionStorage.setItem('@coreplan_token', token)
}

export function removeTokens() {
  sessionStorage.removeItem('@coreplan_token')
}

export function getToken() {
  return sessionStorage.getItem('@coreplan_token')
}

export function storeUser(data: IUser) {
  sessionStorage.setItem('@coreplan_user_id', String(data.id))
  sessionStorage.setItem('@coreplan_user_role', String(data.role))
}

export function getUser() {
  const id = sessionStorage.getItem('@coreplan_user_id')
  const role = sessionStorage.getItem('@coreplan_user_role')

  return {
    id,
    role,
  }
}
