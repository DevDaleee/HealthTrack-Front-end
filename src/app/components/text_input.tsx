import React, {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ChangeEvent,
} from 'react';

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TextInput = ({
  type,
  placeholder,
  autoComplete,
  name,
  value,
  onChange,
  required = false,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      autoComplete={autoComplete}
    />
  );
};

export default TextInput;
