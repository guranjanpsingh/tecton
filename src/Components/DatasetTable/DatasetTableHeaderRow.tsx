import React from 'react';
import { TableData } from '../../common/types';
import * as F from './DatasetTable.functions';
import Histogram from '../Graphs/Histogram';
import PieChart from '../Graphs/PieChart';
type DatasetTableHeaderRowProps = {
  data: TableData;
}
const DatasetTableHeaderRow = ({data}: DatasetTableHeaderRowProps): JSX.Element => {
  if (!data) {
    return <tr></tr>
  }
  return (
    <tr className="StatsRow">
      {
        data.types.map((type, idx) => {
          const values = data.rows.map(row => row[idx]);
          if (type === 'string') {
            let counts = F.getUniqueCounts(values);
            return (
              <td key={type + idx}>
                <div className="UniqueCount">
                  <PieChart value={Object.keys(counts).length} />
                </div>
              </td>
            )
          } else if (type === 'number') {
            const numberValues = values.map(x => Number(x));
            let counts = F.getNumericalCounts(numberValues);
            return (
              <td key={type + idx}>
                <Histogram values={numberValues} />
                <div className="Stats">
                  <span className="key">Min: </span>
                  <span className="value"> { counts.min } </span>
                </div>
                <div className="Stats">
                  <span className="key">Max: </span>
                  <span className="value"> { counts.max } </span>
                </div>
                <div className="Stats">
                  <span className="key">Mean: </span>
                  <span className="value"> { counts.mean } </span>
                </div>
                <div className="Stats">
                  <span className="key">Std Dev: </span>
                  <span className="value"> { counts.stdDev } </span>
                </div>
              </td>
            )
          } else {
            const numberValues = values.map(x => new Date(x).getTime());
            let counts = F.getNumericalCounts(numberValues);
            return (
              <td key={type + idx}>
                <Histogram values={numberValues} />
                <div className="Stats">
                  <span className="key">Min: </span>
                  <span className="value"> { new Date(counts.min).toDateString()} </span>
                </div>
                <div className="Stats">
                  <span className="key">Max: </span>
                  <span className="value"> { new Date(counts.max).toDateString()} </span>
                </div>
                <div className="Stats">
                  <span className="key">Mean: </span>
                  <span className="value"> { new Date(counts.mean).toDateString()} </span>
                </div>
              </td>
            )
          }
        })
      }
    </tr>
  )
}

export default DatasetTableHeaderRow;
