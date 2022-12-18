import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPicturesApi } from './fetchPictures';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { smoothlyScroll } from './smoothlyScroll';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query === '') return;
    setLoading(true);
    fetchPicturesApi(query, page)
      .then(data => {
        if (data.totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            { clickToClose: true }
          );
        }
        setItems(prevItems => [...prevItems, ...data.hits]);
        setTotalHits(data.totalHits);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Sorry, something went wrong...', {
          clickToClose: true,
        });
      })
      .finally(() => {
        if (page > 1) smoothlyScroll();
      });
  }, [query, page]);

  const handleFormSubmit = value => {
    if (value === query) return;
    setQuery(value);
    setPage(1);
    setItems([]);
  };

  const toggleModal = ImageURL => {
    selectedImage ? setSelectedImage(null) : setSelectedImage(ImageURL);
  };

  const loadMoreHandler = () => setPage(prevPage => prevPage + 1);

  return (
    <Layout>
      <Searchbar onSubmit={handleFormSubmit} />

      {items.length > 0 && (
        <ImageGallery images={items} onSelect={toggleModal} />
      )}
      {loading && <Loader />}
      {items.length > 0 && items.length < totalHits && (
        <Button onClick={loadMoreHandler} />
      )}
      {selectedImage !== null && (
        <Modal image={selectedImage} tags={query} onCloseModal={toggleModal} />
      )}
    </Layout>
  );
};
