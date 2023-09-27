import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Members: React.FC = () => {
    const leads = [
        {
            Name: 'Grace Wilkey',
            ClassYear: 2024,
            Major: 'Hospitality Administration',
            Img: '/members/grace.jpg',
            Team: 'Business',
            Linkedin: 'https://www.linkedin.com/in/grace-wilkey-201a30147',
        },
        {
            Name: 'Pratyush Sudhakar',
            ClassYear: 2025,
            Major: 'Computer Science & Math',
            Img: '/members/pratyush.jpg',
            Team: 'Engineering',
            Linkedin: 'https://www.linkedin.com/in/pratyushsudhakar',
        },
        {
            Name: 'Nicholas Varela',
            ClassYear: 2025,
            Major: 'Computer Science & Government',
            Img: '/members/nick.jpg',
            Team: 'Engineering',
            Linkedin: 'https://www.linkedin.com/in/nicholas-varela',
        },
    ];

    const team = [
        {
            Name: 'Web Development',
            Description: 'The Web Development team is responsible for building the front-end and back-end of the Perfect Match website.',
            Leads: [
                {
                    Name: 'Nicholas Varela',
                    ClassYear: 2025,
                    Major: 'Computer Science & Government',
                    Img: '/members/nick.jpg',
                    Linkedin: 'https://www.linkedin.com/in/nicholas-varela',
                },
            ],
        },
        {
            Name: 'Algorithms',
            Description: 'The Algorithms team is responsible for building the matching algorithm that matches students based on their preferences.',
            Leads: [
                {
                    Name: 'Taerim Eom',
                    ClassYear: 2024,
                    Major: 'Computer Science',
                    Img: '/members/taerim.jpg',
                    Linkedin: 'https://www.linkedin.com/in/taerim-eom-301a41197',
                },
            ],
            Members: [
                {
                    Name: 'Vipin Gunda',
                    ClassYear: 2025,
                    Major: 'Computer Science & Math',
                    Img: '/members/vipin.jpg',
                    Linkedin: 'https://www.linkedin.com/in/vipin-gunda',
                },
            ],
        },
        {
            Name: 'Data Analysis',
            Description: 'The Data Analysis team is responsible for analyzing the data collected from the Perfect Match survey.',
            Leads: [
                {
                    Name: 'Flavia Jiang',
                    ClassYear: 2025,
                    Major: 'Information Science',
                    Img: '/members/person.jpg',
                    Linkedin: 'https://www.linkedin.com/in/ziyan-jiang-73b882255',
                },
            ],
        },
        {
            Name: 'Business',
            Description: 'The Business team is responsible for marketing Perfect Match and reaching out to potential sponsors.',
            Leads: [
                {
                    Name: 'Grace Wilkey',
                    ClassYear: 2024,
                    Major: 'Hospitality Administration',
                    Img: '/members/grace.jpg',
                    Linkedin: 'https://www.linkedin.com/in/grace-wilkey-201a30147',
                },
            ],
            Members: [
                {
                    Name: 'Varshini Madhavan',
                    ClassYear: 2025,
                    Major: 'Industrial and Labor Relations',
                    Img: '/members/varshini.jpg',
                    Linkedin: 'https://www.linkedin.com/in/varshinimadhavan',
                },
            ],
        },
    ];

    return (
        <div className="container px-5 sm:px-0 py-16 sm:py-6 mx-auto">
            <div className="container px-5 sm:px-0 py-16 sm:py-24 mx-auto">
                <div className="text-center mb-20">
                    <h2 className="mb-6 text-3xl tracking-tight font-extrabold text-rose-500 sm:text-5xl">Meet the Cupids</h2>

                    <div className="flex flex-wrap justify-center gap-6 mb-6">
                        {leads.map((lead) => (
                            <a key={lead.Name} className="p-4 sm:w-1/4" href={lead.Linkedin} target="_blank" rel="noopener noreferrer">
                                <div className="flex flex-col items-center">
                                    <Image src={lead.Img} alt={lead.Name} width={208} height={208} className="rounded-full mb-4 object-cover" />
                                    <p className="font-bold text-lg text-gray-800">{lead.Name}</p>
                                    <p className="text-gray-600">
                                        {lead.Major}, {lead.ClassYear}
                                    </p>
                                    <p className="text-rose-500">Head of {lead.Team}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                    <hr className="border-2 border-rose-300 my-5 w-2/3 mx-auto" />
                </div>

                {team.map((division, idx) => (
                    <div key={idx} className="mb-6">
                        <h3 className="mb-3 text-3xl text-center font-bold text-gray-700">{division.Name}</h3>
                        <p className="mb-6 italic text-sm text-center text-gray-600">{division.Description}</p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {division.Leads.map((lead) => (
                                <a key={lead.Name} className="p-4 sm:w-1/4" href={lead.Linkedin} target="_blank" rel="noopener noreferrer">
                                    <div className="flex flex-col items-center">
                                        <Image src={lead.Img} alt={lead.Name} width={208} height={208} className="rounded-full mb-4 object-cover" />
                                        <p className="font-bold text-lg text-gray-800">{lead.Name}</p>
                                        <p className="text-gray-600">
                                            {lead.Major}, {lead.ClassYear}
                                        </p>
                                        <p className="text-rose-500">Team Lead</p>
                                    </div>
                                </a>
                            ))}

                            {division.Members &&
                                division.Members.map((member) => (
                                    <a key={member.Name} className="p-4 sm:w-1/4" href={member.Linkedin} target="_blank" rel="noopener noreferrer">
                                        <div className="flex flex-col items-center">
                                            <Image src={member.Img} alt={member.Name} width={208} height={208} className="rounded-full mb-4  object-cover" />
                                            <p className="font-medium text-lg text-gray-800">{member.Name}</p>
                                            <p className="text-gray-600">{member.Major}</p>
                                            <p className="text-gray-700">{member.ClassYear}</p>
                                        </div>
                                    </a>
                                ))}
                        </div>
                        <hr className="border-2 border-rose-300 my-5 w-1/4 mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Members;
