import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-100">
      <div className="max-w-md p-12 bg-white rounded-lg shadow-lg">
        <svg
          className="mx-auto mb-4 w-16 h-16 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 011 18z"
          />
        </svg>
        <h2 className="text-center font-bold text-3xl text-slate-700">
          You have successfully reserved your hotel
        </h2>
        <p className="text-center text-green-600">
          Your reservation has been confirmed. We will send you a confirmation email
          with details about your stay.
        </p>
      </div>
    </div>
  );
};

export default Page;