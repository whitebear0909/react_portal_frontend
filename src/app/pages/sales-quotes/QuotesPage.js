/* eslint-disable no-restricted-imports */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Card, CardContent, Typography} from '@material-ui/core'

import {PageTitle} from '../../../_metronic/layout/core'
import QuotesFilter from './QuotesFilter'
import DataTable from '../../components/Table'

import * as quotes from './quotesRedux'

const QuotesPage = (props) => {
  const {getQuotes, quotes} = props
  useEffect(() => {
    getQuotes()
  }, [getQuotes])

  const headRows = [
    {id: 'dbkey', numeric: true, label: '#'},
    {id: 'quote_number', numeric: true, disablePadding: false, label: 'Quote Number'},
    {id: 'attention', numeric: true, disablePadding: false, label: 'Attention Type'},
    {id: 'created_at', numeric: true, disablePadding: false, label: 'Create On'},
    {id: 'description', numeric: true, disablePadding: false, label: 'Description'},
    {id: 'actions', numeric: true, disablePadding: false, label: 'Action', type: 'sales-quotes'},
  ]
  return (
    <>
      <PageTitle breadcrumbs={[]}>Sales Quotes</PageTitle>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Sales Quotes List
          </Typography>
          <QuotesFilter />
          <DataTable headRows={headRows} rows={quotes} />
        </CardContent>
      </Card>
    </>
  )
}

const mapStatesToProps = (state) => ({
  quotes: state.quotes.quotes,
})

export default connect(mapStatesToProps, quotes.actions)(QuotesPage)
