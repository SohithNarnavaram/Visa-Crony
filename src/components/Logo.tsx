import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Globe Icon */}
      <div className={`${sizeClasses[size]} bg-[#b8952e] rounded-full flex items-center justify-center shadow-lg`}>
        <svg className={`${sizeClasses[size].replace('w-', 'w-').replace('h-', 'h-').replace('w-6', 'w-5').replace('h-6', 'h-5').replace('w-10', 'w-8').replace('h-10', 'h-8').replace('w-16', 'w-12').replace('h-16', 'h-12')} text-white`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-foreground tracking-wide`}>VISA CRONY</h1>
          {size !== 'sm' && (
            <div className="flex items-center space-x-1">
              <div className="w-4 h-0.5 bg-yellow-400"></div>
              <p className="text-xs text-yellow-400">Premium Visa Partner</p>
              <div className="w-4 h-0.5 bg-yellow-400"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
