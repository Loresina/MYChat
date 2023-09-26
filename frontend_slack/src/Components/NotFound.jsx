import React from 'react';
import bubbles from './95.jpg';

const NotFound = () => (
  <div className="container-fluid">
    <div className="row justify-content-center pt-5">
      <div className="col-sm-4 text-center">
        <img src={bubbles} alt="Страница не найдена" className="img-fluid" />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти
          <a href="/">на главную страницу</a>
        </p>
      </div>
    </div>
  </div>
);

export default NotFound;
