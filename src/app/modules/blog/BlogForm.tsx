import React, {useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import BaseModal from '../../components/_modal/BaseModal'
import {getErrorMessage} from '../../../helper/response.helper'
import { createBlog } from './redux/blogCRUD'
import * as blogs from './redux/blogRedux'

const blogSchema = Yup.object().shape({
    title: Yup.string().required('Blog title is required')
})

const BlogForm: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [value, setValue] = useState('')
    const [formValues, setFormValues] = useState<any>()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        setLoading(true)
        createBlog({
            title: formValues.title,
            content: value,
            type: "text"
        }).then((res) => {
                toast.success(res.data.message)
                dispatch(blogs.actions.getBlogs({slug: null, from: null, to: null}))
            })
            .catch((error) => {
                const errMsg = getErrorMessage(error)
                toast.error(errMsg)
            })
            .finally(() => {
                setShow(false)
                setLoading(false)
                setValue('')
                formik.resetForm();
            })
    }

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: blogSchema,
        onSubmit: values => {
            setShow(true)
            setFormValues(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card card-xxl-stretch mb-5 mb-xl-8'>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bolder fs-3 mb-1'>Whats new at NBS editor</span>
                    </h3>
                    <div
                        className='card-toolbar'
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        data-bs-trigger='hover'
                        title='Click to publish new Blog'
                    >
                        <button type='submit' className='btn btn-primary'>
                            Publish
                        </button>
                    </div>
                </div>
                {/* end::Header */}
                {/* begin::Body */}
                <div className='card-body py-3'>
                    <div className='row mb-6'>
                        <label className='w-100px col-form-label required fw-bold fs-6'>Blog Title</label>

                        <div className='flex-grow-1 w-auto fv-row'>
                            <input
                                type='text'
                                className='form-control form-control-lg form-control-solid'
                                placeholder='Blog Title'
                                {...formik.getFieldProps('title')}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>{formik.errors.title}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='row mb-6 min-h-250px'>
                        <ReactQuill 
                            theme="snow"
                            modules={{
                                toolbar: {
                                    container: [
                                        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ list: 'ordered' }, { list: 'bullet' }],
                                        ['link', 'image', 'video'],
                                        ['clean'],
                                        ['code-block']
                                    ],
                                }
                            }}
                            value={value}
                            onChange={setValue} />
                    </div>
                </div>
                {/* begin::Body */}
            </div>
            <BaseModal 
                id="blog_form" 
                title="Publish New Blog"
                content="This post will be published to all of your customers, are you sure you want to continue?"
                okText="Yes"
                cancelText="No"
                show={show}
                loading={loading}
                handleOk={handleSubmit}
                handleCancel={() => setShow(false)}
            />
        </form>
    )
}

const connector = connect(null, null)
export default connector(BlogForm)