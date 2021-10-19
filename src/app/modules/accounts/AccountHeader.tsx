/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {capitalize, KTSVG, toServerUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {connect} from 'react-redux'
import {RootState} from '../../../setup'

const AccountHeader: React.FC = (props: any) => {
  const user = props?.auth?.user
  const location = useLocation()
  const compleationRate = () => {
    const totalFields = 5
    let filled = 0
    if (user.avatar !== 'blank.png' && user.avatar !== '') filled++
    if (user.firstname) filled++
    if (user.lastname) filled++
    if (user?.customer?.company_name) filled++
    if (user?.customer?.primary_phone) filled++

    return (filled / totalFields) * 100
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={toServerUrl('/media/avatar/' + user.avatar)} alt='Metronic' />
              {/* <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div> */}
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {`${user.firstname} ${user.lastname}`}
                  </a>
                  <a href='#'>
                    <KTSVG
                      path='/media/icons/duotone/Design/Verified.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotone/General/User.svg'
                      className='svg-icon-4 me-1'
                    />
                    {capitalize(user.type)}
                  </a>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                  <span className='fw-bolder fs-6'>{compleationRate()}%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: `${compleationRate()}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  ((location.pathname === '/crafted/account/overview' ||
                    location.pathname === '/crafted/account/settings') &&
                    'active')
                }
                to='/crafted/account/overview'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/account/change-password' && 'active')
                }
                to='/crafted/account/change-password'
              >
                Change Password
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapState = (state: RootState) => ({auth: state.auth})
const connector = connect(mapState, null)

export default connector(AccountHeader)
