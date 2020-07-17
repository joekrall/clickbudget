import React from 'react';
import { Component } from 'react';
import { Row, Col, Container } from "react-bootstrap";

import Donut from '../containers/donut';
import SiteList from '../containers/site-list';

export default class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-center my-3">
              <h1>ClickBudget</h1>
          </Row>
        </Container>

        <Container>
          <Donut />            
          <SiteList />

        </Container>
      </div>
    );
  }
}