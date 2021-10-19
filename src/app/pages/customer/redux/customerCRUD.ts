import axios from 'axios'
import {CustomerID} from '../../../../types'
import {CustomerFormData} from '../component/CustomerForm'

export const CUSTOMER_URL = `${process.env.REACT_APP_API_URL}/customers`
export const GET_ALL_CUSTOMER_IDS_URL = `${process.env.REACT_APP_API_URL}/customers/ids`

export function getCustomerIds() {
  return axios.get<CustomerID[]>(GET_ALL_CUSTOMER_IDS_URL)
}

export function getCustomers(searchFilter: any = {}) {
  return axios.get(CUSTOMER_URL, searchFilter)
}

export function getCustomersOfCompany(companyId: string, searchFilter: any = {}) {
  return axios.get(`${CUSTOMER_URL}/${companyId}`, searchFilter)
}

export function updateCustomer(id: string | number, values: CustomerFormData) {
  const API_URL = `${CUSTOMER_URL}/${id}`
  const {firstname, lastname, email, customerId, level, title} = values

  return axios.post(API_URL, {
    firstname,
    lastname,
    email,
    customerId,
    level,
    title,
  })
}

export function createCustomer({
  firstname,
  lastname,
  email,
  customerId,
  level,
  title,
}: CustomerFormData) {
  return axios.post(CUSTOMER_URL, {
    firstname,
    lastname,
    email,
    customerId,
    level,
    title,
  })
}

export function removeCustomer(id: string | number) {
  if (!id) return

  const API_URL = `${CUSTOMER_URL}/${id}`

  return axios.delete(API_URL)
}

export function resendInviteCustomer(id: string | number) {
  if (!id) return

  const API_URL = `${CUSTOMER_URL}/${id}/invite`

  return axios.post(API_URL)
}
