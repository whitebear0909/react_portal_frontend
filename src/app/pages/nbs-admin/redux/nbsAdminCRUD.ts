import axios from 'axios'
import {NBSAdminFormData} from '../component/NBSAdminForm'

export const NBS_ADMIN_URL = `${process.env.REACT_APP_API_URL}/nbs-admins`

export function getNBSAdmins(searchFilter: any = {}) {
  return axios.get(NBS_ADMIN_URL, searchFilter)
}

export function updateNBSAdmin(id: string | number, values: NBSAdminFormData) {
  const API_URL = `${NBS_ADMIN_URL}/${id}`
  const {firstname, lastname, email, level} = values

  return axios.post(API_URL, {
    firstname,
    lastname,
    email,
    level,
  })
}

export function createNBSAdmin({firstname, lastname, email, level}: NBSAdminFormData) {
  return axios.post(NBS_ADMIN_URL, {
    firstname,
    lastname,
    email,
    level,
  })
}

export function removeNBSAdmin(id: string | number) {
  if (!id) return

  const API_URL = `${NBS_ADMIN_URL}/${id}`

  return axios.delete(API_URL)
}

export function resendInviteNBSAdmin(id: string | number) {
  if (!id) return

  const API_URL = `${NBS_ADMIN_URL}/${id}/invite`

  return axios.post(API_URL)
}
