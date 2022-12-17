import PropTypes from 'prop-types';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CiSearch } from 'react-icons/ci';
import {
  SearchbarHeader,
  SearchForm,
  SearchInput,
  SearchBtn,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  handleValueChange = evt => {
    this.setState({ searchValue: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { searchValue } = this.state;

    if (searchValue.trim() === '') {
      Notify.warning('Please, enter a query to search!', {
        clickToClose: true,
      });
      return;
    }
    this.props.onSubmit(searchValue);
  };

  render() {
    const { searchValue } = this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <CiSearch size={23} />
          </SearchBtn>
          <SearchInput
            type="text"
            value={searchValue}
            onChange={this.handleValueChange}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></SearchInput>
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
