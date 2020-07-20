import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSites, fetchCategories } from '../actions/index';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

class Donut extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            series: []
        }

        this.createSeries = this.createSeries.bind(this);
    }

    createSeries() {
      let series = [{name: "Clicks", data: []}];

      this.props.categoryCountArray.forEach((categoryObject) => {
        let dataObject = {};
        dataObject["name"] = categoryObject.name;
        dataObject["y"] = categoryObject.count;

        // this.props.categories.forEach((cat) => {
        //   if (cat.name === categoryObject.name) {
        //     console.log(cat.name + " is equal to " + categoryObject.name)
        //     if (cat.maxClicks !== null) {
        //       dataObject["name"] = categoryObject.name + " (Budget: " + cat.maxClicks + ")";
        //       console.log("cat.maxClicks is equal to " + cat.maxClicks)
        //       console.log("categoryObject.count is equal to " + categoryObject.count)
        //       if (cat.maxClicks < categoryObject.count) {
        //       dataObject["color"] = "#FF0000";
        //       }
        //     }
        //   }
        // })

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
              text: 'Total clicks: ' + this.props.totalVisitCount,
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

      const thirdFunc = async () => {
        console.log("fetch Categories was called")
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

   	render() {
       	return (
            <div id="clicks-by-category">
            </div>
       	);
   	}
}

function mapStateToProps(state) {
  console.log(state.siteData)

  return { sites: state.siteData.sites, 
    totalVisitCount: state.siteData.totalVisitCount, 
    categoryCountArray: state.siteData.categoryCountArray,
    categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites, fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Donut);
