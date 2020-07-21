import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, Table} from 'react-bootstrap';
import { fetchSites, fetchCategories } from '../actions/index';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

class Donut extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            series: [],

        }

        this.createSeries = this.createSeries.bind(this);
    }

    componentDidMount() {


      const thirdFunc = async () => {
        await this.createSeries();
        this.highChartsRender();
      }

      const secondFunc = async () => {
        await this.props.fetchCategories();
        thirdFunc();
      }

      const firstFunc = async () => {
        await this.props.fetchSites();
        secondFunc();
      }

      firstFunc();
    }

    createSeries() {
      let series = [{name: "Clicks", data: []}];

      this.props.categoryCountArray.forEach((categoryObject) => {
        let dataObject = {};
        dataObject["name"] = categoryObject.name;
        dataObject["y"] = categoryObject.count;

        series[0].data.push(dataObject);
      })

      this.setState({series: series});
    }

 


    highChartsRender() {
        Highcharts.chart({
            chart: {
              type: 'pie',
              renderTo: 'clicks-by-category'
            },
            title: {
              verticalAlign: 'middle',
              floating: true,
              text: 'Total visits: ' + this.props.totalVisitCount,
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



   	render() {

       	return (
          <div>
              <div id="clicks-by-category">
            </div>
        </div>
         );

     }
}

function mapStateToProps(state) {

  return { sites: state.siteData.sites, 
    totalVisitCount: state.siteData.totalVisitCount, 
    categoryCountArray: state.siteData.categoryCountArray,
    categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites, fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Donut);
