import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = ({ isLoading, size = 96, color = 'grey' }) => {
  if (!isLoading) return null;

  return (
    <div className={css.loaderContainer}>
      <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        width={size}
        visible={true}
      />
    </div>
  );
};

export default Loader;
