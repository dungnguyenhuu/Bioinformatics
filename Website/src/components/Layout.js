import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../redux/actions';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import apiRoutes from '../routes/apis';
import { isEmptyObj } from '../utils';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <Header />

        <div style={{ minHeight: '71.5vh' }}>{children}</div>

        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { logIn, logOut })(Layout));
