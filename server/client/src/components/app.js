import React from 'react';
import { Component } from 'react';

import SiteList from '../containers/site-list';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center my-3">
            <div>
              <h1>TimeBudget</h1>
            </div>
          </div>
        </div>

        <div className="container ">            
          <SiteList />
        </div>
        <div className="container">

        </div>
      </div>
    );
  }
}