import React, { useState, useEffect, useRef, useMemo } from "react";
// import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { find_chatroom_id } from "../utils/chat_utils.js";
import { MatchTileChat } from "../components/profile-tabs/matchTileChat.tsx"
import { CHAT_API_URL } from "../utils/chat_utils.js";

export function ChatRoomCom({ current_chat_room_id, sender, receiver }) {

    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [inputMessage, setInputMessage] = useState("");

    const emoji = ['😃', '😆', '😄', '😆', '😊', '😎', '😳'];
    // find_chatroom_id(sender, receiver)
    //     .then(chat_room_id => {
    //         // Use chat_room_id here
    //         chatRoomId = (chat_room_id);
    //     })
    //     .catch(err => {
    //         // Handle any errors here
    //         console.error(err);
    //     });
    // Thank you flavia for this code 
    const matchEmoji = (emoji[Math.floor(Math.random() * emoji.length)]);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    //get messages from backend calling to api 
    useEffect(() => {
        console.log(CHAT_API_URL + '/api/chats/' + current_chat_room_id)
        const fetchMessages = (current_chat_room_id) => {
            fetch(CHAT_API_URL + '/api/chats/' + current_chat_room_id)
                .then(response => {
                    if (!response.ok) {
                        console.log("Error getting messages from backend")
                    }
                    return response.json();
                })
                .then(data => setMessages(data.messages));
        };

        // Fetch messages immediately
        fetchMessages(current_chat_room_id)

        // // Fetch messages every 5 seconds
        // const intervalId = setInterval(fetchMessages, 5000);

        // Clean up the interval on unmount
        // return () => clearInterval(intervalId);
    }, []);


    const handleButtonClick = () => {
        // const messageData = {
        //     chatRoomId: chatRoomId,
        //     sender: sender,
        //     receiver: receiver,
        //     message: inputMessage
        // };

        // axios.post('/api/messages', messageData)
        //     .then(response => {
        //         console.log('Success:', response.data);
        //         fetchMessages();
        //         setInputMessage(''); // Clear the input field
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });

        console.log("button clicked")
    };

    return (

        <div>
            <div>
                <div className="w-full bg-rose-400 px-4 py-2 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100">Chats from {receiver}</h1>
                </div>
                {/* <div className="chat-container">
                    {messages1.map((message, index) => (
                        <div key={index} className="chat-message">
                            <div className="sender">From: {message.sender}:</div>
                            <div className="reciever">To: {message.reciever}:</div>
                            <div className="message">{message.message}</div>
                            <div className="timestamp">{message.sentOn}</div>
                        </div>

                    ))}
                </div> */}
                <div className="flex">

                    <div className="w-1/2">
                        <MatchTileChat />

                        <div className="bg-red-100 border-l border-r border-red-400 text-red-700 px-[10%] py-3 rounded relative" role="alert">
                            <strong className="font-bold">Holy smokes! </strong>
                            <span className="block sm:inline"> You and Pratyush are a Match! Here's a tip from our in-house Cupid: ask Pratyush about Wushu and *Insert Another Insert Another Interst Here *!</span>

                        </div>


                    </div>
                    <div className="w-1/2">
                        <div className="w-full px-5 flex flex-col-reverse justify-between">
                            <div className="flex flex-col mt-5">
                                {messages.length > 0 ? (
                                    messages.map((message, index) => (
                                        <div key={index} className={message.sender != sender ? "flex justify-start mb-4" : "flex justify-end mb-4"}>
                                            <div key={index} className={message.sender === sender ? "ml-2 py-3 px-4 bg-gray-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white" : "mr-2 py-3 px-4 bg-rose-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"}>
                                                {message.message}
                                            </div>
                                        </div>
                                    ))
                                ) : null}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div className=" bottom-0 w-full py-3 bg-white flex items-center">
                            <input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="flex-grow bg-gray-300 py-2 px-3 rounded-xl mr-2"
                                type="text"
                                placeholder="Type your message here..."
                            />
                            <button
                                onClick={handleButtonClick}
                                className="bg-rose-400 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit
                            </button>


                        </div>
                    </div>


                </div>

            </div >
        </div>

    );

}

