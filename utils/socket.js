import { io } from "socket.io-client";

let socket;
const initSocket = (link) => {
    if (!socket)
        socket = io(link);
}

const removeSocket = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
}

const getSocket = () => socket;

export default {initSocket, getSocket, removeSocket};