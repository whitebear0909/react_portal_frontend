import axios from 'axios'
import {UserModel} from '../../../types'
import {IProfileDetails, IUpdatePassword} from './components/settings/SettingsModel'

const UPDATE_PROFILE_URL = `${process.env.REACT_APP_API_URL}/users/customer/me`
const UPDATE_PASSWORD_URL = `${process.env.REACT_APP_API_URL}/users/update-password`

export function updateProfile(values: IProfileDetails) {
  let formData = new FormData()
  if (typeof values.avatar !== 'string') {
    formData.append('avatar', values.avatar)
  }
  formData.append('firstname', values.firstname)
  formData.append('lastname', values.lastname)
  // formData.append('companyName', values.companyName || '')
  formData.append('email', values.email)
  formData.append('secondaryEmail', values.secondaryEmail || '')
  formData.append('workCell', values.workCell)
  formData.append('workPhone', values.workPhone)
  formData.append('fax', values.fax)
  formData.append('other', values.other)
  formData.append('primaryPhone', values.primaryPhone)

  return axios.post<UserModel>(UPDATE_PROFILE_URL, formData)
}

export function updatePassword(values: IUpdatePassword) {
  return axios.post(UPDATE_PASSWORD_URL, {
    currentPassword: values.currentPassword,
    password: values.newPassword,
    password_confirmation: values.passwordConfirmation,
  })
}
