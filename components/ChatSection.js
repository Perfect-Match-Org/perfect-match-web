import React, { useState, useEffect, useRef, useMemo } from "react";
// import { Link, useHistory } from "react-router-dom";


export function ChatSection({ people }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const emoji = ['😃', '😆', '😄', '😆', '😊', '😎', '😳'];

    // Thank you flavia for this code 
    const matchEmoji = (emoji[Math.floor(Math.random() * emoji.length)]);
    return (

        <div>

            <header className="bg-slate-100 shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* <img src="https://perfectmatch.ai/logo.png" alt="Logo" className="logo h-16" /> */}
                    {/* <h1 className="text-3xl font-bold tracking-tight text-gray-500"> Chats</h1> */}
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                <main>
                    <ul role="list" className="divide-y divide-gray-100">
                        {people.map((person, index) => (
                            // <a href={"/chat/" + person.chatroom} style={{ textDecoration: 'none' }}>
                            <a key={index} href={"/chat/chatroom"} style={{ textDecoration: 'none' }}>

                                <li key={person.major} className="border-t border-b border-gray-200 flex justify-between gap-x-6 py-5">

                                    <div className="flex min-w-0 gap-x-4">

                                        {/* <div className="text-8xl mt-4 sm:mt-0 sm:text-1xl mx-auto sm:ml-12 sm:mr-0">{matchEmoji}</div> */}
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.year}, {person.major}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-rose-400 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-400 dark:focus:ring-rose-400">
                                            Messages
                                            <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-rose-800 bg-rose-200 rounded-full">
                                                2
                                            </span>
                                        </button>
                                        <p className="text-sm leading-6 text-gray-900"></p>
                                        {person.lastSeen ? (
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                            </p>
                                        ) : (
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                            </div>
                                        )}

                                    </div>

                                </li>
                            </a>
                        ))}
                    </ul>




                </main>
            </div>
        </div >

    );

}

