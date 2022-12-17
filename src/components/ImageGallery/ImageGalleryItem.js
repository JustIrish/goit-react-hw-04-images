import PropTypes from 'prop-types';
import { ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, tags, largeImageURL },
  onSelect,
}) => {
  return (
    <ItemImage
      src={webformatURL}
      alt={tags}
      onClick={() => onSelect(largeImageURL)}
      loading="lazy"
    />
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
   
  onSelect: PropTypes.func.isRequired,
};
