import React from 'react';

interface DiverProps {
  text?: string;
}

const Divider = ({ text }: DiverProps) => {
  return (
    <div>
      {text != null ? (
        <h1
          className="text-center overflow-hidden before:h-[1px] after:h-[1px] after:bg-black 
           after:inline-block after:relative after:align-middle after:w-1/4
           before:bg-black before:inline-block before:relative before:align-middle 
           before:w-1/4 before:right-2 after:left-2 text-xl"
        >
          {text}
        </h1>
      ) : (
        <div className="overflow-hidden before:h-[1px] before:bg-black before:inline-block before:relative before:align-middle  before:w-1/1" />
      )}
    </div>
  );
};

export default Divider;
