import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, Button, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchSites, fetchCategories, updateCategory, updateSites, createCategory } from '../actions/index';


class SiteList extends Component {

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
      const firstFunction = async () => {
        await this.props.createCategory(this.input.current.value); 
        this.props.fetchSites();
        this.props.fetchCategories();
      }
      firstFunction();
    } else alert("No category name has been entered");
  }

  selectCategoryFromMenu = (categoryName, categoryId, siteName, event) => {
    event.preventDefault();

      // I need to add "none" to the database.
      const firstFunction = async () => {
        await this.props.updateSites(siteName, categoryName, categoryId); 
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
    
    return (
      <ListGroup.Item>
        <Row>
       <Col><p>{siteData._id}</p></Col>
       <Col><p>{siteData.category}</p></Col>
       <Col><p>{siteData.visitCount} </p></Col>
       <Col><p><Moment local>{siteData.lastVisit}</Moment></p></Col>
       <Col>
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

  render() {
    return (
      <div>
      <br />
      <Row>
          <Col></Col>
          <Col></Col>

          <Col>
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
          <Col><h5>URL</h5></Col>
          <Col><h5>Category</h5></Col>
          <Col><h5>Visit Count</h5></Col>
          <Col><h5>Most Recent Vist</h5></Col>
          <Col><h5>Actions</h5></Col>
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