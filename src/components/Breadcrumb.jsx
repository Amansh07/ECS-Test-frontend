import React from 'react';
import { useLocation } from 'react-router-dom';
import frontslash from "../assets/frontslash.svg";
import "./Breadcrumb.css";

const Breadcrumb = ({ customPath = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbs = customPath.length > 0
    ? customPath
    : pathnames.map((name, index) => ({
        label: name.charAt(0).toUpperCase() + name.slice(1),
        path: `/${pathnames.slice(0, index + 1).join('/')}`
      }));

  return (
    <nav className="registration-breadcrumb" aria-label="Breadcrumb">
      <ul className="flex items-center space-x-2">
        <li>
          <a href="/" className="registration-breadcrumb-link">Home</a>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="registration-breadcrumb-sep"> / </span>
            <span className={index === breadcrumbs.length - 1 ? 'font-semibold text-gray-500' : ''}>
              {breadcrumb.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
