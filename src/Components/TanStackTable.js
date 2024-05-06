import React, { useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import fakeData from '../DummyData.json';
import '../StyleSheets/Table.css'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function TanStackTable() {

      // variable data to store fake data
      const data = useMemo(() => fakeData, [])

      /** @type import('@tanstack/react-table').ColumnDef<any> */

      // creating columns
      const columns = [

            {
                  header: 'ID',
                  accessorKey: 'id',
                  enableSorting: false, // disable sorting for this column
            },
            {
                  header: 'Employee-Name',
                  accessorKey: 'first_name'
            },
            {
                  header: 'Last-Name',
                  accessorKey: 'last_name'
            },
            {
                  header: 'Email',
                  accessorKey: 'email'
            },
            {
                  header: 'Gender',
                  accessorKey: 'gender'
            },
            {
                  header: 'Postal Code',
                  accessorKey: 'postal_code'
            }
      ]


      const [sorting, setSorting] = useState([]);

      const [filtering, setFiltering] = useState("");

      // creating react table using useReactTable 
      const table = useReactTable({
            data, columns
            , getCoreRowModel: getCoreRowModel()
            , getPaginationRowModel: getPaginationRowModel()
            , getSortedRowModel: getSortedRowModel()
            , getFilteredRowModel: getFilteredRowModel()
            , state: {
                  sorting: sorting,
                  globalFilter: filtering,
            },
            onSortingChange: setSorting,
            onGlobalFilterChange: setFiltering

      })

      return (
            <>
                  <div className='container'>
                        <br />
                        <h2> <b> Tan Stack Table </b></h2>
                        <br />
                        <h4>Search:⬇️</h4>
                        <input className='input-fields' type='text' placeholder='Filter Records' value={filtering} onChange={e => setFiltering(e.target.value)} />
                        <br />
                        <br />
                        <table>
                              {
                                    table.getHeaderGroups().map(headerGroup => (
                                          <tr key={headerGroup.id}>
                                                {headerGroup.headers.map(header =>
                                                      <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                                            {
                                                                  flexRender(header.column.columnDef.header, header.getContext())
                                                            }
                                                            {/* Sorting according to ascending and descending order */}
                                                            {
                                                                  { asc: '⤴️', desc: '⤵️' }[header.column.getIsSorted()]
                                                            }
                                                      </th>)}
                                          </tr>
                                    ))
                              }

                              <tbody>
                                    {table.getRowModel().rows.map(row => (
                                          <tr key={row.id}>
                                                {row.getVisibleCells().map(cell => (
                                                      <td key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                      </td>
                                                ))}
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
                  <div>
                        {/* Pagination */}
                        <button className='pagination-btn' onClick={() => table.setPageIndex(0)}> First Page [1]</button>
                        <button className='pagination-btn' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}> <SkipPreviousIcon className='icon-set' /> Prev Page</button>

                        <button className='pagination-btn' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}> Next Page <SkipNextIcon className='icon-set' /></button>
                        <button className='pagination-btn' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page [10] </button>

                  </div>
            </>
      )
}

export default TanStackTable