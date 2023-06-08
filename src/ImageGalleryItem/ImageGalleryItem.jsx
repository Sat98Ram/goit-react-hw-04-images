import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const GalleryItem = ({ src, tags, openModal }) => {
  return (
    <li className={css.galleryItem} onClick={openModal}>
      <img src={src} alt={tags} className={css.galleryImage} />
    </li>
  );
};

export default GalleryItem;

GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
