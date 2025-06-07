import React from 'react';
import Image from 'next/image';
import { team } from './members';

const Members: React.FC = () => {
    return (
        <div className="pt-16 pb-10 sm:py-6 mx-[5%] sm:mx-[10%] lg:mx-[15%]">
            <div className="container px-5 sm:px-0 py-2 sm:py-20 mx-auto sm:mx-0">
                <div className="text-center mb-0">
                    <h2 className="font-dela-gothic mb-6 text-2xl tracking-tight text-pmblue-500 sm:text-5xl sm:mb-8">
                        Meet the Cupids
                    </h2>

                    <p className="font-work-sans text-pmblue-500 text-base sm:text-xl mb-10 font-medium">
                        We currently have nineteen members, divided into two teams – Engineering and Business.
                    </p>
                    <hr className="border-2 border-pmred-500 w-[100%]" />
                </div>

                {team.map((division, idx) => (
                    <div key={idx}>
                        <h3 className="font-dela-gothic mb-6 text-2xl sm:text-4xl text-center font-bold text-pmblue-500 sm:mt-16 mt-10">
                            {division.Name}
                        </h3>
                        <p className="font-work-sans mb-12 text-center text-pmblue-500 text-base sm:text-lg font-medium max-w-4xl mx-auto px-4"
                            dangerouslySetInnerHTML={{ __html: division.Description }} />
                        <div className="flex font-work-sans flex-wrap justify-center gap-10">
                            {division.Members &&
                                division.Members.map((member) => (

                                    <a
                                        key={member.Name}
                                        className="sm:w-1/4 text-pmblue-500"
                                        href={member.Linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >

                                        <div className="flex flex-col items-center">
                                            <Image
                                                src={member.Img}
                                                alt={member.Name}
                                                width={208}
                                                height={208}
                                                className="object-cover aspect-square rounded-full object-center"
                                                loading="eager"
                                            />
                                            <p className="text-pmred-500 font-work-sans font-bold text-2xl text-center sm:mt-4 mt-3">
                                                {member.Name}
                                            </p>
                                            <p className="font-work-sans text-pmred-500 text-base font-semibold italic text-center">
                                                {member.Major}, {member.ClassYear}
                                            </p>
                                            <p className="font-work-sans text-pmblue-500 text-base font-base text-center">{member.Title1}</p>
                                            <p className="font-work-sans text-pmblue-500 text-base font-base text-center">{member.Title2}</p>
                                        </div>
                                    </a>
                                ))}
                        </div>
                        {idx !== team.length - 1 && (
                            <hr className="border-2 border-pmred-500 sm:mt-16 mt-12 w-[100%]" />
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Members;
