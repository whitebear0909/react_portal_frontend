/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {useHistory} from 'react-router'
import {connect} from 'react-redux'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
import {NBS_ADMIN_LEVEL} from '../../../../../data/constants'
import {RootState} from '../../../../../setup'
import {NBSAdminFormData} from '.'

const profileDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required'),
  level: Yup.string().required('Level is required'),
})

type Props = {
  defaulValues: NBSAdminFormData
  submitButtonText: string
  onSubmit: (values: NBSAdminFormData) => unknown
  loading?: boolean
}
const NBSAdminForm: React.FC<Props> = ({
  defaulValues,
  submitButtonText,
  onSubmit,
  loading = false,
}) => {
  const history = useHistory()

  const formik = useFormik<NBSAdminFormData>({
    initialValues: defaulValues,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => onSubmit(values),
  })

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
            <span className='required'>Level</span>
          </label>

          <div className='col-lg-8 fv-row'>
            <Autocomplete
              value={formik.values.level}
              onChange={(event, newValue) => formik.setFieldValue('level', newValue)}
              options={Object.values(NBS_ADMIN_LEVEL)}
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
export default connector(NBSAdminForm)
