import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchShowDetails } from './TVShowSlice';
import Loader from '../../Components/Loader/Loader';

const ShowDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const showDetails = useAppSelector((state) => state.TVShow.selectedShow);

  useEffect(() => {
    if (id) {
      dispatch(fetchShowDetails(parseInt(id)));
    }
  }, [id, dispatch]);
  if (!showDetails) {
    return <div><Loader /></div>;
  }

  return (
    <div className='d-flex justify-content-around mt-5 border border-2 rounded-3 m-3 p-3'>
      {showDetails.image && <img src={showDetails.image.medium} alt={`Poster for ${showDetails.name}`} />}
      <div className='w-75'>
        <h1>{showDetails.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: showDetails.summary }} /> 
        <p>Genre: {showDetails.genres.join(' | ')}</p>
        <p>Type: {showDetails.type}</p>
        <p>Language: {showDetails.language}</p>
        <p>Status: {showDetails.status}</p>
        <p>Premiered: {showDetails.premiered}</p>
      </div>
    </div>
  );
};

export default ShowDetailsPage;