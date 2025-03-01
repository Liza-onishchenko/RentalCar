const formatMileage = mileage => {
  if (!mileage && mileage !== 0) return 'N/A';
  return `${mileage.toLocaleString()} km`;
};

export { formatMileage };
