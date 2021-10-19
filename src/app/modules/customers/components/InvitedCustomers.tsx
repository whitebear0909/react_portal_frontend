/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {Link} from 'react-router-dom'
import {capitalize, KTSVG, toServerUrl} from '../../../../_metronic/helpers'

import InvitedCustomerMenu from './menus/InvitedCustomerMenu'
import {UserModel, InvitedCustomersProps} from '../../../../types'
import {makeStyles} from '@material-ui/core/styles'
import {CUSTOMER_STATUS} from '../../../../data/constants'

type ItemProps = {
  detail: UserModel
  showMenu: boolean
}

const useStyles = makeStyles((theme) => ({
  disabledLink: {
    pointerEvents: 'none',
  },
}))

const InvitedCustomerItem: React.FC<ItemProps> = ({detail, showMenu}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const openMenu = (event: any) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const getHelperText = () => {
    const level = capitalize(detail.level)
    let statusText = capitalize(detail?.status) + ' sent on '
    let time = detail.createdAt ? new Date(detail.createdAt).toLocaleString() : ''
    if (detail.status === CUSTOMER_STATUS.ACTIVE) {
      statusText = capitalize(detail?.status) + ' since '
      time = detail.activatedAt ? new Date(detail.activatedAt).toLocaleString() : ''
    }

    return `${level} - ${statusText} ${time}`
  }

  return (
    <div className='d-flex align-items-center mb-7'>
      {/* begin::Avatar */}
      <div className='symbol symbol-50px me-5'>
        <img src={toServerUrl('/media/avatar/' + detail.avatar)} className='' alt='' />
      </div>
      {/* end::Avatar */}
      {/* begin::Text */}
      <div className='flex-grow-1'>
        <Link
          to={`/customers/view/${detail.id}`}
          title='View'
          style={{cursor: 'pointer', width: '100%'}}
          className='text-dark fw-bolder text-hover-primary fs-6'
        >
          {detail.title}
        </Link>
        <span className='text-muted d-block fw-bold'>{getHelperText()}</span>
      </div>
      {showMenu && (
        <div className='symbol symbol-50px'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
            onClick={openMenu}
          >
            <KTSVG path='/media/icons/duotone/General/Other1.svg' className='svg-icon-2' />
          </button>

          <InvitedCustomerMenu
            detail={detail}
            anchorEl={anchorEl}
            open={open}
            handleClose={closeMenu}
          />
          {/* end::Menu */}
        </div>
      )}
      {/* end::Text */}
    </div>
  )
}

const InvitedCustomers: React.FC<InvitedCustomersProps> = (props) => {
  const classes = useStyles()

  return (
    <div className='card card-xl-stretch mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bolder text-dark'>Invited Customers</h3>
        <div className='card-toolbar'>
          <Link
            to='/customers/new'
            className={`btn btn-sm btn-light-${
              props.admin ? 'primary' : 'secondary ' + classes.disabledLink
            }`}
          >
            <KTSVG path='media/icons/duotone/Communication/Add-user.svg' className='svg-icon-3' />
            Invite
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-2'>
        {props.customers.map((customer: UserModel) => (
          <InvitedCustomerItem detail={customer} key={customer.id} showMenu={props.admin} />
        ))}
        {!props.customers.length && <p>There are no invited customers yet.</p>}
      </div>
      {/* end::Body */}
    </div>
  )
}

export default InvitedCustomers
