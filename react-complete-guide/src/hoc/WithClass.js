import React from 'react';

// function that returns a functional component
const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props}

      />
    </div>
  );
};

export default withClass;
