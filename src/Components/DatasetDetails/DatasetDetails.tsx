import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { TableData, Dataset} from '../../common/types';
import DatasetTable from '../DatasetTable/DatasetTable';
import _ from 'lodash';
import GridLoader from 'react-spinners/GridLoader'
//@ts-ignore
import { readString } from 'react-papaparse';
import { css } from '@emotion/core';
import moment from 'moment';
import './DatasetDetails.scss';

type DatasetDetailsProps = {
  dataset: Dataset;
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const parseDataTypes = (data: Array<Array<string>>, numCols: number): Array<string> => {
  const types: Array<string> = [];
  //@ts-ignore
  window.moment = moment;
  for (let i = 0; i < numCols; i++) {
    let current = data[0][i];
    if (_.isNumber(Number(current)) && !_.isNaN(Number(current))) {
      types.push('number');
    } else if (moment(current).isValid()) {
      types.push('date');
    } else {
      types.push('string');
    }
  }
  return types;
}

export const parseDataset = (data: string): TableData => {
  const json = readString(data);
  const rows = get(json, 'data', []);
  const parsedData: TableData = {
    header: rows.length > 0 ? rows[0] : [],
    rows: rows.length > 1 ? rows.slice(1) : [],
    types: []
  };
  parsedData.types =  parseDataTypes(parsedData.rows, parsedData.header.length);
  return parsedData;
}

const DatasetDetails = ({dataset}: DatasetDetailsProps): JSX.Element => {
  const [data, setData] = useState({header: [], rows: [], types: []} as TableData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(dataset.url).then(async resp =>{
      const data = await resp.text();
      setData(parseDataset(data));
      setLoading(false);
    })
  }, [dataset.url])

  if (loading) {
    return (
      <div className="loading">
        <GridLoader size={50} css={override} color={'#324A5F'}/>
      </div>
    );
  }
  return (
    <div className="DatasetDetails">
      <DatasetTable data={data} />
    </div>
  );
}

export default DatasetDetails;
