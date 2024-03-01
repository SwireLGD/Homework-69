import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchShows } from '../../Containers/TVShow/TVShowSlice';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [show, setShow] = useState('');
  const dispatch = useAppDispatch();
  const shows = useAppSelector((state) => state.TVShow.shows);
  const [debouncedShow, setDebouncedShow] = useState(show);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (show.trim()) {
        setDebouncedShow(show);
      } else {
        setDebouncedShow('');
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [show]);

  useEffect(() => {
    if (debouncedShow) {
      dispatch(fetchShows(debouncedShow));
    }
  }, [debouncedShow, dispatch]);

  return (
    <div className='d-flex align-items-center SearchBox'>
      <label htmlFor="search" className="form-label m-0 me-2 fs-3">Search for TV Show:</label>
      <input
        className="input-group-text w-75"
        type="text"
        id="search"
        value={show}
        onChange={(e) => setShow(e.target.value)}
        placeholder="Search TV Shows"
      />
      <div className='SearchAutocomplete'>
        {debouncedShow && shows.map((show) => (
          <div key={show.id}>
            <Link to={`/shows/${show.id}`} className='text-black text-decoration-none'>{show.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
