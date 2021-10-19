import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast'
import SVG from 'react-inlinesvg'

import ApproveModal from './modals/ApproveDialog'
import CommentDialog from './modals/CommentDialog'
import RejectDialog from './modals/RejectDialog'
import HistoryDialog from './modals/HistoryDialog'
import ConfirmAlert from '../../components/ConfirmAlert'

import {toAbsoluteUrl} from '../../../_metronic/helpers'

const Actions = ({quote}) => {
  const {quote_number: quoteNumber, dbkey: quoteId, status: quoteStatus} = quote

  const initialActionModalsShow = {
    approve: false,
    reject: false,
    comment: false,
    history: false,
  }
  const [actionModalsShow, setActionModalsShow] = useState(initialActionModalsShow)

  const [confirmAlert, setConfirmAlert] = useState({
    show: false,
    cotent: '',
    onConfirm: () => {},
  })

  const hideActionModals = () => {
    setActionModalsShow(initialActionModalsShow)
  }

  const showConfirmAlert = (content, onConfirm) => {
    setConfirmAlert({show: true, content, onConfirm})
  }

  const modalProps = {
    onHide: hideActionModals,
    quoteId,
    quoteNumber,
    showConfirmAlert: showConfirmAlert,
  }

  const openModal = (action, checkActive = true) => {
    if (quoteStatus !== 'Active' && checkActive) {
      toast.error('This quote is inactive!')
      return
    }

    setActionModalsShow({
      ...initialActionModalsShow,
      [action]: true,
    })
  }

  return (
    <>
      <Link
        className='btn btn-icon btn-light btn-success btn-sm mx-2'
        onClick={() => openModal('approve')}
      >
        <span className='svg-icon svg-icon-md svg-icon-success'>
          <SVG src={toAbsoluteUrl('/media/icons/duotone/Files/Folder-check.svg')} title='Approve' />
        </span>
      </Link>
      <> </>

      <Link
        className='btn btn-icon btn-light btn-primary btn-sm mx-2'
        onClick={() => openModal('comment', false)}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG
            src={toAbsoluteUrl('/media/icons/duotone/Communication/Chat5.svg')}
            title='Comment'
          />
        </span>
      </Link>
      <> </>

      <Link
        className='btn btn-icon btn-light btn-danger btn-sm mx-2'
        onClick={() => openModal('reject')}
      >
        <span className='svg-icon svg-icon-md svg-icon-danger'>
          <SVG
            src={toAbsoluteUrl('/media/icons/duotone/Files/Deleted-folder.svg')}
            title='Reject'
          />
        </span>
      </Link>

      <Link
        className='btn btn-icon btn-light btn-info btn-sm mx-2'
        onClick={() =>
          setActionModalsShow({
            approve: false,
            reject: false,
            comment: false,
            history: true,
          })
        }
      >
        <span className='svg-icon svg-icon-md svg-icon-info'>
          <SVG src={toAbsoluteUrl('/media/icons/duotone/General/Other1.svg')} title='History' />
        </span>
      </Link>

      <ApproveModal show={actionModalsShow.approve} {...modalProps} />
      <CommentDialog show={actionModalsShow.comment} {...modalProps} />
      <RejectDialog show={actionModalsShow.reject} {...modalProps} />
      <HistoryDialog show={actionModalsShow.history} {...modalProps} />

      <ConfirmAlert
        open={confirmAlert.show}
        content={confirmAlert.content}
        onHide={() => setConfirmAlert({...confirmAlert, show: false})}
        onConfirm={confirmAlert.onConfirm}
      />
    </>
  )
}

export default Actions
