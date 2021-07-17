import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './pages/App';
import { logIn } from './redux/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(connect(null, { logIn })(Main));
