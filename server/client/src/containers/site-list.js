import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import { fetchSites, fetchCategories } from '../actions/index';


class SiteList extends Component {

  constructor(props) {
    super(props);

    this.selectCategoryFromMenu = this.selectCategoryFromMenu.bind(this);
    this.renderSites = this.renderSites.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();

    this.props.fetchSites();
 }

  selectCategoryFromMenu = (categoryId, siteName, event) => {
    event.preventDefault();
    console.log("i was clicked and the site is " + siteName)
    // if (category === "(None)") {
    //   this.props.setCategory(null);
    // } else {
    //   this.props.setCategory(category);
    // }
  }

  renderCategories(categoryData) {

    return (
      <div>
      <Dropdown.Item 
        onClick={event => this.selectCategoryFromMenu(categoryData._id, categoryData.siteName, event)}>
        {categoryData.name}
        </Dropdown.Item>
      </div>
    );
  }

  renderSites(siteData) {

    let categoriesForThisItem = [];
    this.props.categories.map((category) => {
      let categoryForThisItem = {};
      categoryForThisItem["siteName"] = siteData._id;
      categoryForThisItem["_id"] = category._id;
      categoryForThisItem["name"] = category.name;
      console.log(categoryForThisItem)
      categoriesForThisItem.push(categoryForThisItem);
    })
    
    console.log(this)
    return (
      <ListGroup.Item>
        <p>{siteData._id}</p>
        <p>Visit Count in Last 24 Hours: {siteData.visitCount} </p>
        <p>Most recent visit: {siteData.lastVisit}</p>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Set Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
             categoriesForThisItem.map(this.renderCategories)
            }
          </Dropdown.Menu>
        </Dropdown>
     </ListGroup.Item>
    );
  }

  render() {
    console.log(this.props)
    return (
      <div>

        <ListGroup>{this.props.sites.map(this.renderSites)}</ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { sites: state.siteData.sites, categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites, fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteList);