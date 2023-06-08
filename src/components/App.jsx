import Gallery from 'ImageGallery/ImageGallery';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Modal from './Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import fetchImages from './service/image-service';
import css from './App.module.css';
import React, { Component } from 'react';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    button: false,
    modal: false,
    largeImgURL: '',
    error: '',
    isEmpty: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits, error } = await fetchImages(query, page);
        if (!totalHits || error) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          button: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = query => {
    this.setState({ query, page: 1, images: [], error: '', button: false });
  };

  onClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = largeImgURL => {
    console.log(largeImgURL);
    this.setState({ modal: true, largeImgURL });
  };

  closeModal = () => {
    this.setState({ modal: false, largeImgURL: '' });
  };

  render() {
    const { images, button, modal, largeImgURL, isLoading, error, isEmpty } =
      this.state;
    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.onSubmit} />
        <Gallery images={images} openModal={this.openModal} />
        {button && <Button onClick={this.onClick} />}
        {modal && (
          <Modal largeImage={largeImgURL} closeModal={this.closeModal} />
        )}
        {error && (
          <ErrorMessage error="There are no images. Try again "></ErrorMessage>
        )}
        {isEmpty && (
          <p>
            'Sorry, there are no images matching your search query. Please try
            again.'
          </p>
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
