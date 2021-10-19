import React from 'react'
import {connect} from 'react-redux'
import {UserModel} from '../../../types'
import {RootState} from '../../../setup'
import {Link, Redirect, useParams} from 'react-router-dom'

type Props = {
  user: UserModel
  customers: UserModel[]
}
type ID = {
  id: string
}
const ViewCustomer: React.FC<Props> = ({user, customers}) => {
  const {id} = useParams<ID>()
  const customer = customers.find((customer: UserModel) => customer.id === parseInt(id))

  if (!id) return <Redirect to='/dashboard' />

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link
            to={`/customers/edit/${customer?.id}`}
            className='btn btn-primary align-self-center'
          >
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{`${customer?.firstname} ${customer?.lastname}`}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 me-2'> {user.email}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Customer ID</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{customer?.customerId}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{customer?.companyName}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapState = (state: RootState) => ({
  user: state.auth?.user,
  customers: state.customers?.customers,
})
const connector = connect(mapState, null)
export default connector(ViewCustomer)
