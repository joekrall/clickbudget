import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchSites, fetchCategories, updateCategory } from '../actions/index';


class CategoryList extends Component {

  constructor(props) {
    super(props);

    this.renderCategories = this.renderCategories.bind(this);
    this.renderSites = this.renderSites.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();

 }

 renderSites(site) {
   return(
    <ListGroup.Item>{site}</ListGroup.Item>
   );
 }


  renderCategories(categoryData) {
    
    return (
      <ListGroup.Item>
        <Row>
        <Col><p>{categoryData.name} </p></Col>
        <Col><ListGroup variant="flush">{categoryData.sites.map(this.renderSites)}</ListGroup></Col>
        <Col></Col>
        </Row>
     </ListGroup.Item>
    );
  }

  render() {
    console.log(this.props)
    return (
      <div>

        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col><h5>Category</h5></Col>
              <Col><h5>Sites</h5></Col>
              <Col><h5>Maximum Clicks Budget</h5></Col>
            </Row>
          </ListGroup.Item>
          {this.props.categories.map(this.renderCategories)}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories, updateCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);