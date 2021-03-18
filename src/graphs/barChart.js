/* eslint-disable */
import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default class BarChart extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            series: [],
            options: {
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded'
                },
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: props.title,
                align: 'left'
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: [],
              },
              yaxis: {
                title: {
                  text: '$ (thousands)'
                }
              },
              fill: {
                opacity: 1
              },
            },
          };
        }
        static getDerivedStateFromProps(props,state){
          return {
            series: props.series,
            options: {
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded'
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: props.labels,
              },

              fill: {
                opacity: 1
              },
            },
          }
        }
        render() {
          const { options, series } = this.state;
          return (
              <>
              {
                series.length > 0 ?
                <div id="bar_chart">
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                  />
                  </div>
                  :
                  null
              }
              </>
          );
        }
      }
