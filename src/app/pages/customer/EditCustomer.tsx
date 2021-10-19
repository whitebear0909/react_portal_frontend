import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import toast from 'react-hot-toast'
import {getCustomerIds, updateCustomer} from './redux/customerCRUD'
import {CUSTOMER_LEVELS, USER_TYPES} from '../../../data/constants'
import {CustomerID, UserModel} from '../../../types'
import {RootState} from '../../../setup'
import CustomerForm, {CustomerFormData} from './component/CustomerForm'
import {getErrorMessage} from '../../../helper/response.helper'
import {Redirect, useParams} from 'react-router-dom'

type Props = {
  user: UserModel
  customers: UserModel[]
}
type ID = {
  id: string
}
const EditCustomer: React.FC<Props> = ({user, customers}) => {
  const {id} = useParams<ID>()
  const customer = customers.find((customer: UserModel) => customer.id === parseInt(id))
  const [customerIds, setCustomerIds] = useState<CustomerID[]>([])
  useEffect(() => {
    getCustomerIds().then((res) => {
      setCustomerIds(res.data)
    })
  }, [])

  const initialValues: any = {
    firstname: customer?.firstname || '',
    lastname: customer?.lastname || '',
    companyName: customer?.companyName || '',
    email: customer?.email || '',
    customerId: customer?.customerId || '',
    level: customer?.level || CUSTOMER_LEVELS.VIEWER,
    title: customer?.title || '',
  }
  const disableEditingCustomerId = user.type === USER_TYPES.CUSTOMER

  const [formLoading, setFormLoading] = useState(false)
  const handleSubmit = (values: CustomerFormData) => {
    setFormLoading(true)
    console.log('Aaa', values)
    updateCustomer(id, values)
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((error) => {
        const errMsg = getErrorMessage(error)
        toast.error(errMsg)
      })
      .finally(() => {
        setFormLoading(false)
      })
  }

  if (!id) return <Redirect to='/dashboard' />

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Edit Customer Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details'>
        <CustomerForm
          defaulValues={initialValues}
          customerIds={customerIds}
          disableEditingCustomerId={disableEditingCustomerId}
          submitButtonText='Update'
          onSubmit={handleSubmit}
          loading={formLoading}
        />
      </div>
    </div>
  )
}

const mapState = (state: RootState) => ({
  user: state.auth?.user,
  customers: state.customers?.customers,
})
const connector = connect(mapState, null)
export default connector(EditCustomer)
