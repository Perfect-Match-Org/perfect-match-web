import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const CuffedOrNotImage: React.FC = () => {
    return (
        <div className='relative z-10 max-w-[70vw] md:max-w-[85vw] w-full min-w-fit h-full flex items-center justify-center px-4 md:px-0'>
            <Link href="https://cuffedornot.perfectmatch.ai">
                <a>
                    <Image
                        src="/CuffedOrNot.svg"
                        alt="Cuffed or Not"
                        width={500}
                        height={500}
                        priority={true}
                        draggable='false'
                        className="object-contain cursor-pointer"
                    />
                </a>
            </Link>
            {/* Overlay positioned relative to the parent */}
            <div className='absolute top-[25%] right-[4%] z-20'>
                <Link href="https://cuffedornot.perfectmatch.ai">
                    <a className='block'>
                        <Image
                            src='/PressPlayToReveal.svg'
                            alt='Press Play to Reveal'
                            height={200}
                            width={300}
                            priority={true}
                            draggable='false'
                            className='cursor-pointer hover:opacity-90 transition-opacity'
                        />
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default CuffedOrNotImage;