import PropTypes from 'prop-types';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { CiSearch } from 'react-icons/ci';
import {
  SearchbarHeader,
  SearchForm,
  SearchInput,
  SearchBtn,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleValueChange = evt => setSearchValue(evt.currentTarget.value);

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchValue.trim() === '') {
      Notify.warning('Please, enter a query to search!', {
        clickToClose: true,
      });
      return;
    }
    const value = searchValue.toLocaleLowerCase().trim();
    onSubmit(value);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <CiSearch size={23} />
        </SearchBtn>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={handleValueChange}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        ></SearchInput>
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
