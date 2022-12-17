import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryList, ImageItem } from './ImageGallery.styled';

export const ImageGallery = ({ images, onSelect }) => {
  return (
    <ImageGalleryList className="gallery">
      {images.map(image => (
        <ImageItem key={image.id}>
          <ImageGalleryItem image={image} onSelect={onSelect} />
        </ImageItem>
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
