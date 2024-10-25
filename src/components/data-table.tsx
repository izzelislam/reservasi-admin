import { flexRender, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { getCoreRowModel } from '@tanstack/react-table'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'


type Props = {
  data: any
  columns: any
}

const DataTable:React.FC<Props> = ({data, columns}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState<any>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getExpandedRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter
  })

  return (
    <div className='flex flex-col gap-4 '>
      {/* searach boc */}
      <div className='max-w-md flex gap-2 items-center border border-gray-200 rounded-lg focus-within:border-gray-400'>
        <Icon icon="solar:magnifer-bold-duotone" className='text-2xl mr-1 ml-4' />
        <input
          className='w-full h-full px-3 py-2 focus:outline-none rounded-e-lg dark:bg-transparent'
          value={globalFilter ?? ''}
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          placeholder="Search..."
        />
      </div>
      {/* end search box */}

      {/* table */}
      <div className='w-full bg-white border border-gray-200 rounded-lg bg-clip-border'>
        <table className='w-full divide-y divide-gray-200 dark:divide-gray-400 rounded-lg'>
          <thead className='bg-gray-50 dark:bg-gray-800'>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => ( // map over the headerGroup headers array
                    <th key={header.id} colSpan={header.colSpan} className="p-6  py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-400 dark:bg-gray-900">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center'
                              : '',
                            onClick: header.column.getToggleSortingHandler()
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          
                          {
                            header.column.getCanSort() && (
                              <Icon icon="solar:sort-horizontal-bold-duotone" className='rotate-90 ml-2 text-lg' />
                            )
                          }
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              )
            })}
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-600'>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* end table */}

      {/* pagination */}
      <div className='flex justify-between  items-center'>
        <select 
          className="select select-bordered min-w-10 focus:outline-none"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <div className="join">
          <button 
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="join-item btn">«
          </button>
          <button className="join-item btn">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button 
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="join-item btn">»
          </button>
        </div>
      </div>
      {/* end pagination */}
    </div>
  )
}

export default DataTable