var socket = io();
const SENT = 'SENT';
const RECIEVED = 'RECEIVED';

let username = '';
const btn = document.getElementById('join_chat');
const form = document.getElementById('form');
const chatroomContainer = document.getElementById('chatroomContainer');
const UsernameInput = document.getElementById('Username_input');
const Message = document.getElementById('Message');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

btn.addEventListener('click', (event)=>{
    event.preventDefault();
    username = UsernameInput.value;
    // console.log(username);

    if (username) {
        // we will allow user to group
        // chat screen
        form.style.display = "none";
        chatroomContainer.style.display = "block";

    }
});


sendBtn.addEventListener('click',(e)=>{
    console.log("button is clicked");
    e.preventDefault();
    let data = {
        id: socket.id,
        username: username,
        Message: Message.value,
    }
    socket.emit('this is event name',data);
    renderMessage(data,SENT);
})


socket.on('this is event name',(data)=>{
    if(data.id !== socket.id){
        renderMessage(data,RECIEVED);
    }
});

function renderMessage(data,messageType) {
    const msgDiv = document.createElement('div');
    msgDiv.innerText = `${data.Message}`;
    if(messageType === SENT){
        msgDiv.setAttribute('class', 'message sent');
    }
    else{
        msgDiv.setAttribute('class', 'message');
    }
    messagesContainer.appendChild(msgDiv);
    Message.value = "";
}