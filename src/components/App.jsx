import Gallery from 'components/ImageGallery/ImageGallery';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Modal from './Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import fetchImages from './service/image-service';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);
  const [modal, setModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState('');
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    fetchImages(query, page)
      .then(data => {
        if (!data.totalHits) {
          setEmpty(true);
          return;
        }
        setImages(prevState => [...prevState, ...data.hits]);
        setButton(page < Math.ceil(data.totalHits / 12));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError('');
    setButton(false);
    setEmpty(false);
  };

  const onClick = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = largeImgURL => {
    setLargeImage(largeImgURL);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setLargeImage('');
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={onSubmit} />
      <Gallery images={images} openModal={openModal} />
      {button && <Button onClick={onClick} />}
      {modal && <Modal largeImage={largeImage} closeModal={closeModal} />}
      {error && <ErrorMessage error={error}></ErrorMessage>}
      {empty && (
        <p>
          Sorry, there are no images matching your search query. Please try
          again.
        </p>
      )}
      {loading && <Loader />}
    </div>
  );
};
