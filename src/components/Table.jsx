import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const Table = ({ columns, data, loading = false }) => {
  if (loading) {
    return <LoadingSpinner message="Loading data..." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-secondary-800 shadow-sm">
      <table className="w-full border-collapse bg-white dark:bg-secondary-900">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-secondary-900 divide-y divide-gray-200 dark:divide-secondary-800">
          {data.length > 0 ? (
            data.map((row, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-blue-50 dark:hover:bg-secondary-800 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-secondary-200">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-gray-600 dark:text-secondary-400 text-lg font-medium">No data available</p>
                  <p className="text-gray-500 dark:text-secondary-500 text-sm mt-1">Try adjusting your filters or check back later</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
