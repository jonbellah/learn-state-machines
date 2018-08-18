import Arrow from 'assets/icons/Arrow';
import Logo from 'assets/icons/Logo';
import Upload from 'components/Upload';
import { Consumer } from 'lib/context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { State, withStatechart } from 'react-automata';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import * as styles from './styles';

export const statechart = {
  initial: 'closed',
  states: {
    closed: {
      on: {
        TOGGLE_MENU: 'open',
      },
    },
    open: {
      on: {
        TOGGLE_MENU: 'closed',
        CLOSE_MENU: 'closed',
      },
    },
  },
};

export class HeaderComponent extends Component {
  componentDidMount = () => {
    document.addEventListener('click', this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.transition('CLOSE_MENU');
    }
  };

  closeMenu = () => this.props.transition('CLOSE_MENU');

  renderSubmenu = (user, logout) => (
    <ul className={styles.subMenu}>
      <li>
        <Link
          to={`/${user.displayName}`}
          className="db fw5 tr f6 c-mid-gray ph3 pv2 no-underline bw0"
          onClick={() => this.closeMenu()}
        >
          View Profile
        </Link>
      </li>
      <li>
        <button
          onClick={e => logout(e)}
          type="button"
          className="fw5 tr f6 c-mid-gray ph3 pv2 no-underline bw0"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  render() {
    const menuState = this.props.machineState
      ? this.props.machineState.value
      : 'closed';

    return (
      <Consumer>
        {({ user, logout }) => (
          <header
            id="masthead"
            className={`${styles.header} bg-white w-100 mb4 bb b--light-gray`}
          >
            <div className="flex flex-row items-center justify-between center mw8 w-90">
              <div className="w-third">
                <Link to="/" className="no-underline">
                  <Logo />
                </Link>
              </div>
              <div className="flex flex-row items-center justify-end w-third">
                <Upload user={user} />

                <div className={styles.dropdown} ref={this.setWrapperRef}>
                  <button
                    className={`bw0 flex items-center pa3 ${menuState}`}
                    type="button"
                    onClick={() => this.props.transition('TOGGLE_MENU')}
                  >
                    <Gravatar
                      email={user.email}
                      size={64}
                      default="mp"
                      className={`${styles.avatar} br-100 mr2`}
                    />
                    <Arrow color="#777" />
                  </button>

                  <State
                    value="open"
                    render={visible =>
                      visible ? this.renderSubmenu(user, logout) : false
                    }
                  />
                </div>
              </div>
            </div>
          </header>
        )}
      </Consumer>
    );
  }
}

HeaderComponent.propTypes = {
  transition: PropTypes.func,
  machineState: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default withStatechart(statechart)(HeaderComponent);
