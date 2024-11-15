// FormField.js
import React from 'react';

const FormField = ({ label, type = "text", id, name, value, onChange, isTextArea = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      )}
    </div>
  );
};

export default FormField;
