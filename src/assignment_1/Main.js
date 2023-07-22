import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <h1>Explore Cat Breeds and Countries</h1>
      <h3>
        <Link to="/table">View Cat Breeds and Countries in Table</Link>
      </h3>
      <h3>
        <Link to="/tree">View Cat Breeds and Countries in Tree</Link>
      </h3>
    </div>
  );
}

export default Main;
