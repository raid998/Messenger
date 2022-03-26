const convos = {}
let userID;
let currentUser;
const socket = io('/conversations');
socket.on('connect', ()=> {
})
socket.on('data', (data) => {
    userID = data.id
    currentUser = data;
});
const IDs = document.querySelectorAll('.contact-box');
getMessages = async (member) => {
    let memberdata = await fetch('/conversations/'+member)
    convos[member] = await memberdata.json()
}
for(let i = 0; i<IDs.length; i++) convos[IDs[i].id] = new Array();
for (let key in convos) {
    getMessages(key);
}
socket.on('user-search', (response) => {
    if(response){
    const contact = {
        target: document.querySelector(`#${response.login}`)
    }
    if(document.querySelector(`#${response.login}`))  changerContactBox(contact) 
    else {
        //création du contact box
        let newContact = document.createElement('div')
        newContact.innerHTML =  contactBox(response);
        newContact = newContact.firstChild;
        document.querySelector('#sidebar-contacts').appendChild(newContact);
        let messageWindow = document.createElement('div');
        messageWindow.innerHTML = messageWindowC(response, null);
        messageWindow = messageWindow.firstChild;
        document.querySelector('.outer-wrapper').appendChild(messageWindow)
       }}
})
const changerContactBox = (event)=> {
    // Effet de changement du contact
    let activeBox = document.querySelectorAll(".contact-box-active");
    if(activeBox.length){
        activeBox[0].classList.remove("contact-box-active");
    }
    event.target.closest(".contact-box").classList.add("contact-box-active");

    //Changement de conversation
    const id = event.target.closest(".contact-box").id
    if(document.querySelector('.convo-active')) {
        document.querySelector(".convo-active").classList.add("hide-content")
        document.querySelector(".convo-active").classList.remove("convo-active");
    }
    if(!document.querySelector(`.message-window-content.${id}`)) {
        let messageWindow = document.createElement('div');
        messageWindow.innerHTML = messageWindowC({login: id});
        messageWindow = messageWindow.firstChild;
        document.querySelector('.outer-wrapper').appendChild(messageWindow)
    }
    document.querySelector(`.message-window-content.${id}`).classList.add("convo-active");
    document.querySelector(`.message-window-content.${id}`).classList.remove("hide-content");

    //Changement de tab
    const tabCheck = document.querySelector(".tabs").contains(document.querySelector(`.tab.${id}`));
    if(tabCheck) {
        document.querySelector(".tab-active").classList.remove("tab-active");
        document.querySelector(`.tab.${id}`).classList.add("tab-active");
    } else {
        const newTab = document.createElement("span");
        newTab.innerHTML = tab({id:id, name:document.querySelector(`#${id} .nom-profile`).textContent});
        document.querySelector(".tabs").appendChild(newTab.firstChild);
        changerTab(document.querySelector(`.tab.${id}`));
    }

    //Chargement des Messages
    if(!document.querySelector(`.message-window-content.${id} .message-bulbe`)) if(convos[id]) convos[id].forEach(message =>{
        let messageBulbe = document.createElement('div');
        messageBulbe.innerHTML = messageBulle({...message, avatar:document.querySelector(`#${id} img`).src});
        messageBulbe = messageBulbe.firstChild;
        document.querySelector(`.message-window-content.${id}`).appendChild(messageBulbe);
    })
    
}
const changerTab = (event)=> {
    if(document.querySelector(".message-window.hide-content")) document.querySelector(".message-window.hide-content").classList.remove("hide-content")
    const x = event.closest(".tab");
    let activeTab = document.querySelector(".tab-active");
    if(activeTab) activeTab.classList.remove("tab-active")
    x.classList.add("tab-active");
}
const fermerTab = (event)=>{
    let x = event.target
    x.closest(".tab").remove()
    if(!document.querySelector(".tabs").children.length) document.querySelector(".message-window").classList.add("hide-content")
}
const ajouterContact = (event) => {
    let x = event.target;
    let term = document.querySelector(".search-term").value;
    if(!term) return;
    socket.emit('add',term);
}
const envoyerMessage = () => {
    if(document.querySelector("#message-input-field").value && document.querySelector('.convo-active')) {
        const destID = document.querySelector(`.contact-box-active`).id
        const utilisateurDestionation = document.querySelector(`.message-window-content.${destID}`);
        let newMessage = document.createElement('div');
    newMessage.innerHTML = messageBulle({
        avatar: currentUser.avatar,
        messageContent: document.querySelector('#message-input-field').value
    });
    newMessage = newMessage.firstChild;
    utilisateurDestionation.appendChild(newMessage)
    socket.emit('message', {
        from: currentUser.login,
        messageContent: document.querySelector('#message-input-field').value,
        idreceiver: document.querySelector('.contact-box-active').id,
        idConversation: document.querySelector('.contact-box-active').id
    })
    }
    document.querySelector('#message-input-field').value = '';
}

document.addEventListener('click', function (event) {
    if(event.target.closest(".contact-box")) changerContactBox(event);
    if(event.target.closest(".tab") && !event.target.classList.contains("close-tab")) changerTab(event.target);
    if(event.target.classList.contains("close-tab"))fermerTab(event)
    if(event.target.classList.contains('search')) ajouterContact(event);
    if(event.target.id == 'envoyer-message') envoyerMessage();

}, false);
document.querySelector('#message-input-field').addEventListener('keydown', (k)=> {
    if(k.keyCode == 13) envoyerMessage()
    })
    document.querySelector('.sidenav-trigger i').addEventListener('click', ()=> {
        const sidebar = document.querySelector('.aside-wrapper');
        if(sidebar.style.display != 'flex') sidebar.style.display = 'flex';
        else sidebar.style.display = 'none';
    })
    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 992){
            const sidebar = document.querySelector('.aside-wrapper');
            sidebar.style.display = 'flex'
        }
    });
// Configuration du Socket.IO 

socket.on('message', (message) => {
    if(!document.querySelector(`#${message.from.login}`)) {
        let newContact = document.createElement('div')
        let response = {
            login: message.from.login,
            avatar: message.from.avatar,
            affichage: message.from.affichage
        }
            newContact.innerHTML =  contactBox(response);
            newContact = newContact.firstChild;
            document.querySelector('#sidebar-contacts').appendChild(newContact);
            let messageWindow = document.createElement('div');
            messageWindow.innerHTML = messageWindowC(response, null);
            messageWindow = messageWindow.firstChild;
            document.querySelector('.outer-wrapper').appendChild(messageWindow)
    }/* 
    if(!document.querySelector(`.message-window-content.${message.from.login}`)) {
        let messageWindow = document.createElement('div');
        messageWindow.innerHTML = messageWindowC({login: message.from.login});
        messageWindow = messageWindow.firstChild;
        document.querySelector('.outer-wrapper').appendChild(messageWindow);
    } */
    const utilisateurDestionation = document.querySelector(`.message-window-content.${message.from.login}`);
    let newMessage = document.createElement('div');
    newMessage.innerHTML = messageBulle({
        avatar: message.from.avatar,
        messageContent: message.message
    });
    newMessage = newMessage.firstChild;
    utilisateurDestionation.appendChild(newMessage)
})