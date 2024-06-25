import React from 'react';

function NotFound(props) {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-6 text-secondary">{props.title}</h1>
        <p className="display-9 lead text-secondary">{props.message}</p>
      </div>
    </div>
  );
}

export default NotFound;