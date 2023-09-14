import React from 'react';

const Members: React.FC = () => {
    const leads = [
        {
            Name: 'Grace Wilkey',
            ClassYear: 2024,
            Major: 'Hospitality Administration',
            Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            Team: 'Business',
        },
        {
            Name: 'Pratyush Sudhakar',
            ClassYear: 2025,
            Major: 'Computer Science & Math',
            Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            Team: 'Engineering',
        },
        {
            Name: 'Nicholas Varela',
            ClassYear: 2025,
            Major: 'Computer Science & Government',
            Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            Team: 'Engineering',
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
                    Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
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
                    Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
                },
            ],
            Members: [
                {
                    Name: 'Vipin Gunda',
                    ClassYear: 2025,
                    Major: 'Computer Science & Math',
                    Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
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
                    Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
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
                    Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
                },
            ],
            Members: [
                {
                    Name: 'Varshini Madhavan',
                    ClassYear: 2025,
                    Major: 'Industrial and Labor Relations',
                    Img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
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
                            <div key={lead.Name} className="p-4 sm:w-1/3">
                                <div className="flex flex-col items-center">
                                    <img className="w-72 h-72 rounded-full mb-4 shadow-lg object-cover" src={lead.Img} alt={lead.Name} />
                                    <p className="font-bold text-lg text-gray-800">{lead.Name}</p>
                                    <p className="text-gray-600">
                                        {lead.Major}, {lead.ClassYear}
                                    </p>
                                    <p className="text-rose-500">Head of {lead.Team}</p>
                                </div>
                            </div>
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
                                <div key={lead.Name} className="p-4 sm:w-1/3">
                                    <div className="flex flex-col items-center">
                                        <img className="w-72 h-72 rounded-full mb-4 shadow-lg object-cover" src={lead.Img} alt={lead.Name} />
                                        <p className="font-bold text-lg text-gray-800">{lead.Name}</p>
                                        <p className="text-gray-600">
                                            {lead.Major}, {lead.ClassYear}
                                        </p>
                                        <p className="text-rose-500">Team Lead</p>
                                    </div>
                                </div>
                            ))}

                            {division.Members &&
                                division.Members.map((member) => (
                                    <div key={member.Name} className="p-4 sm:w-1/4">
                                        <div className="flex flex-col items-center">
                                            <img className="w-72 h-72 rounded-full mb-4 shadow-lg object-cover" src={member.Img} alt={member.Name} />
                                            <p className="font-medium text-lg text-gray-800">{member.Name}</p>
                                            <p className="text-gray-600">{member.Major}</p>
                                            <p className="text-gray-700">{member.ClassYear}</p>
                                        </div>
                                    </div>
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
