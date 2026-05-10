import type { Component, NextErrorType } from '@/@types/next.types';

const Error: Component<NextErrorType> = ({ error, reset }) => {
  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex flex-col items-center">
      <h2>It&apos;s not you. It&apos;s us. Give it another try, please!</h2>
      <p>{error.message ?? ''}</p>
      <button className="mt-4" onClick={handleReset} type="button">
        Try Again
      </button>
    </div>
  );
};

export default Error;
