import axios from 'axios'
import {UserModel} from '../../../../types'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/get-user`
export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REQUEST_PASSWORD_URL = 'api/auth/forgot-password'
export const RESET_PASSWORD_URL = `${API_URL}/auth/reset-password`
export const ME_URL = `${API_URL}/users/me`
export const LOGOUT_URL = `${API_URL}/auth/logout`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {email, password})
}

// Server should return AuthModel

export function register({
  firstname,
  lastname,
  email,
  password,
  companyId,
  customerId,
  companyName,
}: any) {
  return axios.post(REGISTER_URL, {
    firstname,
    lastname,
    email,
    password,
    company_id: companyId,
    customer_id: customerId,
    company_name: companyName,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {email})
}

// Server should return object => { result: boolean } (Is Email in DB)
export function resetPassword(token: string, password: string, isInvite: boolean) {
  return axios.post<{result: boolean}>(RESET_PASSWORD_URL, {token, password, isInvite})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(ME_URL)
}

export function logout() {
  // Authorization head should be fulfilled in interceptor.
  return axios.post(LOGOUT_URL)
}
