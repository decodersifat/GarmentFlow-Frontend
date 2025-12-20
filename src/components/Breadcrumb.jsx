import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.link ? (
            <Link to={item.link} className="text-blue-500 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <FiChevronRight className="w-4 h-4" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
