/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {RootState} from '../../../../setup'
import {getPrimaryPhone} from '../../../../helper/user.helper'

const mapState = (state: RootState) => ({user: state.auth?.user})
const connector = connect(mapState, null)

const Overview = (props: any) => {
  const user = props.user

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{`${user.firstname} ${user.lastname}`}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{user?.companyName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Contact Phone
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{getPrimaryPhone(user)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <a href='#' className='fw-bold fs-6 text-dark text-hover-primary'>
                {user.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default connector(Overview)
