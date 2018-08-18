import firebase from 'firebase/app';
import 'firebase/storage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class PhotoCard extends Component {
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

    return url ? (
      <button
        type="button"
        className="pa0 bw0 lh0"
        onClick={() => this.props.transition('SELECT_PHOTO', { photo: { url, ...this.props } })}
      >
        <img src={url} alt={this.props.caption} />
      </button>
    ) : (
      false
    );
  }
}

PhotoCard.propTypes = {
  caption: PropTypes.string,
  name: PropTypes.string,
  transition: PropTypes.func.isRequired,
  postId: PropTypes.string,
  uid: PropTypes.string,
};

export default PhotoCard;
