/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router'
import {connect} from 'react-redux'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
import {CustomerID} from '../../../../../types'
import {CUSTOMER_LEVELS} from '../../../../../data/constants'
import {RootState} from '../../../../../setup'
import {CustomerFormData} from '.'

const profileDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  customerId: Yup.string().required('Customer Id is required'),
  email: Yup.string().required('Email is required'),
  level: Yup.string().required('Level is required'),
})

type Props = {
  defaulValues: CustomerFormData
  disableEditingCustomerId?: boolean
  customerIds: CustomerID[]
  submitButtonText: string
  onSubmit: (values: CustomerFormData) => unknown
  loading?: boolean
}
const CustomerForm: React.FC<Props> = ({
  defaulValues,
  disableEditingCustomerId = false,
  customerIds,
  submitButtonText,
  onSubmit,
  loading = false,
}) => {
  const history = useHistory()
  const defaultCustomerValue =
    customerIds.find((c: CustomerID) => c.customerId === defaulValues.customerId)?.value || ''

  const [customerIdValue, setCustomerIdValue] = useState(defaultCustomerValue)

  const formik = useFormik<CustomerFormData>({
    initialValues: defaulValues,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => onSubmit(values),
  })

  useEffect(() => setCustomerIdValue(defaultCustomerValue), [customerIds])

  if (!customerIds || !customerIds.length) return <></>
  const customerIdOptions = customerIds.map((id: CustomerID) => id.value)

  return (
    <form onSubmit={formik.handleSubmit} noValidate className='form'>
      <div className='card-body border-top p-9'>
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

          <div className='col-lg-8'>
            <div className='row'>
              <div className='col-lg-6 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                  placeholder='First name'
                  {...formik.getFieldProps('firstname')}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.firstname}</div>
                  </div>
                )}
              </div>

              <div className='col-lg-6 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Last name'
                  {...formik.getFieldProps('lastname')}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.lastname}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>

          <div className='col-lg-8 fv-row'>
            <input
              type='email'
              className='form-control form-control-lg form-control-solid'
              placeholder='Email'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.email}</div>
              </div>
            )}
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>
            <span className='required'>Customer ID</span>
          </label>

          <div className='col-lg-8 fv-row'>
            <Autocomplete
              value={customerIdValue}
              onChange={(event, newValue) => {
                if (!newValue) return

                setCustomerIdValue(newValue)
                const selectedId = customerIds.find((id: CustomerID) => id.value === newValue)
                if (selectedId?.companyName) {
                  formik.setFieldValue('customerId', selectedId.customerId)
                  formik.setFieldValue('companyName', selectedId.companyName)
                }
              }}
              options={customerIdOptions}
              renderInput={(params) => <TextField {...params} />}
              disabled={disableEditingCustomerId}
            />
            {formik.touched.customerId && formik.errors.customerId && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.customerId}</div>
              </div>
            )}
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Company Name</label>

          <div className='col-lg-8 fv-row'>
            <input
              disabled
              type='text'
              className='form-control form-control-lg form-control-solid'
              placeholder='Company name'
              style={{color: '#5e627869'}}
              {...formik.getFieldProps('companyName')}
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.companyName}</div>
              </div>
            )}
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>

          <div className='col-lg-8 fv-row'>
            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              placeholder='Title'
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.title}</div>
              </div>
            )}
          </div>
        </div>

        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>
            <span className='required'>Level</span>
          </label>

          <div className='col-lg-8 fv-row'>
            <Autocomplete
              value={formik.values.level}
              onChange={(event, newValue) => formik.setFieldValue('level', newValue)}
              options={Object.values(CUSTOMER_LEVELS)}
              renderInput={(params) => <TextField {...params} />}
            />
            {formik.touched.level && formik.errors.level && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.level}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {!loading && submitButtonText}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <button
          id='kt_password_cancel'
          type='button'
          className='btn btn-color-gray-400 btn-active-light-primary px-6'
          onClick={() => history.push('/dashboard')}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const mapState = (state: RootState) => ({
  user: state.auth?.user,
})
const connector = connect(mapState, null)
export default connector(CustomerForm)
