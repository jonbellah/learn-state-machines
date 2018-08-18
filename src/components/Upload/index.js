import UploadIcon from 'assets/icons/Upload';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { generateID } from 'lib/helpers';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { State, withStatechart } from 'react-automata';
import Dropzone from 'react-dropzone';
import Transition from 'react-transition-group/Transition';
import * as styles from './styles';

const duration = 200;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  pointerEvents: 'none',
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1, pointerEvents: 'auto' },
};

export const statechart = {
  initial: 'closed',
  states: {
    closed: {
      onEntry: ['clearData'],
      on: {
        TOGGLE: 'open',
      },
    },
    open: {
      on: {
        TOGGLE: 'closed',
        SUBMIT: 'loading',
      },
    },
    loading: {
      onEntry: ['upload'],
      on: {
        SUCCESS: 'closed',
        FAIL: 'error',
      },
    },
    error: {
      on: {
        TRY_AGAIN: 'loading',
      },
    },
  },
};

export class UploadComponent extends Component {
  state = {
    files: [],
    caption: '',
  };

  onDrop = files => {
    this.setState({
      files,
    });
  };

  clearData = () => {
    this.setState({
      files: [],
      caption: '',
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  upload = () => {
    const { caption, files } = this.state;
    const file = files[0];
    const user = firebase.auth().currentUser;
    const postId = generateID();

    const storage = firebase
      .storage()
      .ref()
      .child(`${this.props.user.uid}/images/${postId}/${file.name}`);

    storage
      .put(file)
      .then(() =>
        firebase
          .database()
          .ref('/posts')
          .push({
            caption,
            date: new Date().toISOString(),
            email: user.email,
            hearts: '',
            name: file.name,
            postId,
            uid: user.uid,
            username: user.displayName,
          }),
      )
      .then(() => this.props.transition('SUCCESS'));
  };

  button = () => (
    <button
      className={`${
        styles.button
      } flex flex-row items-center fw7 ttu f7 ph3 pv2 br2 mr3`}
      type="button"
      onClick={() => this.props.transition('SUBMIT')}
    >
      Post
    </button>
  );

  disabledButton = () => (
    <button
      className={`${
        styles.button
      } flex flex-row items-center fw7 ttu f7 ph3 pv2 br2 mr3 o-50`}
      type="button"
      disabled
    >
      Uploading...
    </button>
  );

  modal = inProp => (
    <Transition in={inProp} timeout={duration}>
      {state => (
        <div
          className="fixed w-100 top-0 left-0 bottom-0 bg-black-80 center overflow-auto z-5"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="bg-white w-90 mw7 mv4 center pa4 br2 shadow-05">
            {this.state.files.length > 0 ? (
              this.state.files.map(f => (
                <img
                  src={f.preview}
                  key={f.name.toString()}
                  alt="Uploaded file"
                  className="mb3"
                />
              ))
            ) : (
              <Dropzone
                className={`${
                  styles.dropzone
                } mb3 flex items-center justify-center`}
                activeClassName={styles.dropzoneActive}
                onDrop={this.onDrop}
              >
                <p>
                  Try dropping a photo here, or click to select one to upload.
                </p>
              </Dropzone>
            )}

            <div className="w-100 flex flex-column">
              <textarea
                value={this.state.caption}
                onChange={this.handleChange}
                name="caption"
                className="w-100 input-reset br2 mb3 b--moon-gray pa3"
                placeholder="Write a caption&hellip;"
                rows="4"
              />
            </div>

            <State
              value="open"
              render={visible => (visible ? this.button() : null)}
            />
            <State
              value="loading"
              render={visible => (visible ? this.disabledButton() : null)}
            />
          </div>
          <button
            onClick={() => this.props.transition('TOGGLE')}
            type="button"
            className={`${styles.closeBtn} fixed top-1 right-1 white f1 fw1`}
          >
            &times;
          </button>
        </div>
      )}
    </Transition>
  );

  render() {
    return (
      <div>
        <button
          type="button"
          className={`${
            styles.button
          } flex flex-row items-center fw7 ttu f7 ph3 pv2 br2 mr3`}
          onClick={() => this.props.transition('TOGGLE')}
        >
          <UploadIcon cssClass="mr2 icon-l" color="#fff" />
          Upload
        </button>

        <State
          value={['open', 'loading']}
          render={visible => this.modal(visible)}
        />
      </div>
    );
  }
}

UploadComponent.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
  transition: PropTypes.func.isRequired,
};

export default withStatechart(statechart)(UploadComponent);
