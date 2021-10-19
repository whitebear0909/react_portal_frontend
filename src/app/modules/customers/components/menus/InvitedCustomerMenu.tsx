/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Menu, MenuItem} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {UserModel} from '../../../../../types'

interface Props {
  open: boolean
  handleClose: () => void
  anchorEl: any
  detail: UserModel
}

const InvitedCustomerMenu = (props: Props) => {
  const {open, detail, anchorEl, handleClose} = props

  return (
    <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
      <MenuItem style={{cursor: 'default'}}>
        <Link
          to={`/customers/invite/${detail?.id}`}
          title='Resend-Invite'
          style={{cursor: 'pointer', width: '100%'}}
        >
          Resend Invite
        </Link>
      </MenuItem>
      <MenuItem style={{cursor: 'default'}}>
        <Link
          to={`/customers/edit/${detail.id}`}
          title='Edit'
          style={{cursor: 'pointer', width: '100%'}}
        >
          Edit
        </Link>
      </MenuItem>
      <MenuItem style={{cursor: 'default'}}>
        <Link
          to={`/customers/delete/${detail?.id}`}
          title='Delete'
          style={{cursor: 'pointer', width: '100%'}}
        >
          Delete
        </Link>
      </MenuItem>
    </Menu>
  )
}

export default InvitedCustomerMenu
