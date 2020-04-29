import React from 'react';
import Table from 'react-bootstrap/Table';
import { TableData } from '../../common/types';
import DatasetTableHeaderRow from './DatasetTableHeaderRow';

import './DatasetTable.scss';

type DatasetTableProps = {
  data: TableData;
}

const renderTableHeader = (headers: Array<string>): Array<JSX.Element> => {
  return headers.map(header => {
    return (
      <th key={header}>{ header }</th>
    )
  })
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



const DatasetTable = ({data}: DatasetTableProps) => {
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
