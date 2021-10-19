import React, {useState} from 'react'
import {useParams, useHistory} from 'react-router'
import toast from 'react-hot-toast'
import ConfirmAlert from '../../components/ConfirmAlert'
import {removeNBSAdmin} from './redux/nbsAdminCRUD'
import {UserModel} from '../../../types'

type Props = {
  nbsAdmins: UserModel[]
}
const DeleteCustomer: React.FC<Props> = ({nbsAdmins}) => {
  const {id}: any = useParams()
  const history = useHistory()
  const [showConfirmAlert, setConfirmAlert] = useState<boolean>(true)
  const nbsAdmin = nbsAdmins.find((nbsAdmin: UserModel) => nbsAdmin.id === parseInt(id))

  const onConfirm = () => {
    removeNBSAdmin(id)
      ?.then(() => toast.success('Successfully remove the customer'))
      .catch(() => toast.error('Failed to remove the customer'))
    setConfirmAlert(false)
    history.push('/dashboard')
  }
  const onCancel = () => {
    setConfirmAlert(false)
    history.push('/dashboard')
  }
  const content = `Are you sure to delete customer ${nbsAdmin?.firstname} ${nbsAdmin?.lastname}`
  return (
    <ConfirmAlert
      open={showConfirmAlert}
      onConfirm={onConfirm}
      onHide={onCancel}
      content={content}
    />
  )
}

export default DeleteCustomer
