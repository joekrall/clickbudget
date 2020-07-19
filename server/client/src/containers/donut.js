import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSites, fetchCategories } from '../actions/index';
import Highcharts from 'highcharts';

class Donut extends React.Component {
    constructor(props) {
        super(props);


        // So I'm not sure where to put this, but all I need is to group all the sites by category
        // and add up their total clicks and compare it to
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
              text: 'Total clicks' + this.props.totalVisitCount,
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
    
      const secondFunc = async () => {
        await  this.props.fetchSites();
        this.highChartsRender();
      }

      const firstFunc = async () => {
        await this.props.fetchCategories();
        secondFunc();
      }

      firstFunc();
    }

   	render() {
       	return (
            <div id="atmospheric-composition">
            </div>
       	);
   	}
}

function mapStateToProps(state) {
  return { sites: state.siteData.sites, 
    totalVisitCount: state.siteData.totalVisitCount, 
    categoryCounter: state.siteData.categoryCounter,
    categories: state.categories }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites, fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Donut);
