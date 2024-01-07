import Head from 'next/head';
import { ChatRoomCom } from '../../components/ChatRoomCom';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Chat() {
    // export default function Chat() {
    var send1 = "f1"
    var receiver = "Pratyush"
    var current_chat_room_id = "aa1472674874c0a42fd1d37b714f61cb"

    return (
        <div>
            <Header />
            <ChatRoomCom current_chat_room_id={current_chat_room_id} sender={send1} receiver={receiver} />
            <Footer />
        </div>
    );
}


