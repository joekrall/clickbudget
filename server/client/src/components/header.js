import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Header extends Component {
  render() {

    return (
      <Navbar bg="info" variant="dark">
        <Navbar.Brand href="/">ClickBudget</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/setbudgets">Set Budgets</Nav.Link>
            <Nav.Link href="/categorize">View My Sites</Nav.Link>
      </Nav>
    </Navbar>
    );
    
  }
}


export default Header;