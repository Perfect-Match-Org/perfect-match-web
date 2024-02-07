import React from 'react';
import slopePic from '/public/slope.jpg';
import Image from 'next/image';

const sampleinterview = () => {
    return (
        <div className="blog-post">
            <main className="flex flex-col lg:grid lg:grid-cols-[3fr_1fr] gap-6 px-6 py-8 bg-[#f8f8f8]">
                <article className="prose prose-lg mx-auto lg:prose-xl">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-[#fb7185] lg:text-5xl lg:leading-[3.5rem]">
                            A Perfect Match 3 years in the Making.
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Posted on January 1, 2024</p>
                        <p className="text-gray-500 dark:text-gray-400">Kavita Bala</p>
                    </div>
                    <div className="mt-4 text-rose-400">
                        <p>
                            <strong>Interview with LoveLink User</strong>
                        </p>
                        <p className="mt-4 text-gray-500">
                            Emma: I heard about LoveLink from a friend who had a fantastic experience last year. She met
                            her now-boyfriend through the platform, and I thought, why not give it a try? Plus, who
                            doesnt love the idea of technology helping you find your perfect match?
                        </p>
                        <p className="mt-4 text-gray-500">
                            Emma: Ive always been open to new ways of meeting people. LoveLinks approach of using
                            technology and algorithms to match people based on their interests and preferences sounded
                            intriguing. I figured it was a fun way to potentially connect with someone who shares my
                            values.
                        </p>
                        <p className="mt-4 text-gray-500">
                            Emma: Absolutely! I matched with someone during LoveLinks last event, and we hit it off
                            right away. We discovered we had a mutual love for hiking, and the algorithm did a fantastic
                            job pairing us based on our interests. We decided to meet up for a hike, and it turned into
                            a day filled with laughter and great conversation. Its amazing how technology can bring two
                            people together like that.
                        </p>
                        {/* <Image className="w-24" src={fakeProfilePic} alt="Picture of Emma" height={100} width={100} /> */}
                    </div>

                    <div>
                        <p className="text-rose-400 p-4">
                            About the Author: Kavita Bala is a Junior Computer Science major in the College of
                            Engineering. She is an analyst on the Perfect Match Engineering Team.
                        </p>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default sampleinterview;
