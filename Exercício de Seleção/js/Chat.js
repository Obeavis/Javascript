let conversation = null
let image_position= '';
let text_position='';

fetch('http://dev.4all.com:3050/messages')
  .then(response => response.json())
  .then(result => {
    conversation = result
  })
  .catch(err => {
  console.error('Fetch Error', err);
}).then(function() {

    function sendMessage() {
        fetch('http://dev.4all.com:3050/messages',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  message: document.querySelector('#message').value,
                })
              })
            .then((response) => {
              if(response.status === 201){
                console.log("Message Posted");
              }
              let message = {
                  userName:"Eu",
                  portrait: 'img/orange_circle.png',
                  message: document.querySelector('#message').value,
                  displayPortraitLeft: true,
                  time: "1 min ago"
              }
              
              conversation = conversation.concat(message);
              showConversation(ChatBody);
  
            })
            .then((data) => { document.querySelector('#message').value = ''})
            .catch((err) => {console.log('Fetch Error', err)});
    }

    function showConversation(ChatBody) {
        document.querySelector('#chat').innerHTML = Chat(ChatBody);
    }

    function ChatBody(Message) {
        return (`
        <div class="panel-body">
            <ul class="list-group">
                ${Message(conversation)}
            </ul>
        </div>
        `)
    };

    function Message(conversation) {
        return conversation.map((item) => {
            if (item.displayPortraitLeft) {
                image_position='pull-left';
                text_position='left'
            } else {
                image_position='pull-right';
                text_position='right';
            }
            return (`
                <li class='${text_position} clearfix '>
                    <span class='${image_position}'>
                        <img class="img-circle UserPicture" src='${item.portrait}'/>
                    </span>
                    <div class="MessageBody">
                        <strong>${item.userName}</strong>
                        <small>${item.time}</small>
                        <p>${item.message}</p>
                    </div>
                </li>
            `)
        }).join('');
    }

    function Chat(ChatBody) {
        return (`
        <div class="panel panel-default chat_container">
            <div class="chat-header">
                <i class='fa fa-comments'></i>  Chat
            </div>
            <div class="panel-heading">
                ${ChatBody(Message)}
            </div>
        </div>
        `)
    }

    document.querySelector('#button').addEventListener('click', sendMessage);
    showConversation(ChatBody);
})

