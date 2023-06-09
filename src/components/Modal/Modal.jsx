import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImage, tags, closeModal }) => {
  const handleOverlayClick = ev => {
    if (ev.target === ev.currentTarget) {
      closeModal('');
    }
  };

  useEffect(() => {
    const handleKeyDown = ev => {
      if (ev.key === 'Escape') {
        closeModal('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={largeImage} alt={tags} className={css.modalImage} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
