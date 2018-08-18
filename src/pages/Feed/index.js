import Photo from 'components/Photo';
import firebase from 'firebase/app';
import 'firebase/database';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Action, withStatechart } from 'react-automata';

const PER_PAGE = 5;

export const statechart = {
  initial: 'start',
  states: {
    start: {
      on: {
        READY: 'fetching',
      },
      onEntry: 'attach',
    },
    listening: {
      on: {
        SCROLL: {
          fetching: {
            cond: ({ scrollPercentage }) => scrollPercentage > 0.9,
          },
        },
      },
    },
    fetching: {
      on: {
        SUCCESS: {
          listening: {
            cond: ({ posts }) => Object.keys(posts).length % PER_PAGE === 0,
          },
          finish: {
            cond: ({ posts }) => Object.keys(posts).length % PER_PAGE > 0,
          },
        },
        ERROR: {
          listening: {
            actions: 'error',
          },
        },
      },
      onEntry: ['fetch'],
    },
    finish: {
      onEntry: 'detach',
    },
  },
};

class FeedComponent extends Component {
  componentWillUnmount = () => this.detach();

  handleScroll = () => {
    const body = document.getElementsByTagName('body')[0];
    const scrollPercentage = body.scrollTop / (body.scrollHeight - body.clientHeight);

    this.props.transition('SCROLL', { scrollPercentage });
  };

  attach = () => {
    window.addEventListener('scroll', this.handleScroll);
    this.props.transition('READY');
  };

  detach = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  fetch = () => {
    const { lastDate, page } = this.props;
    const currentPage = page || 1;

    firebase
      .database()
      .ref('/posts')
      .orderByChild('date')
      .startAt(lastDate)
      .limitToLast(PER_PAGE * currentPage)
      .once('value')
      .then(snapshot => {
        const posts = snapshot.val();
        const newPosts = Object.entries(posts)
          .reverse()
          .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
        const keys = newPosts !== null ? Object.keys(newPosts) : [];
        const lastScrolledDate = keys.length >= 1 ? keys[keys.length - 1].date : '';

        return this.props.transition('SUCCESS', prevState => ({
          posts: prevState.posts
            ? Object.assign(prevState.posts, newPosts)
            : newPosts,
          lastDate: lastScrolledDate,
          page: prevState.page ? prevState.page + 1 : 2,
        }));
      });
  };

  render() {
    const { posts } = this.props;

    return (
      <div className="mw8 w-90 center pb6">
        <main className="w-two-thirds center">
          {posts !== null
          && posts !== undefined
          && Object.keys(posts).length > 0
            ? Object.keys(posts).map(key => (
              <Photo key={key} id={key} {...posts[key]} />
            ))
            : false}
          <footer id="actions">
            <Action show="fetch">Loading...</Action>
            <Action show="error">Something went wrong</Action>
          </footer>
        </main>
      </div>
    );
  }
}

FeedComponent.propTypes = {
  posts: PropTypes.objectOf(PropTypes.object),
  transition: PropTypes.func.isRequired,
  machineState: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }),
  page: PropTypes.number,
  lastKey: PropTypes.string,
  lastDate: PropTypes.string,
};

export default withStatechart(statechart)(FeedComponent);
