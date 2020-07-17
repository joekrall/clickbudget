import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSites } from '../actions/index';
import Highcharts from 'highcharts';

class Donut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Gases',
                data: [
                    {
                      name: 'Argon',
                      y: 0.9,
                    },
                    {
                      name: 'Nitrogen',
                      y: 78.1,
                    },
                    {
                      name: 'Oxygen',
                      y: 20.9,
                    },
                    {
                      name: 'Trace Gases',
                      y: 0.1,
                    }
                ]
            }]
        }
    }

    highChartsRender() {
        Highcharts.chart({
            chart: {
              type: 'pie',
              renderTo: 'atmospheric-composition'
            },
            title: {
              verticalAlign: 'middle',
              floating: true,
              text: 'Earth\'s Atmospheric Composition',
              style: {
                fontSize: '10px',
              }
            },
            plotOptions: {
              pie: {
                dataLabels: {
                    format: '{point.name}: {point.percentage:.1f} %'
                },
                innerSize: '70%'
              }
            },
            series: this.state.series
        });
    }

    componentDidMount() {
        this.highChartsRender();
    }

   	render() {
       	return (
            <div id="atmospheric-composition">
            </div>
       	);
   	}
}

function mapStateToProps(state) {
  console.log(state.siteData)
  return { sites: state.siteData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Donut);
