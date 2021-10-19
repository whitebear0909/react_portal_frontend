import React, {useState} from 'react'
import {useParams, useHistory} from 'react-router'
import toast from 'react-hot-toast'
import ConfirmAlert from '../../components/ConfirmAlert'
import {removeCustomer} from './redux/customerCRUD'
import {UserModel} from '../../../types'
import {RootState} from '../../../setup'
import {connect} from 'react-redux'

type Props = {
  customers: UserModel[]
}

const DeleteCustomer: React.FC<Props> = ({customers}) => {
  const {id}: any = useParams()
  const history = useHistory()
  const [showConfirmAlert, setConfirmAlert] = useState<boolean>(true)

  const customer = customers.find((customer: UserModel) => customer.id === parseInt(id))

  const onConfirm = () => {
    removeCustomer(id)
      ?.then(() => toast.success('Successfully remove the customer'))
      .catch(() => toast.error('Failed to remove the customer'))
    setConfirmAlert(false)
    history.push('/dashboard')
  }
  const onCancel = () => {
    setConfirmAlert(false)
    history.push('/dashboard')
  }
  const content = `Are you sure to delete customer ${customer?.firstname} ${customer?.lastname}`
  return (
    <ConfirmAlert
      open={showConfirmAlert}
      onConfirm={onConfirm}
      onHide={onCancel}
      content={content}
    />
  )
}

const mapState = (state: RootState) => ({
  customers: state.customers?.customers,
})
const connector = connect(mapState, null)
export default connector(DeleteCustomer)
