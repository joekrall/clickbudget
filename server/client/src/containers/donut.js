import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, Table} from 'react-bootstrap';
import { fetchSites, fetchCategories } from '../actions/index';
import 'moment';
import 'moment-timezone';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
var moment = require('moment');

class Donut extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            series: [],
            timeRange: ''
        }

        this.createSeries = this.createSeries.bind(this);
        this.createTimeRange = this.createTimeRange.bind(this);
    }

    componentDidMount() {

      const firstFetchSites = async () => {
        await this.props.fetchSites();
        secondFetchCategories();
      }

      const secondFetchCategories = async () => {
        await this.props.fetchCategories();
        thirdCreateSeries();
      }

      const thirdCreateSeries = async () => {
        await this.createSeries();
        fourthCreateTimeRange();
      }

      const fourthCreateTimeRange = async () => {
        await this.createTimeRange();
        this.highChartsRender();
      }

      firstFetchSites();
    }

    // Used to create donut chat labels
    createSeries() {
      let series = [{name: "Visits", data: []}];

      this.props.categoryCountArray.forEach((categoryObject) => {
        let dataSeriesObject = {};
        dataSeriesObject["name"] = categoryObject.name;
        dataSeriesObject["y"] = categoryObject.count;

        series[0].data.push(dataSeriesObject);
      })

      this.setState({series: series});
    }

    // Displayed below donut chart
    createTimeRange() {
      
      let parsedFirstVisitDay = moment(this.props.firstVisit).calendar();
      let parsedLastVisitDay = moment(this.props.lastVisit).calendar();
      
      let timeRange = parsedFirstVisitDay + " - " + parsedLastVisitDay;

      this.setState({timeRange: timeRange})
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
              text: 'Total visits:<br/>' + this.props.totalVisitCount, 
              style: {
                fontSize: '12px',
                fontWeight: 'bold',
              }
            },
            plotOptions: {
              pie: {
                dataLabels: {
                    format: '{point.name}: {point.percentage:.1f} %',
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
            <Row><Col className="text-center"><h6>Time range: {this.state.timeRange}</h6></Col></Row>
        </div>
         );

     }
}

function mapStateToProps(state) {

  return { sites: state.siteData.sites, 
    firstVisit: state.siteData.firstVisit,
    lastVisit: state.siteData.lastVisit,
    totalVisitCount: state.siteData.totalVisitCount, 
    categoryCountArray: state.siteData.categoryCountArray,
    categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites, fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Donut);
