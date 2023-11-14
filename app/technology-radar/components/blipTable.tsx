'use client'
// This implementation is heavily based on the example within the TanStack
// source code:
// https://github.com/TanStack/table/blob/a1e9732e6fc3446a2ae80db72a1f2b46a5c11e46/examples/react/filters/src/main.tsx#
import React from 'react';

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  Column,
  ColumnFiltersState,
  FilterFn,
  Table,
  createColumnHelper
} from '@tanstack/react-table';

import {
  RankingInfo,
  rankItem
} from '@tanstack/match-sorter-utils'


import { jsonToRadar } from '@/lib/radar/io/json';
import radarJson from '@/public/radar.json'
import { Blip } from '@/lib/radar/models/blip';

import {
  quadrantConfig,
  technologyRadarBlipUrl,
  technologyRadarQuadrantUrl
} from '../config';
import Link from 'next/link';
import { DebouncedInput } from '@/components/debounced-input';

const radar = jsonToRadar(radarJson);

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const equalityFilter: FilterFn<any> = (row, columnId, value) => {
  return row.getValue(columnId) == value;
}

export default function BlipTable() {
  const columns = createColumnDefs();
  const data = createDataMemo()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="prose min-w-[100%]">
      <table className="w-[95%] mx-auto">
        {TableHead(table)}
        {TableBody(table)}
      </table>
    </div>
  )
}

function TableHead(table: Table<Blip>) {
  return <thead>
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => {
          return (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null :
                flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              {header.column.getCanFilter() ? (
                <div>
                  <Filter column={header.column} showUniqueValueCount={header.column.id == 'title'} />
                </div>
              ) : null}
            </th>
          );
        })}
      </tr>
    ))}
  </thead>;
}

function TableBody(table: Table<Blip>) {
  return <tbody>
    {table
      .getRowModel()
      .rows.map(row => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => {
              return (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
  </tbody>;
}

// Create the React Memo to cache the blips array between renders
function createDataMemo() {
  return React.useMemo(
    () => Array.from(radar.blips.values()),
    []
  );
}

// Create the columns for the table
function createColumnDefs() {
  const columnHelper = createColumnHelper<Blip>();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor(
        "title",
        {
          header: 'Title',
          cell: ({ row, getValue }) => (
            <span>
              <Link href={technologyRadarBlipUrl({ quadrantId: row.original.quadrantId, refName: row.original.refName })}>
                {getValue()}
              </Link>
            </span>
          ),
          filterFn: fuzzyFilter
        }
      ),
      columnHelper.accessor(
        "id",
        {
          header: "Id",
          filterFn: equalityFilter
        }
      ),
      columnHelper.accessor(
        "quadrantId",
        {
          header: "Quadrant",
          cell: ({ getValue }) => (
            <span>
              <Link href={technologyRadarQuadrantUrl({ quadrantId: getValue() })}>
                {quadrantConfig(getValue())?.title}
              </Link>
            </span>
          ),
          filterFn: fuzzyFilter
        }
      ),
      columnHelper.accessor(
        "ring",
        {
          header: "Ring",
          cell: ({ getValue }) => <span>{getValue().toUpperCase()}</span>,
          filterFn: fuzzyFilter
        }
      ),
    ],
    []
  );
  return columns;
}

// Define an <input> element that acts as a column filter input widget
function Filter({
  column,
  showUniqueValueCount
}: {
  column: Column<any, unknown>
  showUniqueValueCount: boolean
}) {
  const columnFilterValue = column.getFilterValue() as string;
  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... ` + (showUniqueValueCount ? `(${column.getFacetedUniqueValues().size})` : '')}
        className="w-36 border shadow rounded"
      />
      <div className="h-1" />
    </>
  )
}
