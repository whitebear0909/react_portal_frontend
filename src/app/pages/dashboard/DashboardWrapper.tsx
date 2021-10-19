/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {connect, ConnectedProps} from 'react-redux'
import {RootState} from '../../../setup'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  MixedWidget8,
} from '../../../_metronic/partials/widgets'
import * as levelHelper from '../../../helper/level.helper'

import {SalesStatistics} from '../../modules/sales'
import {InvitedCustomers} from '../../modules/customers'
import CustomersTable from '../customer/component/CustomersTable'
import NBSAdminTable from '../nbs-admin/component/NBSAdminTable'
import BlogForm from '../../modules/blog'
import BlogList from '../../modules/blog/BlogList'

import * as customersRedux from '../customer/redux/customerRedux'
import * as nbsAdminsRedux from '../nbs-admin/redux/nbsAdminRedux'
import * as blogsRedux from '../../modules/blog/redux/blogRedux'
import {BlogModel, UserModel} from '../../../types'

interface ReduxStateValueProps {
  isAdmin: boolean
  isNBS: boolean
  customers: UserModel[]
  nbsAdmins: UserModel[]
  blogs: BlogModel[]
  user: UserModel | undefined
}
const DashboardPage: FC<ReduxStateValueProps> = ({isAdmin, isNBS, customers, user, nbsAdmins, blogs}) => (
  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xxl-4'>
        <SalesStatistics
          className='card-xl-stretch mb-xl-8'
          color='danger'
        />
      </div>
      <div className='col-xxl-8'>
        <BlogList data={blogs} className='card-xxl-stretch' />
      </div>
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    {isNBS && (
      <div className='row gy-5 gx-xl-8'>
        <div className='col-xl-12'>
          <CustomersTable customers={customers} />
        </div>
        <div className='col-xl-12'>
          <NBSAdminTable data={nbsAdmins} />
        </div>
        <div className='col-xl-12'>
          <BlogForm />
        </div>
      </div>
    )}

    {/* end::Row */}

    {/* begin::Row */}
    {!isNBS && (
      <div className='row gy-5 g-xl-8'>
        <div className='col-xl-4'>
          <InvitedCustomers customers={customers} admin={isAdmin} />
        </div>
        <div className='col-xl-4'>
          <ListsWidget6 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-4'>
          <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
          {/* partials/widgets/lists/_widget-4', 'class' => 'card-xl-stretch mb-5 mb-xl-8', 'items' => '5' */}
        </div>
      </div>
    )}
    {/* end::Row */}

    {!isNBS && (
      <div className='row g-5 gx-xxl-8'>
        <div className='col-xxl-4'>
          <MixedWidget8
            className='card-xxl-stretch mb-xl-3'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
        <div className='col-xxl-8'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
        </div>
      </div>
    )}
  </>
)

const mapState = (state: RootState) => ({
  customers: state.customers.customers,
  nbsAdmins: state.nbsAdmins.nbsAdmins,
  blogs: state.blogs.blogs,
  loading: state.customers.loading,
  user: state.auth?.user,
})
const connector = connect(mapState, {...customersRedux.actions, ...nbsAdminsRedux.actions, ...blogsRedux.actions})
type PropsFromRedux = ConnectedProps<typeof connector>
type CustomerDataProps = ReduxStateValueProps & PropsFromRedux

const DashboardWrapper: FC<CustomerDataProps> = (props) => {
  const intl = useIntl()
  const isAdmin = levelHelper.isCustomerAdmin(props.user?.level)
  const isNBS = levelHelper.isNBS(props.user?.type)

  useEffect(() => {
    if (isNBS) {
      props.getCustomers()
      props.getNBSAdmins()      
    } else if (isAdmin && props.user?.companyId) {
      props.getCustomersOfCompany(props.user?.companyId)
    }
    props.getBlogs({slug: null, from: null, to: null})
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{isNBS ? intl.formatMessage({id: 'MENU.ADMINDASHBOARD'}) : intl.formatMessage({id: 'MENU.CUSTOMERDASHBOARD'})}</PageTitle>
      <DashboardPage
        isAdmin={isAdmin}
        isNBS={isNBS}
        customers={props.customers}
        nbsAdmins={props.nbsAdmins}
        user={props.user}
        blogs={props.blogs}
      />
    </>
  )
}

export default connector(DashboardWrapper)
