import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Header extends Component {
  render() {

    return (
      <Navbar bg="light" variant="light">
      <Link to="/"><Navbar.Brand href="/">ClickBudget</Navbar.Brand></Link>
      <Nav className="mr-auto">
      <Link to="/"><Nav.Link href="/metrics">Metrics</Nav.Link></Link>
      <Link to="/setgoals"><Nav.Link href="/setgoals">Set Goals</Nav.Link></Link>
      <Link to="/categorize"><Nav.Link href="/categorize">Categorize</Nav.Link></Link>
      </Nav>
    </Navbar>
    );
    
  }
}


export default Header;