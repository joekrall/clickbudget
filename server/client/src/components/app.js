import React from 'react';
import { Component } from 'react';
import { Row, Col, Container } from "react-bootstrap";

import Header from './header';
import MainView from './main-view';
import SiteList from '../containers/site-list';
import CategoryList from '../containers/category-list'
import { Switch, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <Container id="app_view">
        <Switch>
          <Route exact path={"/"} component={MainView} />
          <Route exact path={"/setbudgets"} component={CategoryList} />
          <Route exact path={"/categorize"} component={SiteList} />
        </Switch>
        </Container>
      </div>
    );
  }
}