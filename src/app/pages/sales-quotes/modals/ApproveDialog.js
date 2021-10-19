import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap-v5'
import {Formik, Form, Field} from 'formik'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

import * as quotes from '../quotesRedux'
import {approveQuote} from '../quotesCrud'
import {getErrorMessage} from '../../../../helper/response.helper'

// Validation schema
const CustomerEditSchema = Yup.object().shape({
  po: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('PO is required'),
})

const initialValues = {
  po: '',
  paymentType: 'po',
  hardCopyAvailable: '',
  comment: '',
  attachment: null,
}

const ApproveModal = ({quoteId, quoteNumber, show, onHide, getQuotes, showConfirmAlert}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true)

    approveQuote(quoteId, values)
      .then(() => {
        getQuotes()
        toast.success('You approved the quote successfully!')
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
        <Modal.Title>Approve this quote</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={CustomerEditSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({handleSubmit, handleChange, setFieldValue, errors, touched, values}) => (
          <>
            <Modal.Body className='overlay overlay-block cursor-default'>
              {loading && (
                <div className='overlay-layer bg-transparent'>
                  <div className='spinner spinner-lg spinner-success' />
                </div>
              )}
              <Form className='form form-label-right'>
                <div className='form-group row'>
                  {/* PO */}
                  <div className='col-lg-6'>
                    <label>PO</label>
                    <Field name='po' as='input' placeholder='PO' className='form-control' />
                    {touched.po && errors.po ? (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{errors.po}</div>
                      </div>
                    ) : null}
                  </div>
                  {/* Payment Type */}
                  <div className='col-lg-6'>
                    <label>Payment Type</label>
                    <select
                      className='form-control'
                      name='paymentType'
                      label='Payment Type'
                      onChange={handleChange}
                    >
                      <option value='po'>PO</option>
                      <option value='cc'>Credit Card</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>
                </div>
                {/* Hard copy available */}
                {values.paymentType === 'po' && (
                  <div className='form-group'>
                    Is a hard copy available?
                    <Field
                      name='hardCopyAvailable'
                      type='checkbox'
                      placeholder='hardCopyAvailable'
                    />
                  </div>
                )}

                {/* Comment */}
                <div className='form-group'>
                  <label>Comment</label>
                  <Field
                    name='comment'
                    as='textarea'
                    placeholder='Approval comment'
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
                onClick={() => {
                  const CONFIRM_ALERT_CONTENT = `You are about to approve quote # ${quoteNumber}.  A new order with PO# ${values.po} will be created and will be submitted to our billing department. Would you like to continue?`
                  showConfirmAlert(CONFIRM_ALERT_CONTENT, handleSubmit)
                }}
                className='btn btn-primary btn-elevate'
                disabled={loading}
              >
                {!loading && <span className='indicator-label'>Approve</span>}
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

export default connect(null, quotes.actions)(ApproveModal)
