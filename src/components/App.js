import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPicturesApi } from './fetchPictures';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { smoothlyScroll } from './smoothlyScroll';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    items: [],
    totalHits: 0,
    loading: false,
    selectedImage: null,
  };

  componentDidUpdate(_, prevState) {
    const { query: newQuery, page: newPage } = this.state;

    if (prevState.query !== newQuery || prevState.page !== newPage) {
      this.setState({ loading: true });
      fetchPicturesApi(newQuery, newPage)
        .then(data => {
          if (data.totalHits === 0) {
            Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.',
              { clickToClose: true }
            );
          }
          this.setState(state => ({
            items: [...state.items, ...data.hits],
            totalHits: data.totalHits,
            loading: false,
          }));
        })
        .catch(error => console.log(error));
    }
    if (newPage > 1) smoothlyScroll();
  }

  handleFormSubmit = value => {
    if (this.state.query !== value) {
      this.setState({
        query: value,
        page: 1,
        items: [],
      });
    }
    return;
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = ImageURL => {
    if (this.state.selectedImage) this.setState({ selectedImage: null });
    else this.setState({ selectedImage: ImageURL });
  };

  render() {
    const { query, items, totalHits, loading, selectedImage } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {items.length > 0 && (
          <ImageGallery images={items} onSelect={this.toggleModal} />
        )}
        {loading && <Loader />}
        {items.length > 0 && items.length < totalHits && (
          <Button onClick={this.loadMoreHandler} />
        )}
        {selectedImage !== null && (
          <Modal
            image={selectedImage}
            tags={query}
            onCloseModal={this.toggleModal}
          />
        )}
      </Layout>
    );
  }
}
