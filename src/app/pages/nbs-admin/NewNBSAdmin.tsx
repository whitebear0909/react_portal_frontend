import React, {useState} from 'react'
import toast from 'react-hot-toast'
import {createNBSAdmin} from './redux/nbsAdminCRUD'
import {NBS_ADMIN_LEVEL} from '../../../data/constants'
import NBSAdminForm, {NBSAdminFormData} from './component/NBSAdminForm'
import {getErrorMessage} from '../../../helper/response.helper'

const CustomerDetails: React.FC = () => {
  const initialValues: any = {
    firstname: '',
    lastname: '',
    email: '',
    level: NBS_ADMIN_LEVEL.TECHINICIAN,
  }

  const [formLoading, setFormLoading] = useState(false)
  const handleSubmit = (values: NBSAdminFormData) => {
    setFormLoading(true)
    createNBSAdmin(values)
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
          <h3 className='fw-bolder m-0'>Invite a new NBS admin</h3>
        </div>
      </div>

      <div id='kt_account_profile_details'>
        <NBSAdminForm
          defaulValues={initialValues}
          submitButtonText='Invite'
          onSubmit={handleSubmit}
          loading={formLoading}
        />
      </div>
    </div>
  )
}

export default CustomerDetails
