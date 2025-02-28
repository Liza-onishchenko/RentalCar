import CarDetailsPage from '../pages/CarDetailsPage/CarDetailsPage.jsx';
import CatalogPage from '../pages/CatalogPage/CatalogPage.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import Header from './Header/Header.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
