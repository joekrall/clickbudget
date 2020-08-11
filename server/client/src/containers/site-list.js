import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, Button, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchSites, fetchCategories, updateCategory, updateSites, createCategory } from '../actions/index';


class SiteList extends React.Component {

  constructor(props) {
    super(props);


    // This binding is necessary to make `this` work in the callback
    this.addNewCategory = this.addNewCategory.bind(this);
    this.selectCategoryFromMenu = this.selectCategoryFromMenu.bind(this);
    this.renderSites = this.renderSites.bind(this);
    this.renderCategories = this.renderCategories.bind(this);

    this.input = React.createRef();
  }

  componentDidMount() {
    this.props.fetchCategories();

    this.props.fetchSites();
 }


  addNewCategory(event) {
    if (this.input.current.value) {
      if (this.input.current.value.length <= 25) {
      const firstFunction = async () => {
        await this.props.createCategory(this.input.current.value); 
        this.props.fetchSites();
        this.props.fetchCategories();
      }
      firstFunction();
      }
      else alert("Invalid entry")
    } else alert("No category name has been entered");
  }

  selectCategoryFromMenu = (categoryName, categoryId, siteName, event) => {
    event.preventDefault();

      // I need to add "none" to the database.
      const firstFunction = async () => {
        await this.props.updateSites(siteName, categoryName, "none"); 
        this.props.updateCategory(categoryId, siteName, null); // Rule count is null
        this.props.fetchSites();
        this.props.fetchCategories();
      }

      firstFunction();
  }

  renderCategories(categoryData) {

    return (
      <div>
      <Dropdown.Item 
        onClick={event => this.selectCategoryFromMenu(categoryData.name, categoryData._id, categoryData.siteName, event)}>
        {categoryData.name}
        </Dropdown.Item>
      </div>
    );
  }

  renderSites(siteData) {

    // Creating categories with this specific site on it
    let categoriesForThisItem = [];
    this.props.categories.map((category) => {

      let categoryForThisItem = {};
      categoryForThisItem["siteName"] = siteData._id;
      categoryForThisItem["_id"] = category._id;
      categoryForThisItem["name"] = category.name;

      categoriesForThisItem.push(categoryForThisItem);
    })

    if(siteData.category === "Uncategorized" || siteData.category === "(Uncategorized)" || siteData.category === "") {
    
    return (
      <ListGroup.Item className="list-group-item list-group-item-warning">
        <Row>
       <Col md={3}><p>{siteData._id}</p></Col>
       <Col md={2}><h5>{siteData.category}</h5></Col>
       <Col md={2}><h5>{siteData.visitCount} </h5></Col>
       <Col md={3}><p><Moment format="LT - MMM D, YYYY" local>{siteData.lastVisit}</Moment></p></Col>
       <Col md={2}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Set Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
             categoriesForThisItem.map(this.renderCategories)
            }
          </Dropdown.Menu>
        </Dropdown></Col>
        </Row>
     </ListGroup.Item>
    );
  } else {

    return (
      <ListGroup.Item >
        <Row>
        <Col md={3}><p>{siteData._id}</p></Col>
        <Col md={2}><h5>{siteData.category}</h5></Col>
        <Col md={2}><h5>{siteData.visitCount} </h5></Col>
        <Col md={3}><p><Moment format="LT - MMM D, YYYY" local>{siteData.lastVisit}</Moment></p></Col>
        <Col md={2}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Set Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
              categoriesForThisItem.map(this.renderCategories)
            }
          </Dropdown.Menu>
        </Dropdown></Col>
        </Row>
      </ListGroup.Item>
    );
  }
  }

  render() {
    return (
      <div>
      <br />
      <Row>
          <Col md={8}><h2>My Sites</h2></Col>
            
          <Col md={4}>
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <Button variant="info" onClick={this.addNewCategory}>Add Category</Button>
              </InputGroup.Prepend>
              <FormControl
                placeholder="E.g. Social, Games"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="text" 
                ref={this.input}
                // value={this.state.value}
                // onChange={this.handleChange.bind(this)}
              />

            </InputGroup>
          </Col>
        </Row>
      <br />
      <ListGroup>
        <ListGroup.Item>
        <Row>
          <Col md={3}><h3>URL</h3></Col>
          <Col md={2}><h3>Category</h3></Col>
          <Col md={2}><h3>Visit Count</h3></Col>
          <Col md={3}><h3>Last Visit</h3></Col>
          <Col md={2}><h3>Actions</h3></Col>
        </Row>
     </ListGroup.Item>
          {this.props.sites.map(this.renderSites)}</ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { sites: state.siteData.sites, categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSites, fetchCategories, updateCategory, updateSites, createCategory}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteList);