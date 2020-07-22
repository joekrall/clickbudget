import React from "react";

// // components
import Donut from '../containers/donut';
import BudgetTable from '../containers/budget-table';

import { Container, Row, Col } from "react-bootstrap";

class MainView extends React.Component {
  render() {

    return (
     <div>
     <Container>
       <Row className="mt-3">
       <Col md={4}>
         <h1>Welcome!</h1>
         <br />
         <h4>Visualize, categorize, 
           and budget your browsing history!</h4>
         <br />
         <h6>Active Budgets</h6>
           <BudgetTable />
       </Col>
       <Col md={8}>
        <Donut />
       </Col>
       </Row>
     </Container>
   </div>
    );

}
}

export default MainView;