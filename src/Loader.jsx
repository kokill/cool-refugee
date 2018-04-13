import React from 'react';
import Loader from 'react-loaders';
import 'loaders.css/loaders.min.css';
import './Loader.css';

export default () => (
  <div className="Loader">
    <Loader type="ball-beat" active size="md" />
  </div>
);
