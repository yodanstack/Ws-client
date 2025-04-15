import { Manager, Socket } from "socket.io-client";


export const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');


    const socket = manager.socket('/');

    addListener(socket);
};


const addListener = (socket: Socket) => {
    
    const serverStatusLaber = document.querySelector('#server-status');
    const clientsUl = document.querySelector('#clients-ul')!;
    const messagesUl = document.querySelector('#messages-ul')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;

    socket.on('conenct', () => {
        if (serverStatusLaber) {
            serverStatusLaber.innerHTML = `connected`;
        }
    });


    socket.on('disconenct', () => {
        if (serverStatusLaber) {
            return serverStatusLaber.innerHTML = `disconected`;
        }        
    });

    socket.on('clientsUpdated', (clients: string[] ) => {
        let clientsHtml = '';

        clients.forEach((clientId) => {
            clientsHtml += `
            <li>${clientId}</li>
            `
        });

        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if(messageInput.value.trim().length <= 0)  {
            return;
        }
        socket.emit('message-from-client', {id: 'yoo', message: messageInput.value});
        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: {fullName: string, message: string})=> {
        const newMessage = `
        <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>

        </li> 
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);

    })

}