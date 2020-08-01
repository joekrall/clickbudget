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

      const fourthFunc = async () => {
        await this.createTimeRange();
        this.highChartsRender();
      }

      const thirdFunc = async () => {
        await this.createSeries();
        fourthFunc();
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
      let series = [{name: "Visits", data: []}];

      this.props.categoryCountArray.forEach((categoryObject) => {
        let dataObject = {};
        dataObject["name"] = categoryObject.name;
        dataObject["y"] = categoryObject.count;

        series[0].data.push(dataObject);
      })

      this.setState({series: series});
    }

    createTimeRange() {
      
      let timeRange = "";

      let parsedFirstVisitTime = moment(this.props.firstVisit).format('h:mm a');
      let parsedLastVisitTime = moment(this.props.lastVisit).format('h:mm a');;
      let parsedFirstVisitDay = moment(this.props.firstVisit).calendar();
      let parsedLastVisitDay = moment(this.props.lastVisit).calendar();

      // create four parts to the visit. FirstVisitTime, LastVisitTime, FirstVisitDay, LastVisitDay
      // Create a conditional for the Day part.
      
      if (parsedFirstVisitDay === parsedLastVisitDay) {
        timeRange = parsedFirstVisitDay + ", " + parsedFirstVisitTime + " - " + parsedLastVisitTime;
      } else {
        timeRange = parsedFirstVisitDay + ", " +  parsedFirstVisitTime + " - " + parsedLastVisitDay + ", " + parsedLastVisitTime;
      }

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
              text: 'Total visits: ' + this.props.totalVisitCount, 
              style: {
                fontSize: '12px',
              }
            },
            subtitle: {
              text:  "Time frame: " + this.state.timeRange + "\n",
              style: {
                fontSize: '16px',
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
