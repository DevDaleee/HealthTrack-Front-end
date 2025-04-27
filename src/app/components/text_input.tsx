import React, {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from 'react';

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete: HTMLInputAutoCompleteAttribute;
}

const TextInput = ({ type, placeholder, autoComplete }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      autoComplete={autoComplete}
    />
  );
};

export default TextInput;
