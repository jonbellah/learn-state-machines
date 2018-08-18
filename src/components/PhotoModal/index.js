import Hearts from 'components/Hearts';
import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './styles';

const PhotoModal = props => (
  <div className="fixed w-100 top-0 left-0 bottom-0 bg-black-80 center overflow-auto db">
    <div className="modal bg-white w-90 mw7 mv4 center shadow-05">
      <img src={props.url} className="mb3" alt="demo" />

      <div className="w-100 flex flex-row ph4 pt3 pb4">
        <div className="mb3 w-80">{props.caption}</div>
        <div className="w-20">
          <Hearts
            id={props.id}
            hearts={props.hearts}
            className="flex flex-row items-center justify-end c-mid-gray w-100"
          />
        </div>
      </div>
    </div>

    <button
      type="button"
      className={`${styles.closeBtn} fixed top-1 right-1 white f1 fw1`}
      onClick={() => props.transition('EXIT_PHOTO')}
    >
      &times;
    </button>
  </div>
);

PhotoModal.propTypes = {
  transition: PropTypes.func.isRequired,
  caption: PropTypes.string,
  url: PropTypes.string,
  hearts: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.bool),
    PropTypes.string,
  ]),
  id: PropTypes.string,
};

export default PhotoModal;
