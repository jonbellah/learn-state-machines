import Byline from 'components/Byline';
import Hearts from 'components/Hearts';
import firebase from 'firebase/app';
import 'firebase/storage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles';

export default class Photo extends Component {
  state = {
    url: false,
  };

  componentDidMount = () => {
    firebase
      .storage()
      .ref()
      .child(`${this.props.uid}/images/${this.props.postId}/${this.props.name}`)
      .getDownloadURL()
      .then(url => this.setState({ url }));
  };

  render() {
    const { url } = this.state;

    return (
      <div className={`${styles.container} mb4`}>
        <header className="pa3 flex items-center">
          <Link to={`/${this.props.username}`} className="no-underline">
            <Byline className="w-100 flex items-center" {...this.props} />
          </Link>
        </header>
        <div>{url ? <img src={url} alt={this.props.caption} /> : false}</div>
        <div className="flex items-center pa3 justify-between">
          <p className="db f6 ma0">
            {this.props.caption}
          </p>
          <Hearts id={this.props.id} hearts={this.props.hearts} className="flex flex-row items-center c-mid-gray" />
        </div>
      </div>
    );
  }
}

Photo.propTypes = {
  caption: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  postId: PropTypes.string,
  uid: PropTypes.string,
  url: PropTypes.string,
  username: PropTypes.string,
  hearts: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.bool),
    PropTypes.string,
  ]),
};
