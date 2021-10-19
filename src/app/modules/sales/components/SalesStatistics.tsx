/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Dropdown1} from '../../../../_metronic/partials/content/dropdown/Dropdown1'
import {KTSVG} from '../../../../_metronic/helpers'

type Props = {
  className: string
  color: string
}

const SalesStatistics: React.FC<Props> = ({className, color}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bolder fs-3'>Work Order</h3>
            <div className='ms-1'>
              {/* begin::Menu */}
              <button
                type='button'
                className={`btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color-${color} border-0 me-n3`}
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
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
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-cfolumn text-white pt-8'>
            <span className='fw-bold fs-7'></span>
            <span className='fw-bolder fs-2x pt-1'></span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Items */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-0 position-relative z-index-1 bg-white'
          style={{marginTop: '-150px'}}
        >
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotone/Home/Globe.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='/statistics/sales-quotes' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Service Quotes
                </a>
                <div className='text-gray-400 fw-bold fs-7'>Manage Service Quotes</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>7</div>
                <KTSVG
                  path='/media/icons/duotone/Navigation/Arrow-up.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG
                  path='/media/icons/duotone/Home/Globe.svg'
                  className='svg-icon-1'
                />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='/statistics/sales-orders' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Sales Quotes
                </a>
                <div className='text-gray-400 fw-bold fs-7'>Manage Sales Quotes</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>6</div>
                <KTSVG
                  path='/media/icons/duotone/Navigation/Arrow-up.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotone/Shopping/Sale1.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Service Orders
                </a>
                <div className='text-gray-400 fw-bold fs-7'>Manage Service Orders</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>10</div>
                <KTSVG
                  path='/media/icons/duotone/Navigation/Arrow-up.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotone/Shopping/Sale1.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Sales Orders
                </a>
                <div className='text-gray-400 fw-bold fs-7'>Manage Sales Orders</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>4</div>
                <KTSVG
                  path='/media/icons/duotone/Navigation/Arrow-up.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotone/Files/File.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Calibration Reports
                </a>
                <div className='text-gray-400 fw-bold fs-7'>View Calibration Reports</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>4</div>
                <KTSVG
                 path='/media/icons/duotone/Navigation/Arrow-up.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
        </div>
        
        {/* end::Items */}
        
      </div>
      {/* end::Body */}
    </div>
  )
}

export default SalesStatistics