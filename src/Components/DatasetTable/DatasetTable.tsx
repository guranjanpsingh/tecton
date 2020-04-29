import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { TableData } from '../../common/types';
import DatasetTableHeaderRow from './DatasetTableHeaderRow';
import * as K from '../../common/constants';


import './DatasetTable.scss';

type DatasetTableProps = {
  data: TableData;
}

const renderTableRows = (rows: Array<Array<string>>): Array<JSX.Element> => {
  return rows.map((row, idx) => {

    return (
      <tr key={idx + row[0]}>
        {
          row.map(col => {
            return (
            <td key={idx + col}>{col}</td>
            )
          })
        }
      </tr>
    );
  })
}

const sortData = (data: Array<Array<string>>, sortColumnIndex: number, sortOrder: string, type: string) => {
  return data.sort((a, b) => {
    if (!a || !b || !a[sortColumnIndex] || !b[sortColumnIndex]) {
      return 1;
    }
    if (type === 'number') {
      if (sortOrder === K.sortOrder.Asc) {
        return Number(a[sortColumnIndex]) - Number(b[sortColumnIndex])
      } else {
        return Number(b[sortColumnIndex]) - Number(a[sortColumnIndex]);
      }
    } else if (type === 'date') {
      if (sortOrder === K.sortOrder.Asc) {
        return Number(new Date(a[sortColumnIndex])) - Number(new Date(b[sortColumnIndex]))
      } else {
        return Number(new Date(b[sortColumnIndex])) - Number(new Date(a[sortColumnIndex]));
      }
    } else {
      if (sortOrder === K.sortOrder.Asc) {
        return a[sortColumnIndex].localeCompare(b[sortColumnIndex]);
      } else {
        return b[sortColumnIndex].localeCompare(a[sortColumnIndex]);
      }
    }
  })
}

const getSortOrder = (colIdx: number, sortColumn: number, sortOrder: string) => {
  if (colIdx === sortColumn) {
    return sortOrder === K.sortOrder.Asc ? K.sortOrder.Desc : K.sortOrder.Desc;
  }
  return K.sortOrder.Asc;
}

const DatasetTable = ({data}: DatasetTableProps) => {
  const [sortColumn, setSortColumn] = useState(0);
  const [sortOrder, setSortOrder] = useState('ASC');
  data.rows = sortData(data.rows, sortColumn, sortOrder, data.types[sortColumn]);

  const renderTableHeader = (headers: Array<string>): Array<JSX.Element> => {
    return headers.map((header, idx) => {
      return (
        <th 
          key={header} 
          onClick={
            () => {
              setSortOrder(getSortOrder(idx, sortColumn, sortOrder))
              setSortColumn(idx);
          }
        }>
          { header }
        </th>
      )
    })
  }
  return (
    <div className="DatasetTable">
      <Table bordered striped responsive>
        <thead>
          <tr className="header">
            { renderTableHeader(data.header) }
          </tr>
        </thead>
        <thead>
          <DatasetTableHeaderRow data={data} />
        </thead>
        <tbody>
            { renderTableRows(data.rows) }
        </tbody>
      </Table>
    </div>
  )
}

export default DatasetTable;
