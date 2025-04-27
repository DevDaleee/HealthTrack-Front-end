import React from 'react';

interface ButtonProps {
  loading?: boolean | null;
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

export const CustomButton = ({
  loading = false,
  text,
  icon,
  onClick,
  bgColor,
  borderColor,
  textColor,
}: ButtonProps) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        disabled={!!loading}
        onClick={onClick}
        className={`flex items-center justify-center gap-2 rounded-2xl p-3 w-2xs border-2 transition-all duration-300
          ${
            loading
              ? 'bg-gray-400 border-gray-400 text-white'
              : `${bgColor || 'bg-[#0985AE]'} ${
                  borderColor || 'border-[#0985AE]'
                } ${textColor || 'text-white'}`
          }
          hover:opacity-90`}
      >
        {loading ? (
          'Carregando...'
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {text}
          </>
        )}
      </button>
    </div>
  );
};
