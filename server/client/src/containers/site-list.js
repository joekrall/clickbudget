import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSites } from '../actions/index';

class SiteList extends Component {

  componentDidMount() {
    this.props.fetchSites();
    
 }

  renderProducts(siteData) {
    
    return (
      <div className="col-md-4 pt-2 mb-4 border">
        <div className="row d-flex ">
          <div className="col-sm-9 mx-auto d-block">
            <div className="d-flex justify-content-between ">
            <p className="text-left mb-0">Category: {siteData.title} </p>
            <p className="text-right mb-0">${siteData.url}</p>
            </div>
          </div>
         </div>
      <h5 className="text-center">{productData.title}</h5>
  
      </div>
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
  return { sites: state.sites }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteList);