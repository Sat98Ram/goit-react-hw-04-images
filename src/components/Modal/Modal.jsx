import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ev => {
    if (ev.key === 'Escape') {
      this.props.closeModal('');
    }
  };

  handleOverlayClick = ev => {
    if (ev.target === ev.currentTarget) {
      this.props.closeModal('');
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img
            src={this.props.largeImage}
            alt={this.props.tags}
            className={css.modalImage}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
