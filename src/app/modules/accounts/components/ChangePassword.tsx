/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import toast from 'react-hot-toast'
import {IUpdatePassword, initialUpdatePassword} from './settings/SettingsModel'
import {updatePassword} from '../AccountAPI'
import {getErrorMessage} from '../../../../helper/response.helper'

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const ChangePassword: React.FC = () => {
  const [passwordUpdateData, setPasswordUpdateData] =
    useState<IUpdatePassword>(initialUpdatePassword)

  const [loading, setLoading] = useState(false)

  const formik = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading(true)

      updatePassword(values)
        .then(() => {
          toast.success('Password has been updated!')
          setPasswordUpdateData(initialUpdatePassword)
        })
        .catch((error: any) => {
          if (error.response && error.response.status === 401) {
            toast.error('Current password is wrong!')
          } else {
            const errMsg = getErrorMessage(error)
            toast.error(errMsg)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Change your password</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='separator separator-dashed my-6'></div>

          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password_edit'>
              <form
                autoComplete='off'
                onSubmit={formik.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='currentpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Current Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='currentpassword'
                        {...formik.getFieldProps('currentPassword')}
                      />
                      {formik.touched.currentPassword && formik.errors.currentPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.currentPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                        New Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='newpassword'
                        {...formik.getFieldProps('newPassword')}
                      />
                      {formik.touched.newPassword && formik.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.newPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Confirm New Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='confirmpassword'
                        {...formik.getFieldProps('passwordConfirmation')}
                      />
                      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.passwordConfirmation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Password must be at least 8 character and contain symbols
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading && 'Update Password'}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ChangePassword}
