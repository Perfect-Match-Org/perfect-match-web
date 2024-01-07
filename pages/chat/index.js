import Head from 'next/head';
import { ChatSection } from '../../components/ChatSection';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function Chat() {

    const people = [
        {
            name: 'Pratyush',
            major: 'Computer Science',
            year: 'Sophomore',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            chatroom: 'aa1472674874c0a42fd1d37b714f61cb',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Flavia',
            major: 'Computer Science',
            year: 'Sophomore',
            imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Taerim',
            major: 'Computer Science',
            year: 'Sophomore',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Taerim',
            major: 'Computer Science',
            year: 'Sophomore',
            imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
    ]
    // const people = []
    return (

        <div>
            <Header />
            <ChatSection people={people} />
            <Footer />
        </div>
    );
}


