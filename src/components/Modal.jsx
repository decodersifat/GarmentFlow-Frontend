import React from 'react';

const Modal = ({ isOpen, title, children, onClose, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex gap-4">
          {onConfirm && (
            <button onClick={onConfirm} className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              {confirmText}
            </button>
          )}
          <button onClick={onClose} className={`${onConfirm ? 'flex-1' : 'w-full'} bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition`}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
