import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Form, Button, FormControl, Dropdown } from "react-bootstrap";
import { fetchSites, fetchCategories, updateCategory } from '../actions/index';


class CategoryList extends Component {

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
  alert("You budgeted" + budgetNumber);

}

clearBudget(categoryId, event) {
  event.preventDefault();

  const firstFunction = async () => {
    await this.props.updateCategory(categoryId, null, "CLEAR")

    this.props.fetchCategories();
  }

  firstFunction();
  alert("You cleared the budget");
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
          <Col><p>{categoryData.name} </p></Col>
          <Col className="d-block"><ListGroup variant="flush">{categoryData.sites.map(this.renderSites)}</ListGroup></Col>
          <Col>
          <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
              onClick={event => this.submitBudget(250, categoryData._id, event)}>
              250
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={event => this.submitBudget(500, categoryData._id, event)}>
              500
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={event => this.submitBudget(1000, categoryData._id, event)}>
              1000
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
        {/* <Form onSubmit={(e) => this.submitBudget(categoryData._id, e)}>
          <Form.Group>
            <Form.Label>Enter maximum for category</Form.Label>
            <Form.Control type="number" placeholder="E.g. 100, 500" ref={this.input}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> */}
        <br />
        <Button variant="danger" onClick={(e) => this.clearBudget(categoryData._id, e)}>
            Clear Budget
        </Button>
          <br />
          <br />
          <p>Current Budget: {categoryData.maxClicks}</p>
        </Col>
        </Row>
     </ListGroup.Item>
    );
  }

  render() {
    return (
      <div>

        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col><h5>Category</h5></Col>
              <Col><h5>Sites</h5></Col>
              <Col><h5>Maximum Clicks</h5></Col>
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