import React from 'react';
import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb mb-3">
      <ol className="breadcrumb-list">
        <li><a href="/">Home</a></li>
        {pathnames.map((name, index) => (
          <li key={name}>
            {index === pathnames.length - 1 ? name : <a href={`/${pathnames.slice(0, index + 1).join('/')}`}>{name}</a>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
