import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Form, Button, FormControl } from "react-bootstrap";
import { fetchSites, fetchCategories, updateCategory } from '../actions/index';


class CategoryList extends Component {

  constructor(props) {
    super(props);

    this.state = { values: [] };

    this.renderCategories = this.renderCategories.bind(this);
    this.renderSites = this.renderSites.bind(this);
    this.submitBudget = this.submitBudget.bind(this);
    this.clearBudget = this.clearBudget.bind(this);

  }

  componentDidMount() {
    this.props.fetchCategories();
 }


 handleChange(index, event) {
  let values = {...this.state.values};
  values[index] = event.target.value;
  this.setState({ values });
}


 submitBudget(categoryId, index, event) {
   event.preventDefault();
    // if (typeof this.state.budgetNumber === "number" && this.state.budgetNumber >= 0) {
  console.log("submitBudget was clicked and the number is" + this.state.values[index] + " and id is" + categoryId)
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

    const index = this.state.values.length;

    this.setState(prevState => ({ values: [...prevState.values, '']}))

    return (
      <ListGroup.Item >
        <Row>
          <Col><p>{categoryData.name} </p></Col>
          <Col className="d-block"><ListGroup variant="flush">{categoryData.sites.map(this.renderSites)}</ListGroup></Col>
          <Col>
        <Form onSubmit={(e) => this.submitBudget(categoryData._id, index, e)}>
          <Form.Group controlId={"submitBudget" + index}>
            <Form.Label>Enter maximum for category</Form.Label>
            <Form.Control type="number" placeholder="E.g. 100, 500" value={this.state.values[index]} onChange={this.handleChange.bind(this, index)}/>
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