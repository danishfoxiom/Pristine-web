import React, { useState } from 'react';

interface TruncatedTextProps {
  text: string;
  maxWords?: number;
  className?: string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  text, 
  maxWords = 20, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const words = text.split(' ');
  const shouldTruncate = words.length > maxWords;
  
  const truncatedText = shouldTruncate 
    ? words.slice(0, maxWords).join(' ') + '...' 
    : text;

  if (!shouldTruncate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="cursor-help">{truncatedText}</span>
      
      {isHovered && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg whitespace-nowrap max-w-xs">
          <div className="font-medium mb-1">Full text:</div>
          <div className="text-gray-200 dark:text-gray-300">{text}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
