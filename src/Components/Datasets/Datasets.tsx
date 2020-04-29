import React, { useEffect, useState } from 'react';
import { DatasetsUrl } from '../../common/constants';
import { Dataset } from '../../common/types';
import DatasetDetails from '../DatasetDetails/DatasetDetails';

import './Datasets.scss'

const renderDataSets = (
  datasets: Array<Dataset>, 
  active: Dataset, 
  setActive: (dataset: Dataset) => void
  ): Array<JSX.Element> => {
  return (
    datasets.map(dataset => {
      return (
        <div 
          className={'DatasetName' + (dataset.name === active.name ? ' active' : '')}
          onClick={ () => {setActive(dataset)}}
          key={dataset.url}>
          { dataset.name }
        </div>
      )
    })
  )
}

const Datasets = (): JSX.Element => {
  const [active, setActive] = useState({} as Dataset);

  const [datasets, setDatasets] = useState([] as Array<Dataset>);

  useEffect(() => {
    fetch(DatasetsUrl).then(async response => {
      const data = await response.json();
      setDatasets((data as Array<Dataset>));
      setActive(data[0]);
    });
  }, []);

  let dataSetList = renderDataSets(datasets, active, (dataset: Dataset): void => { setActive(dataset)});

  return (
    <div className="Datasets">
      <div className="List">
        { dataSetList }
      </div>
      <div className="Details">
        <DatasetDetails dataset={active} />
      </div>
    </div>
  );
}

export default Datasets;
