import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import toast from 'react-hot-toast'
import {getCustomerIds, createCustomer} from './redux/customerCRUD'
import {CUSTOMER_LEVELS, USER_TYPES} from '../../../data/constants'
import {CustomerID, UserModel} from '../../../types'
import {RootState} from '../../../setup'
import CustomerForm, {CustomerFormData} from './component/CustomerForm'
import {getErrorMessage} from '../../../helper/response.helper'

type Props = {
  user: UserModel
}
const NewCustomer: React.FC<Props> = ({user}) => {
  const [customerIds, setCustomerIds] = useState<CustomerID[]>([])
  useEffect(() => {
    getCustomerIds().then((res) => {
      setCustomerIds(res.data)
    })
  }, [])

  const initialValues: any = {
    firstname: '',
    lastname: '',
    companyName: user?.companyName || '',
    email: '',
    customerId: user?.customerId || '',
    level: CUSTOMER_LEVELS.VIEWER,
    title: '',
  }
  const disableEditingCustomerId = user.type === USER_TYPES.CUSTOMER

  const [formLoading, setFormLoading] = useState(false)
  const handleSubmit = (values: CustomerFormData) => {
    setFormLoading(true)
    createCustomer(values)
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

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Invite a new customer</h3>
        </div>
      </div>

      <div id='kt_account_profile_details'>
        <CustomerForm
          defaulValues={initialValues}
          customerIds={customerIds}
          disableEditingCustomerId={disableEditingCustomerId}
          submitButtonText='Invite'
          onSubmit={handleSubmit}
          loading={formLoading}
        />
      </div>
    </div>
  )
}

const mapState = (state: RootState) => ({
  user: state.auth?.user,
})
const connector = connect(mapState, null)
export default connector(NewCustomer)
