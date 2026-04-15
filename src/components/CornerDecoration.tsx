import React from 'react';
import Image from 'next/image';

export default function CornerDecoration() {
    return (
        <div className="absolute bottom-0 left-0 z-0">
            <Image
                src='/images/quarterCircle.png'
                alt="quarter circle decoration"
                height={250.62266540527344}
                width={229.00001525878906}
                priority
            />
        </div>
    );
}