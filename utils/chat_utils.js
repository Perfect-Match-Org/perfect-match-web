import { ref, push, onValue } from 'firebase/database';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
// import { db } from '../firebase';

const algorithm = 'aes-256-cbc';
const password = process.env.ENCRYPTION_KEY;
const keyLength = 32;
const ivLength = 16;
const constantIv = Buffer.alloc(ivLength, process.env.ENCRYPTION_L);

export const CHAT_API_URL = 'https:/chat.perfectmatch.ai';


export function find_chatroom_id(user1, user2) {
    //We want to hash using the two users' netids, newuser1 will always be the first one alphabetically
    const [newuser1, newuser2] = [user1, user2].sort();
    return new Promise((resolve, reject) => {

        scrypt(password, 'salt', keyLength, (err, derivedKey) => {
            if (err) throw err;

            const iv = constantIv;
            const cipher = createCipheriv(algorithm, derivedKey, iv);

            let encrypted_chat_room_id = cipher.update((newuser1 + newuser2), 'utf8', 'hex');
            encrypted_chat_room_id += cipher.final('hex');

            // cipher.reset();

            resolve(encrypted_chat_room_id);
        });
    });
}

export function decrypt_chatroom_id(encrypted_chat_room_id, iv) {
    return new Promise((resolve, reject) => {
        scrypt(password, 'salt', keyLength, (err, derivedKey) => {
            if (err) reject(err);

            const decipher = createDecipheriv(algorithm, derivedKey, constantIv);

            let decrypted_chat_room_id = decipher.update(encrypted_chat_room_id, 'hex', 'utf8');
            decrypted_chat_room_id += decipher.final('utf8');

            resolve(decrypted_chat_room_id);
        });
    });
}

