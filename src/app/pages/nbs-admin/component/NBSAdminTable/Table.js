import React from 'react'
import {useTable, useFilters, useSortBy} from 'react-table'
import {KTSVG} from '../../../../../_metronic/helpers'

function Table({columns, data}) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  function DefaultColumnFilter({column: {filterValue, preFilteredRows, setFilter}}) {
    const count = preFilteredRows.length

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

  const filterTypes = React.useMemo(
    () => ({
      includes: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]

          return rowValue !== undefined
            ? String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase())
            : true
        })
      },
      name: (rows, id, filterValue) => {
        const ret = rows.filter((row) => {
          const rowValue = row.values[id].name

          return rowValue !== undefined
            ? String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase())
            : true
        })
        return ret
      },
    }),
    []
  )

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useSortBy
  )

  const renderSortIcon = (column) => {
    if (!column.canSort || column.disableSortBy) return null
    if (!column.isSorted) {
      return <KTSVG path='/media/icons/duotone/Navigation/Arrows-v.svg' />
    }
    if (column.isSortedDesc) {
      return <KTSVG path='/media/icons/duotone/Navigation/Down-2.svg' />
    }
    return <KTSVG path='/media/icons/duotone/Navigation/Up-2.svg' />
  }

  // Render the UI for your table
  return (
    <table
      {...getTableProps()}
      className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'
    >
      <thead>
        {headerGroups.map((group) => {
          return (
            <tr {...group.getHeaderGroupProps()} className='fw-bolder text-muted'>
              {group.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps([
                      {className: column.className},
                      column.getSortByToggleProps(),
                    ])}
                  >
                    {column.render('Header')}
                    {renderSortIcon(column)}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
