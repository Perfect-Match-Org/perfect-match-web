import Head from 'next/head';
import { ChatRoomCom } from '../../components/ChatRoomCom';

export default function Chat() {
    // export default function Chat() {
    var send1 = "f1"
    var recieve1 = "p1"
    var current_chat_room_id = "aa1472674874c0a42fd1d37b714f61cb"

    return (
        <div>
            <ChatRoomCom current_chat_room_id={current_chat_room_id} sender={send1} reciever={recieve1} />
        </div>
    );
}


