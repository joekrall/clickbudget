import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, Form, Button, FormControl, Dropdown } from "react-bootstrap";
import { fetchSites, fetchCategories, updateCategory } from '../actions/index';


class CategoryList extends React.Component {

  constructor(props) {
    super(props);


    this.renderCategories = this.renderCategories.bind(this);
    this.renderSites = this.renderSites.bind(this);
    this.submitBudget = this.submitBudget.bind(this);
    this.clearBudget = this.clearBudget.bind(this);

    this.input = React.createRef();
  }

  componentDidMount() {
    this.props.fetchCategories();
 }


 submitBudget(budgetNumber, categoryId, event) {
  event.preventDefault();

  const firstFunction = async () => {
    await this.props.updateCategory(categoryId, null, budgetNumber)

    this.props.fetchCategories();
  }

  firstFunction();

}

clearBudget(categoryId, event) {
  event.preventDefault();

  const firstFunction = async () => {
    await this.props.updateCategory(categoryId, null, "CLEAR")

    this.props.fetchCategories();
  }

  firstFunction();
}

 renderSites(site) {
   return(
    <ListGroup.Item>{site}</ListGroup.Item>
   );
 }


  renderCategories(categoryData) {

    return (
      <ListGroup.Item >
        <Row>
          <Col md={2}><p>{categoryData.name} </p></Col>
          <Col md={2}><p>{categoryData.maxClicks}</p></Col>
          <Col md={5} className="d-block"><ListGroup variant="flush">{categoryData.sites.map(this.renderSites)}</ListGroup></Col>
          <Col md={3} className="d-flex">

          
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Set Budget
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={event => this.submitBudget(50, categoryData._id, event)}>
                  50
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={event => this.submitBudget(100, categoryData._id, event)}>
                  100
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={event => this.submitBudget(500, categoryData._id, event)}>
                  500
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={event => this.submitBudget(1000, categoryData._id, event)}>
                  1000
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={event => this.submitBudget(2000, categoryData._id, event)}>
                  2000
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>  
          <Button variant="danger" onClick={(e) => this.clearBudget(categoryData._id, e)}>
              Clear Budget
          </Button>
          </Dropdown>
        </Col>
        </Row>
     </ListGroup.Item>
    );
  }

  render() {
    return (
      <div>
        <br />
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col md={2}><h5>Category</h5></Col>
              <Col md={2}><h5>Budget</h5></Col>
              <Col md={5}><h5>Sites</h5></Col>
              <Col md={3}><h5>Actions</h5></Col>
            </Row>
          </ListGroup.Item>
          {this.props.categories.map(this.renderCategories)}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories, updateCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);