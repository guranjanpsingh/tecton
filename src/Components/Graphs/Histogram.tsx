import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

require("highcharts/modules/histogram-bellcurve")(Highcharts);

type HistogramProps = {
  values: Array<number>;
}

const Histogram = ({values}: HistogramProps) => {
  const options = {
    chart: {
      backgroundColor: '#1B2A41'
    },
    title: {
        text: ''
    },
    plotOptions: {
      histogram: {
        binsNumber: 10,
        borderColor: '#1B2A41'
      },
    },

    xAxis: [
      {
        title: { text: '' },
        alignTicks: false,
        lineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0
      }, 
      {
        title: { text: '',
        lineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0
      },
      }
    ],

    yAxis: [
      {
        title: { text: '' },
        lineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0
      }, {
        title: { text: '' },
        lineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0
      }
    ],
    legend: {
      itemStyle: {
        color: '#A3A1B4'
      }
    },
    series: [{
      name: 'Histogram',
      type: 'histogram',
      baseSeries: 's1',
      zIndex: -1,
      color: '#A3A1B4'
    }, {
        name: 'Data',
        type: 'scatter',
        data: values,
        id: 's1',
        marker: {
            radius: 1.5
        },
        visible: false,
        showInLegend: false, 
    }]
  }
  return (
    <div style={{height: '100%', width: '100%'}}>
      <HighchartsReact
        containerProps={{ style: { width: "100%"} }}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

export default Histogram;
