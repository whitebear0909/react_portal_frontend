/* eslint-disable no-restricted-imports */
import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
} from '@material-ui/core'

import SalesQuoteActions from '../pages/sales-quotes/Actions'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

function SortableTableHead(props) {
  const {order, orderBy, onRequestSort, headRows} = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headRows.map((row) => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

SortableTableHead.propTypes = {
  headRows: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCell: {
    textOverflow: 'ellipsis',
    maxWidth: 300,
    width: 300,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}))

function tableRowActions(type, props) {
  if (type === 'sales-quotes') return <SalesQuoteActions {...props} />
  return null
}

export default function EnhancedTable(props) {
  const {rows, headRows} = props
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState(headRows[0].id)
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby='tableTitle'>
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headRows={headRows}
          />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role='checkbox'
                    tabIndex={-1}
                    key={row.index}
                  >
                    {headRows.map((headRow) => {
                      if (headRow.id !== 'actions') {
                        const className = headRow.id === 'description' ? classes.tableCell : ''
                        return (
                          <TableCell className={className} align='right'>
                            {row[headRow.id]}
                          </TableCell>
                        )
                      }

                      return (
                        <TableCell align='right'>
                          {tableRowActions(headRow.type, {quote: row})}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow style={{height: 49 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}
