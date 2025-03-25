
import React from 'react';

const FSSAIBadge = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3">
      <div className="rounded-full bg-green-100 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-sage-800">FSSAI Certified</h3>
        <p className="text-sm text-sage-600">All our meals follow FSSAI guidelines</p>
      </div>
    </div>
  );
};

export default FSSAIBadge;
