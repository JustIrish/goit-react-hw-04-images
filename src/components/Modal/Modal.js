import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, tags, onCloseModal }) => {
  useEffect(() => {
    const keyDownHandler = evt => {
      if (evt.code === 'Escape') {
        onCloseModal(null);
      }
    };
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [onCloseModal]);

  const onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) onCloseModal(null);
  };

  return createPortal(
    <Backdrop onClick={onBackdropClick}>
      <ModalWrap>
        <img src={image} alt={tags} />
      </ModalWrap>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
