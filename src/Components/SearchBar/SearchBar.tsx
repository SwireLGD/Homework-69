import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchShows } from '../../Containers/TVShow/TVShowSlice';
import { Link } from 'react-router-dom';

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
    <div>
      <input
        type="text"
        value={show}
        onChange={(e) => setShow(e.target.value)}
        placeholder="Search TV Shows"
      />
      <div>
        {debouncedShow && shows.map((show) => (
          <div key={show.id}>
            <Link to={`/shows/${show.id}`}>{show.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
