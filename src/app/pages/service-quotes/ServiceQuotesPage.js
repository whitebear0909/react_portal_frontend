/* eslint-disable no-restricted-imports */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Card, CardContent, Typography} from '@material-ui/core'

import {PageTitle} from '../../../_metronic/layout/core'
import ServiceOrdersFilter from './ServiceOrdersFilter'
import DataTable from '../../components/Table'

import * as serviceOrders from './serviceOrdersRedux'

const ServiceOrdersPage = (props) => {
  const {getServiceOrders, serviceOrders} = props
  useEffect(() => {
    getServiceOrders()
  }, [getServiceOrders])

  const headRows = [
    {id: 'dbkey', numeric: true, label: '#'},
    {id: 'quote_number', numeric: true, label: 'Quote Number'},
    {id: 'created_at', numeric: true, disablePadding: false, label: 'Created On'},
    {id: 'attention', numeric: true, disablePadding: false, label: 'Attention'},
  ]

  return (
    <>
      <PageTitle breadcrumbs={[]}>Sales Quotes</PageTitle>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Service Orders List
          </Typography>
          <ServiceOrdersFilter />
          <DataTable headRows={headRows} rows={serviceOrders} />
        </CardContent>
      </Card>
    </>
  )
}

const mapStatesToProps = (state) => ({
  serviceOrders: state.serviceOrders.serviceOrders,
})

export default connect(mapStatesToProps, serviceOrders.actions)(ServiceOrdersPage)
