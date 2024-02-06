// TaskNextsBlogPost.js
import React from 'react';

const samplepost = () => {
    return (
        <div className="blog-post">
            <main className="flex flex-col lg:grid lg:grid-cols-[3fr_1fr] gap-6 px-6 py-8 bg-[#f8f8f8]">
                <article className="prose prose-lg mx-auto lg:prose-xl">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-[#fb7185] lg:text-5xl lg:leading-[3.5rem]">
                            Perfect Match: A History by ChatGPT
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Posted on December 15, 2023</p>
                        <p className="text-gray-500 dark:text-gray-400">Kavita Bala</p>
                    </div>
                    <div className="mt-4 text-gray-500">
                        <p>
                            Perfect Match, a student-run matchmaking service at Cornell University. Founded in 2019, it
                            uses a survey and machine learning algorithm to match Cornell students and alumni with
                            potential dates or friends. The service runs annually, typically around Valentines Day. It
                            was founded by Jamal Hashim in 2019 and has since helped match over 5,600 participants. The
                            latest event, PM23, matched over 3,900 Cornellians, resulting in more than 22,000 potential
                            connections.
                        </p>
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

export default samplepost;
