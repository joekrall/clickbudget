import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { fetchSites } from '../actions/index';

class SiteList extends Component {

  componentDidMount() {
    this.props.fetchSites();
    
 }

  renderSites(siteData) {
    
    return (

      <ListGroup.Item>
        <p>Name: {siteData.title} </p>
        <p>{siteData.url}</p>
        <p>Visit Count in Last 24 Hours: {siteData.visitCount} </p>
     </ListGroup.Item>
    );
  }

  render() {
    return (
      <div>
        <ListGroup>{this.props.sites.map(this.renderSites)}</ListGroup>
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