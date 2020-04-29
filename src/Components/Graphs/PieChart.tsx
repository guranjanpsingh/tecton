import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

require("highcharts/modules/histogram-bellcurve")(Highcharts);

type HistogramProps = {
  value: number;
}

const PieChart = ({value}: HistogramProps) => {
  const options = {
    chart: {
      backgroundColor: '#1B2A41'
    },
    title: {
      text: ''
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    color: '#1B2A41',
                    textOutline: 0
                },
                formatter: function(this: any) {
                  console.log(this.y);
                  return `${this.y} unique values`;
                }
            },
            colors: ['#A3A1B4'],
            borderColor: '#1B2A41'
        }
    },
    series: [{
      name: 'Unique Values',
      type: 'pie',
      data: [value],
      id: 's1',
      color: '#A3A1B4'
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

export default PieChart;
