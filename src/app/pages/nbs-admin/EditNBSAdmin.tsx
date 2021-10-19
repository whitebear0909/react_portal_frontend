import React, {useState} from 'react'
import {connect} from 'react-redux'
import toast from 'react-hot-toast'
import {updateNBSAdmin} from './redux/nbsAdminCRUD'
import {NBS_ADMIN_LEVEL} from '../../../data/constants'
import {UserModel} from '../../../types'
import {RootState} from '../../../setup'
import NBSAdminForm, {NBSAdminFormData} from './component/NBSAdminForm'
import {getErrorMessage} from '../../../helper/response.helper'
import {Redirect, useParams} from 'react-router-dom'

type Props = {
  nbsAdmins: UserModel[]
}
type ID = {
  id: string
}
const EditNBSAdmin: React.FC<Props> = ({nbsAdmins}) => {
  const {id} = useParams<ID>()
  const nbsAdmin = nbsAdmins.find((nbsAdmin: UserModel) => nbsAdmin.id === parseInt(id))

  const initialValues: any = {
    firstname: nbsAdmin?.firstname || '',
    lastname: nbsAdmin?.lastname || '',
    email: nbsAdmin?.email || '',
    level: nbsAdmin?.level || NBS_ADMIN_LEVEL.TECHINICIAN,
  }

  const [formLoading, setFormLoading] = useState(false)
  const handleSubmit = (values: NBSAdminFormData) => {
    setFormLoading(true)
    updateNBSAdmin(id, values)
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
          <h3 className='fw-bolder m-0'>Edit NBS Admin Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details'>
        <NBSAdminForm
          defaulValues={initialValues}
          submitButtonText='Update'
          onSubmit={handleSubmit}
          loading={formLoading}
        />
      </div>
    </div>
  )
}

const mapState = (state: RootState) => ({
  nbsAdmins: state.nbsAdmins?.nbsAdmins,
})
const connector = connect(mapState, null)
export default connector(EditNBSAdmin)
