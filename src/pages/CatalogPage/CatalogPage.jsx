import React from 'react';
import Filters from '../../components/Filters/Filters.jsx';
import CarList from '../../components/CarList/CarList.jsx';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton.jsx';

function CatalogPage() {
  return (
    <div>
      <Filters />
      <CarList />
      <LoadMoreButton />
    </div>
  );
}

export default CatalogPage;
