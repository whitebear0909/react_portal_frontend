/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {Divider, Typography} from '@material-ui/core'
import Table from './Table'
import {CUSTOMER_STATUS} from '../../../../../data/constants'
import {CustomersProps} from '../../../../../types'
import {KTSVG, toServerUrl} from '../../../../../_metronic/helpers'

const CustomersTable: React.FC<CustomersProps> = (props) => {
  // This is a custom filter UI for selecting
  // a unique option from a list
  function SelectColumnFilter({column: {filterValue, setFilter, preFilteredRows, id}}: any) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set<any>()
      preFilteredRows.forEach((row: any) => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value=''>All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Customers',
        id: 'basic-info',
        accessor: (originalRow: any) => ({
          name: `${originalRow.firstname} ${originalRow.lastname}`,
          customerId: originalRow.customerId,
          avatar: originalRow.avatar,
        }),
        Cell: ({cell: {value}}: any) => reanderBasicInfo(value),
        filter: 'name',
      },
      {
        Header: 'Level',
        accessor: 'level',
        Cell: ({cell: {value}}: any) => renderSimpleString(value),
        filter: 'includes',
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Company',
        id: 'company-info',
        accessor: (originalRow: any) => ({
          companyName: originalRow.companyName,
          customerId: originalRow.customerId,
        }),
        Cell: ({cell: {value}}: any) => renderCompanyInfo(value),
        filter: 'company',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({cell: {value}}: any) => renderSimpleString(value),
        filter: 'includes',
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        disableFilters: true,
        disableSortBy: true,
        Cell: ({cell}: any) => renderActions(cell),
        className: 'text-end mb-4',
      },
    ],
    []
  )

  const data = useMemo(() => props.customers, [props.customers])

  const activeUsersCnt = useMemo(
    () => props.customers.filter((c: any) => c.status === CUSTOMER_STATUS.ACTIVE).length,
    [props.customers]
  )
  const invitedUsersCnt = useMemo(
    () => props.customers.filter((c: any) => c.status === CUSTOMER_STATUS.INVITED).length,
    [props.customers]
  )

  const reanderBasicInfo = (value: any) => (
    <div className='d-flex align-items-center'>
      <div className='symbol symbol-45px me-5'>
        <img src={toServerUrl('/media/avatar/' + value.avatar)} alt='' />
      </div>
      <div className='d-flex justify-content-start flex-column'>
        <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
          {`${value.name}`}
        </a>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{value.customerId}</span>
      </div>
    </div>
  )

  const renderSimpleString = (value: any) => (
    <div className='d-flex align-items-center justify-content-start'>
      <p className='text-dark fw-bolder fs-6 capitalize'>{value}</p>
    </div>
  )

  const renderCompanyInfo = (value: any) => (
    <>
      <p className='text-dark fw-bolder text-hover-primary d-block mb-0 fs-6'>
        {value.companyName}
      </p>
      <span className='text-muted fw-bold text-muted d-block fs-7'>{value.customerId}</span>
    </>
  )

  const renderActions = (value: any) => (
    <div className='d-flex justify-content-end flex-shrink-0'>
      <Link
        to={`/customers/invite/${value.row.original.id}`}
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        title='Resend-Invite'
      >
        <KTSVG path='/media/icons/duotone/General/Settings-1.svg' className='svg-icon-3' />
      </Link>
      <Link
        to={`/customers/edit/${value.row.original.id}`}
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        title='Edit'
      >
        <KTSVG path='/media/icons/duotone/Communication/Write.svg' className='svg-icon-3' />
      </Link>
      <Link
        to={`/customers/delete/${value.row.original.id}`}
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        title='Delete'
      >
        <KTSVG path='/media/icons/duotone/General/Trash.svg' className='svg-icon-3' />
      </Link>
    </div>
  )

  return (
    <div className='card card-xxl-stretch mb-5 mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Customer Administration</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Invited: {invitedUsersCnt}</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Active: {activeUsersCnt}</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <Link to='/customers/new' className='btn btn-sm btn-light-primary'>
            <KTSVG path='media/icons/duotone/Communication/Add-user.svg' className='svg-icon-3' />
            New Customer
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          <Divider style={{backgroundColor: 'rgba(0,0,0,.5)', marginBottom: 16}} />
          {data.length > 0 && <Table columns={columns} data={data} />}
          {!data.length && <Typography>There are no customers yet. Please invite one.</Typography>}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default CustomersTable
