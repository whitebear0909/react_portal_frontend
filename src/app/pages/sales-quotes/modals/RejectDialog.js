import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap-v5'
import {Formik, Form, Field} from 'formik'
import toast from 'react-hot-toast'

import * as quotes from '../quotesRedux'
import {rejectQuote} from '../quotesCrud'
import {getErrorMessage} from '../../../../helper/response.helper'

const initialValues = {
  comment: '',
  attachment: null,
}

const RejectModal = ({quoteId, quoteNumber, show, onHide, getQuotes, showConfirmAlert}) => {
  const CONFIRM_ALERT_CONTENT = `You are about to reject quote # ${quoteNumber}.  This order will be closed. Would you like to continue?`

  const [loading, setLoading] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true)

    rejectQuote(quoteId, values)
      .then(() => {
        getQuotes()
        toast.success('You rejected the quote successfully!')
      })
      .catch((error) => {
        const errMsg = getErrorMessage(error)
        toast.error(errMsg)
      })
      .finally(() => {
        setLoading(false)
        onHide()
      })
  }

  return (
    <Modal size='lg' show={show} onHide={onHide} aria-labelledby='example-modal-sizes-title-lg'>
      <Modal.Header>
        <Modal.Title>Reject this quote</Modal.Title>
      </Modal.Header>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({handleSubmit, setFieldValue}) => (
          <>
            <Modal.Body className='overlay overlay-block cursor-default'>
              {loading && (
                <div className='overlay-layer bg-transparent'>
                  <div className='spinner spinner-lg spinner-success' />
                </div>
              )}
              <Form className='form form-label-right'>
                {/* Comment */}
                <div className='form-group'>
                  <label>Comment</label>
                  <Field
                    name='comment'
                    as='textarea'
                    placeholder='Comment'
                    className='form-control'
                  />
                </div>

                {/* Attachment */}
                <div className='form-group'>
                  <label>Attachment</label>
                  <input
                    type='file'
                    name='attachment'
                    className='form-control'
                    onChange={(event) => {
                      setFieldValue('attachment', event.currentTarget.files[0])
                    }}
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type='button' onClick={onHide} className='btn btn-light btn-elevate'>
                Cancel
              </button>
              <> </>
              <button
                type='submit'
                onClick={() => showConfirmAlert(CONFIRM_ALERT_CONTENT, handleSubmit)}
                className='btn btn-primary btn-elevate'
                disabled={loading}
              >
                {!loading && <span className='indicator-label'>Reject</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  )
}

export default connect(null, quotes.actions)(RejectModal)
