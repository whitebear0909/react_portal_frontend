import React, {useState, useRef} from 'react'
import {useDispatch, connect} from 'react-redux'
import {useHistory} from 'react-router'
import toast from 'react-hot-toast'
import {KTSVG, toAbsoluteUrl, toServerUrl} from '../../../../../_metronic/helpers'
import {IProfileDetails} from './SettingsModel'
import {RootState} from '../../../../../setup'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {updateProfile} from '../../AccountAPI'
import * as auth from '../../../auth/redux/AuthRedux'
import {getErrorMessage} from '../../../../../helper/response.helper'
import {CUSTOMER_PHONE_TYPE} from '../../../../../data/constants'

const profileDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  workCell: Yup.string().when('primaryPhone', {
    is: (val: string) => val === 'workcell',
    then: Yup.string().required('Primary phone is required'),
    otherwise: Yup.string().notRequired(),
  }),
  workPhone: Yup.string().when('primaryPhone', {
    is: (val: string) => val === 'workphone',
    then: Yup.string().required('Primary phone is required'),
    otherwise: Yup.string().notRequired(),
  }),
  fax: Yup.string().when('primaryPhone', {
    is: (val: string) => val === 'fax',
    then: Yup.string().required('Primary phone is required'),
    otherwise: Yup.string().notRequired(),
  }),
  other: Yup.string().when('primaryPhone', {
    is: (val: string) => val === 'other',
    then: Yup.string().required('Primary phone is required'),
    otherwise: Yup.string().notRequired(),
  }),

  email: Yup.string().required('Email is required'),
})

const mapState = (state: RootState) => ({auth: state.auth})
const connector = connect(mapState, null)

const Settings: React.FC = (props: any) => {
  const user = props?.auth?.user

  const imagePreview = useRef<HTMLDivElement>(null)

  const history = useHistory()

  const initialValues: IProfileDetails = {
    avatar: '/media/avatar/' + user.avatar,
    firstname: user.firstname,
    lastname: user.lastname,
    companyName: user?.companyName || '',
    secondaryEmail: user?.secondaryEmail || '',
    workCell: user?.workCell || '',
    workPhone: user?.workPhone || '',
    fax: user?.fax || '',
    other: user?.other || '',
    primaryPhone: user?.primaryPhone || CUSTOMER_PHONE_TYPE.WORK_CELL,
    email: user.email,
  }

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik<IProfileDetails>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true)
      updateProfile(values)
        .then((res) => {
          dispatch(auth.actions.setUser(res.data))
          toast.success('Successfully updated!')
        })
        .catch((error) => {
          const errMsg = getErrorMessage(error)
          toast.error(errMsg)
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })

  const onChangePicHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader()
      reader.onload = function (event) {
        const current = imagePreview.current

        if (null !== current) current.style.backgroundImage = 'url(' + event.target?.result + ')'
      }
      reader.readAsDataURL(e.target.files[0])

      formik.setFieldValue('avatar', e.target.files[0])
    }
  }

  const setPrimary = (primary_type: String) => {
    formik.setFieldValue('primaryPhone', primary_type)
  }
  const avatarLink =
    typeof initialValues.avatar === 'string' ? toServerUrl(initialValues.avatar) : ''

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form autoComplete='off' onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div className='avatar-upload'>
                  <div className='avatar-edit'>
                    <input
                      type='file'
                      id='imageUpload'
                      accept='.png, .jpg, .jpeg'
                      onChange={onChangePicHandler}
                    />
                    <label htmlFor='imageUpload'>
                      <KTSVG
                        path='/media/icons/duotone/Interface/Edit.svg'
                        className='svg-icon-1'
                      />
                    </label>
                  </div>
                  <div className='avatar-preview'>
                    <div ref={imagePreview} style={{backgroundImage: `url(${avatarLink})`}}></div>
                  </div>
                </div>
              </div>
            </div>

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
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Company</label>

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

            <div className='row mb-6 '>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Work Cell</span>
              </label>

              <div className='col-lg-8 fv-row p-relative'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Work cell'
                  {...formik.getFieldProps('workCell')}
                />
                {formik.values.primaryPhone === 'workcell' && (
                  <span className='db inputspan'>
                    <img src={toAbsoluteUrl('/media/icons/Images/check-mark.png')} alt='metronic' />
                  </span>
                )}
                <button
                  type='button'
                  className='btn btn-primary inputbtn'
                  disabled={formik.values.workCell === ''}
                  onClick={() => setPrimary(CUSTOMER_PHONE_TYPE.WORK_CELL)}
                >
                  Set Primary
                </button>
                {formik.touched.workCell && formik.errors.workCell && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.workCell}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Work phone</span>
              </label>

              <div className='col-lg-8 fv-row p-relative'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Work phone'
                  {...formik.getFieldProps('workPhone')}
                />
                {formik.values.primaryPhone === 'workphone' && (
                  <span className='db inputspan'>
                    <img src={toAbsoluteUrl('/media/icons/Images/check-mark.png')} alt='metronic' />
                  </span>
                )}
                <button
                  type='button'
                  className='btn btn-primary inputbtn'
                  disabled={formik.values.workPhone === ''}
                  onClick={() => setPrimary(CUSTOMER_PHONE_TYPE.WORK_PHONE)}
                >
                  Set Primary
                </button>
                {formik.touched.workPhone && formik.errors.workPhone && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.workPhone}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Other Phone</span>
              </label>

              <div className='col-lg-8 fv-row p-relative'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Other'
                  {...formik.getFieldProps('other')}
                />
                {formik.values.primaryPhone === 'other' && (
                  <span className='db inputspan'>
                    <img src={toAbsoluteUrl('/media/icons/Images/check-mark.png')} alt='metronic' />
                  </span>
                )}
                <button
                  type='button'
                  className='btn btn-primary inputbtn'
                  disabled={formik.values.other === ''}
                  onClick={() => setPrimary(CUSTOMER_PHONE_TYPE.OTHER)}
                >
                  Set Primary
                </button>
                {formik.touched.other && formik.errors.other && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.other}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Fax</span>
              </label>

              <div className='col-lg-8 fv-row p-relative'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Fax'
                  {...formik.getFieldProps('fax')}
                />
                {formik.values.primaryPhone === 'fax' && (
                  <span className='db inputspan'>
                    <img src={toAbsoluteUrl('/media/icons/Images/check-mark.png')} alt='metronic' />
                  </span>
                )}
                {formik.touched.fax && formik.errors.fax && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.fax}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Primary Email</span>
              </label>

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
                <span>Seconday email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='email'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Secondary email'
                  {...formik.getFieldProps('secondaryEmail')}
                />
                {formik.touched.secondaryEmail && formik.errors.secondaryEmail && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.secondaryEmail}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Save Changes'}
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
              onClick={() => history.push('/crafted/account/overview')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default connector(Settings)
