import React from 'react';
import Image from 'next/image';

const CuffedOrNotImage: React.FC = () => {
    return (
        <div className='z-10 max-w-[85vw] w-full min-w-fit h-full relative flex items-center justify-center'>
            <Image
                src="/CuffedOrNot.svg"
                alt="Cuffed or Not"
                width={500}
                height={500}
                priority={true}
                draggable='false'
                className="object-contain"
            />
            <div className='absolute -top-[-30%] w-full h-[50%] flex justify-end'>
                <Image
                    src='/PressPlayToReveal.svg'
                    alt='Press Play to Reveal'
                    height={200}
                    width={300}
                    priority={true}
                    draggable='false'
                />
            </div>
        </div>
    );
}

export default CuffedOrNotImage;
