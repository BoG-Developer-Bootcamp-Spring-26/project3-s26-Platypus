import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TitleBarProps {
  showSearch: boolean;
}

export default function TitleBar({ showSearch = false }: TitleBarProps) {
return (
    <header 
      className="w-full bg-white flex items-center px-8 border-b border-gray-200 z-20 relative"
      style={{ height: '5.5rem' }} 
    >
      
    <div className="flex-shrink-0 flex items-center gap-1.5">
    <Image
        src="/images/appLogo.png"
        alt="Progress Logo"
        width={44}
        height={44}
        priority
    />
    <span className="font-bold text-2xl text-black tracking-tight">Progress</span>
    </div>

      {showSearch && (
        <div className="flex-grow flex justify-center px-4">
          {/* Temporary dashed border so you can see the container limits */}
          <div className="w-full max-w-2xl h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 font-medium">
            Search Bar will go here
          </div>
        </div>
      )}

      {/*Balances as a counterweight (ensures search bar centering)*/}
      {showSearch && (
        <div className="flex-shrink-0 w-[200px]"></div> 
      )}

    </header>
  );
}