import React, { Component } from 'react';
import { logIn, logOut } from '../redux/actions';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmptyObj } from '../utils';

class Header extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <header>
        <h1 className="header__title">
          <Link to="/">Anti CRISPR Predict</Link>
        </h1>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="https://github.com/dungnguyenhuu/Bioinformatics" target="_blank" activeClassName="active">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { logIn, logOut })(Header));
