import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSites } from '../actions/index';

class SiteList extends Component {

  componentDidMount() {
    this.props.fetchSites();
    
 }

  renderSites(siteData) {
    
    return (
      <li>

        <p className="text-left mb-0">Name: {siteData.title} </p>
        <p className="text-right mb-0">${siteData.url}</p>
        <p className="text-left mb-0">Visit Count in Last 24 Hours: {siteData.visitCount} </p>
      </li>
    );
  }

  render() {
    return (
      <div>
        <ul className="site row ">{this.props.sites.map(this.renderSites)}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { sites: state.siteData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteList);