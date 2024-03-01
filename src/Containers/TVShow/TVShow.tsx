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
    <div>
      <h1>{showDetails.name}</h1>
      {showDetails.image && <img src={showDetails.image.medium} alt={`Poster for ${showDetails.name}`} />}
      <p dangerouslySetInnerHTML={{ __html: showDetails.summary }} /> 
      <p>Genre: {showDetails.genres.join(' | ')}</p>
      <p>Type: {showDetails.type}</p>
      <p>Language: {showDetails.language}</p>
      <p>Status: {showDetails.status}</p>
      <p>Premiered: {showDetails.premiered}</p>
    </div>
  );
};

export default ShowDetailsPage;