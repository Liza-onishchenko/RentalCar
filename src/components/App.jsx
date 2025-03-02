import CarDetailsPage from '../pages/CarDetailsPage/CarDetailsPage.jsx';
import CatalogPage from '../pages/CatalogPage/CatalogPage.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import Header from './Header/Header.jsx';
import { Routes, Route } from 'react-router-dom';
import { selectIsLoading } from '../redux/cars/selector.js';
import { useSelector } from 'react-redux';
import Loader from './Loader/Loader.jsx';

function App() {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      <Header />
      <Loader isLoading={isLoading} size={96} className="global" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
