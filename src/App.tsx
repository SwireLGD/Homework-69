import { Route, Routes } from 'react-router-dom';
import SearchBar from './Components/SearchBar/SearchBar';
import ShowDetailsPage from './Containers/TVShow/TVShow';
import PageNotFound from './Containers/PageNotFound/PageNotFound';
import Header from './Components/Header/Header';
import HomePage from './Containers/HomePage/HomePage';

function App() {
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <div className='container-fluid mt-3'>
        <SearchBar />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/shows/:id" element={<ShowDetailsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
    </>
  );
}

export default App;