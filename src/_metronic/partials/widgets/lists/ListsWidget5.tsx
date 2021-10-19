/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { BlogModel } from '../../../../types'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import moment from 'moment';

type Props = {
  className: string,
  data: BlogModel[]
}

const ListsWidget5: React.FC<Props> = ({className, data}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-2 text-dark'>Whats new at NBS</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Filter options'
          >
            <KTSVG
              path='/media/icons/duotone/Layout/Layout-4-blocks-2.svg'
              className='svg-icon-2'
            />
          </button>
          <Dropdown1 />
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body overflow-y-scroll mh-500px pt-5'>
        {/* begin::Timeline */}
        <div className='timeline-label'>
          { data.map((item, i) => {
            return(
              <div className='timeline-item' key={`blog_${i}`}>
                {/* begin::Label */}
                <div className='timeline-label fw-bolder text-gray-800 fs-6'>{moment(item.createdAt).format("DD/MM/Y HH:mm")}</div>
                {/* end::Label */}
                {/* begin::Badge */}
                <div className='timeline-badge'>
                  <i className='fa fa-genderless text-success fs-1'></i>
                </div>
                {/* end::Badge */}
                {/* begin::Content */}
                <div className='timeline-content d-flex'>
                  <span className='fw-bolder text-gray-800 ps-3'>{item.title}</span>
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

export {ListsWidget5}
