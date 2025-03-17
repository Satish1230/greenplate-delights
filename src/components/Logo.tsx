
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <circle cx="16" cy="16" r="15" fill="white" stroke="#698c68" strokeWidth="2" />
        <path d="M9 16C9 12.134 12.134 9 16 9C19.866 9 23 12.134 23 16" stroke="#698c68" strokeWidth="2" strokeLinecap="round" />
        <path d="M23 16C23 19.866 19.866 23 16 23C12.134 23 9 19.866 9 16" stroke="#517251" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 9C16 9 14 13 14 16C14 19 16 23 16 23" stroke="#698c68" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 9C16 9 18 13 18 16C18 19 16 23 16 23" stroke="#517251" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 14L20 14" stroke="#698c68" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18L20 18" stroke="#517251" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="text-2xl font-serif text-sage-800 font-semibold">GreenPlate</span>
    </div>
  );
};

export default Logo;
