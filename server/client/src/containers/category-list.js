import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchSites, fetchCategories } from '../actions/index';


class CategoryList extends Component {

  constructor(props) {
    super(props);

    this.renderCategories = this.renderCategories.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();

 }


  renderCategories(categoryData) {
    
    return (
      <ListGroup.Item>
        <p>{categoryData.name} </p>
        <p>All sites: {categoryData.sites}</p>
     </ListGroup.Item>
    );
  }

  render() {
    console.log(this.props)
    return (
      <div>

        <ListGroup>{this.props.categories.map(this.renderCategories)}</ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);