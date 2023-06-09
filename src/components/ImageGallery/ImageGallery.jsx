import GalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const Gallery = ({ images, openModal }) => {
  return (
    <div className={css.galleryWrapper}>
      <ul className={css.gallery}>
        {images.map(image => (
          <GalleryItem
            src={image.webformatURL}
            tags={image.tags}
            key={image.id}
            openModal={() => openModal(image.largeImageURL)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Gallery;

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
