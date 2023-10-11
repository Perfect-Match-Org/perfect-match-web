import React from 'react';
import Image from 'next/image';
import { team } from './members';

const Members: React.FC = () => {
    return (
        <div className="pt-16 pb-10 sm:py-6 mx-[5%] sm:mx-[10%] lg:mx-[15%]">
            <div className="container px-5 sm:px-0 py-12 sm:py-20 mx-auto sm:mx-0">
                <div className="text-center mb-0">
                    <h2 className="mb-6 text-3xl tracking-tight font-extrabold text-rose-400 sm:text-5xl sm:mb-8">Meet the Cupids</h2>

                    <p className="text-gray-500 text-xl mb-10 italic">We have two teams – Engineering and Business.</p>
                    <hr className="border-1 border-rose-300 my-5 w-[100%]" />
                </div>

                {team.map((division, idx) => (
                    <div key={idx}>
                        <h3 className="mb-6 text-3xl text-center font-bold text-gray-700 mt-20">{division.Name}</h3>
                        <p className="mb-12 italic text-center text-gray-500">{division.Description}</p>

                        <div className="flex flex-wrap justify-center gap-10">
                            {division.Members &&
                                division.Members.map((member) => (
                                    <a key={member.Name} className="sm:w-1/4" href={member.Linkedin} target="_blank" rel="noopener noreferrer">
                                        <div className="flex flex-col items-center">
                                            <Image
                                                src={member.Img}
                                                alt={member.Name}
                                                width={208}
                                                height={208}
                                                className="rounded-full object-cover"
                                                loading='eager'
                                            />
                                            <p className="font-medium text-lg text-gray-800 text-center mt-4">{member.Name}</p>
                                            <p className="text-gray-700 text-sm text-center">{member.Major}, {member.ClassYear}</p>
                                            <p className="text-rose-500 text-sm text-center">{member.Title1}</p>
                                            <p className="text-rose-500 text-sm text-center">{member.Title2}</p>
                                        </div>
                                    </a>
                                ))}
                        </div>
                        <hr className="border-1 border-rose-300 mt-20 w-[100%]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;
