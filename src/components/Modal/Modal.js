import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal(null);
    }
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) this.props.onCloseModal(null);
  };

  render() {
    const { image, tags } = this.props;

    return createPortal(
      <Backdrop onClick={this.onBackdropClick}>
        <ModalWrap>
          <img src={image} alt={tags} />
        </ModalWrap>
      </Backdrop>,
      modalRoot
    );
  }
}
