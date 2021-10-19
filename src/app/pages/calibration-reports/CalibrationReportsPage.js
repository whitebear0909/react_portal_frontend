/* eslint-disable no-restricted-imports */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Card, CardContent, Typography} from '@material-ui/core'

import {PageTitle} from '../../../_metronic/layout/core'
import CalibrationReportsFilter from './CalibrationReportsFilter'
import DataTable from '../../components/Table'

import * as calibrationReports from './calibrationReportsRedux'

const CalibrationReportsPage = (props) => {
  const {getCalibrationReports, calibrationReports} = props
  useEffect(() => {
    getCalibrationReports()
  }, [getCalibrationReports])

  const headRows = [
    {id: 'dbkey', numeric: true, label: 'Seq'},
    {id: 'dateofcal', numeric: true, disablePadding: false, label: 'Date of Cal'},
    {id: 'created_at', numeric: true, disablePadding: false, label: 'Create On'},
  ]

  return (
    <>
      <PageTitle breadcrumbs={[]}>Sales Quotes</PageTitle>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Calibration Reports List
          </Typography>
          <CalibrationReportsFilter />
          <DataTable headRows={headRows} rows={calibrationReports} />
        </CardContent>
      </Card>
    </>
  )
}

const mapStatesToProps = (state) => ({
  calibrationReports: state.calibrationReports.calibrationReports,
})

export default connect(mapStatesToProps, calibrationReports.actions)(CalibrationReportsPage)
