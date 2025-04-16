import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h2>Web Socket -client</h2>

   <input id="jwtToken" pleaceholder="Json Wbn Token"/>
  
   <button id="btn-connect">Connect</button>

   <br>
   <span id="server-status">offline</span>

   <ul id="clients-ul">
      
   </ul>

   <form id="message-form">
    <input placeholder="message" id= "message-input"/>
   </form>
   
   <h3>Messages</h3>
   <ul id="messages-ul"></ul> 

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!;
const btnConect = document.querySelector<HTMLButtonElement>('#btn-connect')!;


btnConect.addEventListener('click', ()=> {
 
  if(jwtToken.value.trim(),length === 0){
    alert('Enter a valid JWT');
  }

  connectToServer();
})