import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import './SearchBar.css';
import { fetchShows } from '../../Containers/TVShow/TVShowThunks';
import { Show } from '../../types';

const SearchBar: React.FC = () => {
  const [show, setShow] = useState<string>('');
  const dispatch = useAppDispatch();
  const shows = useAppSelector((state) => state.TVShow.shows as Show[]);
  const [debouncedShow, setDebouncedShow] = useState<string>(show);
  const [isAutocompleteActive, setIsAutoCompleteActive] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (show.trim()) {
        setDebouncedShow(show);
        setIsAutoCompleteActive(true);
      } else {
        setDebouncedShow('');
        setIsAutoCompleteActive(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [show]);

  useEffect(() => {
    if (debouncedShow) {
      dispatch(fetchShows(debouncedShow));
    };
  }, [debouncedShow, dispatch]);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.SearchBox')) {
        setIsAutoCompleteActive(false);
      }
    };

    if (isAutocompleteActive) {
      document.addEventListener('click', closeDropdown);
    }

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isAutocompleteActive]);

  return (
    <div className='d-flex align-items-center SearchBox'>
      <label htmlFor="search" className="form-label m-0 me-2 fs-3">Search for TV Show:</label>
      <input
        className="input-group-text w-75"
        type="text"
        id="search"
        value={show}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShow(e.target.value)}
        placeholder="Search TV Shows"
      />
      {isAutocompleteActive && (
        <div className='SearchAutocomplete'>
          {shows.map((show: Show) => (
            <div key={show.id}>
              <Link to={`/shows/${show.id}`} className='text-black text-decoration-none'>{show.name}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;