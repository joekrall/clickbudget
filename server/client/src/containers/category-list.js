import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Form, Button, FormControl } from "react-bootstrap";
import { fetchSites, fetchCategories, updateCategory } from '../actions/index';


class CategoryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }

    this.handleChange = this.handleChange.bind(this);

    this.renderCategories = this.renderCategories.bind(this);
    this.renderSites = this.renderSites.bind(this);
    this.submitBudget = this.submitBudget.bind(this);
    this.clearBudget = this.clearBudget.bind(this);

  }

  componentDidMount() {
    this.props.fetchCategories();
  
 }

//  populateStateArray() {

//   // I want an object that looks like this

//   const stateObject = this.props.categories.reduce((obj, currentCategory) => {
//     obj[currentCategory._id] = "";
//     return obj;
//   }, {})

//   console.log(stateObject);
  
//   this.setState({stateObject: stateObject});

//  }

 handleChange(event) {
  this.setState({value: event.target.value});
  console.log(this.state.value)
}


 submitBudget(categoryId, event) {
   event.preventDefault();
    // if (typeof this.state.budgetNumber === "number" && this.state.budgetNumber >= 0) {
      console.log("submitBudget was clicked and the number is" + this.state.value + " and id is" + categoryId)
      //this.props.updateCategory(categoryId, null, this.state.budgetNumber)
    // } 
}

clearBudget(categoryId, event) {
   //this.props.updateCategory(categoryId, null, "")
   console.log("clearBudget was clicked and id is " + categoryId)

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
          <Col className="d-block"><ListGroup variant="flush">{categoryData.sites.map(this.renderSites)}</ListGroup></Col>
          <Col>
        <Form onSubmit={(e) => this.submitBudget(categoryData._id, e)}>
          <Form.Group controlId="submitBudget">
            <Form.Label>Enter maximum for category</Form.Label>
            <Form.Control type="number" placeholder="E.g. 100, 500" value={this.state.value} onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
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
  return { categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories, updateCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);