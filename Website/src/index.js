import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './animate.css';
import 'react-notifications/lib/notifications.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './pages/App';
import { Provider } from 'react-redux';
import store from './redux/store';

class Index extends Component {
  render() {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <Fragment>
            <Router>
              <Switch>
                <Route path="/" component={App} />
              </Switch>
            </Router>
          </Fragment>
        </Provider>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
