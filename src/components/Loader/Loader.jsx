import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alighItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
