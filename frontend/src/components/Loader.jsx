import React from 'react';

const Loader = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--color-primary)',
      color: 'var(--color-sage)',
      fontFamily: 'var(--font-primary)',
      letterSpacing: '0.2em',
      fontSize: '0.8rem',
      textTransform: 'uppercase'
    }}>
      Loading Environment...
    </div>
  );
};

export default Loader;
