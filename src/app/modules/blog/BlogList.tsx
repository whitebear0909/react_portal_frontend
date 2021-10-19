/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {connect, useDispatch, ConnectedProps} from 'react-redux'
import moment from 'moment';
import {RootState} from '../../../setup'
import { BlogModel } from '../../../types'
import { KTSVG } from '../../../_metronic/helpers'
import FilterDropDown from './_dropdown/FilterDropDown';
import * as blogs from './redux/blogRedux'

type Props = {
  className: string,
  data: BlogModel[]
}

const mapState = (state: RootState) => ({
  loading: state.blogs.loading
})

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
type BlogListProps = Props & PropsFromRedux

const BlogList: React.FC<BlogListProps> = (props) => {
  const [isSearch, setIsSearch] = useState<boolean | null>(null)
  const [slug, setSlug] = useState('')
  const dispatch = useDispatch()

  const getBlogs = (filter: any) => {
    dispatch(blogs.actions.getBlogs(filter))
  }

  const _handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsSearch(true)
      getBlogs({slug: slug, from: null, to: null})
    }
  }
  
  return (
    <div className={`card ${props.className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-2 text-dark'>Whats new at NBS</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-light btn-text-dark-50 font-weight-bold btn-hover-bg-light mr-3'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Filter options'
          >
            <KTSVG
              path='/media/icons/duotone/Text/Filter.svg'
              className='svg-icon-2'
            />
            Filter
          </button>
          <FilterDropDown handleFilter={getBlogs} />
          {/* end::Menu */}
        </div>
        <form className="d-flex w-100 position-relative mb-3" autoComplete="off">
          <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                  <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
              </svg>
          </span>
          <input 
            type="text" 
            value={slug} 
            onChange={(e: any) => setSlug(e.target.value)} 
            onKeyDown={_handleKeyDown} 
            className="form-control form-control-flush ps-10 w-auto flex-grow-1" 
            name="search" 
            placeholder="Search..." 
          />
          <button 
            type="button" 
            className="btn btn-primary" 
            disabled={isSearch != null && isSearch && props.loading} 
            onClick={() => {
              setIsSearch(true)
              getBlogs({slug: slug, from: null, to: null})
            }}>
            {(!props.loading || (props.loading && !isSearch) || isSearch == null) && "Search"}
            {props.loading && isSearch && isSearch != null && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <button 
            type="button" 
            className="btn btn-primary ms-3" 
            disabled={isSearch != null && !isSearch && props.loading} 
            onClick={() => {
              setIsSearch(false)
              getBlogs({slug: null, from: moment(new Date()).format("Y-MM-DD"), to: moment(new Date()).format("Y-MM-DD")})              
            }}>
            {(!props.loading || (props.loading && isSearch) || isSearch == null) && "Today's Posts"}
            {props.loading && !isSearch && isSearch != null && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </form>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body overflow-y-scroll mh-500px mt-5'>
        {/* begin::Timeline */}
        <div className='timeline-label'>
          { props.data.map((item, i) => {
            return(
              <div className='timeline-item' key={`blog_${i}`}>
                {/* begin::Label */}
                <div className='timeline-label fw-bolder text-gray-800 fs-6'>{moment(item.createdAt).format("DD/MM/Y hh:mm a")}</div>
                {/* end::Label */}
                {/* begin::Badge */}
                <div className='timeline-badge'>
                  <i className='fa fa-genderless text-success fs-1'></i>
                </div>
                {/* end::Badge */}
                {/* begin::Content */}
                <div className='timeline-content d-flex'>
                  <span className='fw-bolder text-gray-800 ps-3 fs-6'>{item.title}</span>
                </div>
                {/* end::Content */}
              </div>
            )
          })}
        </div>
        {/* end::Timeline */}
      </div>
      {/* end: Card Body */}
    </div>
  )
}

export default connector(BlogList)
