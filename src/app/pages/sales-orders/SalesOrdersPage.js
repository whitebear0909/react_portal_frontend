/* eslint-disable no-restricted-imports */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Card, CardContent, Typography} from '@material-ui/core'

import {PageTitle} from '../../../_metronic/layout/core'
import SalesOrdersFilter from './SalesOrdersFilter'
import DataTable from '../../components/Table'

import * as salesOrders from './salesOrdersRedux'

const SalesOrdersPage = (props) => {
  const {getSalesOrders, salesOrders} = props
  useEffect(() => {
    getSalesOrders()
  }, [getSalesOrders])

  const headRows = [
    {id: 'dbkey', numeric: true, label: '#'},
    {id: 'quote_number', numeric: true, disablePadding: false, label: 'Quote Number'},
    {id: 'attention', numeric: true, disablePadding: false, label: 'Attention Type'},
    {id: 'created_at', numeric: true, disablePadding: false, label: 'Create On'},
    {id: 'description', numeric: true, disablePadding: false, label: 'Description'},
  ]

  return (
    <>
      <PageTitle breadcrumbs={[]}>Sales Quotes</PageTitle>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Sales Orders List
          </Typography>
          <SalesOrdersFilter />
          <DataTable headRows={headRows} rows={salesOrders} />
        </CardContent>
      </Card>
    </>
  )
}

const mapStatesToProps = (state) => ({
  salesOrders: state.salesOrders.salesOrders,
})

export default connect(mapStatesToProps, salesOrders.actions)(SalesOrdersPage)
