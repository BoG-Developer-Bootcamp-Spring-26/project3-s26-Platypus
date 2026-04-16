import React from 'react';

interface UserCardProps {
    fullName: string;
    isAdmin: boolean;
}

export default function UserCard({ fullName, isAdmin }: UserCardProps) {
    const initial = fullName ? fullName.charAt(0).toUpperCase() : '?';

    return (
        <div 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center px-6" 
        style={{ width: '400px', height: '114px' }}
        >
            <div 
            className="shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center text-white text-[22px] font-bold mr-5"
            style={{ backgroundColor: '#D21312' }}
            >{initial}
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-[20px] font-bold text-gray-900 leading-tight mb-1">
                {fullName}
                </h3>

                <p className="text-[15px] font-medium">
                    <span className={isAdmin ? "text-[#D21312]" : "text-gray-400"}>
                        {isAdmin ? 'Admin' : 'User'}
                    </span>
                </p>
            </div>
        </div>
  );
}