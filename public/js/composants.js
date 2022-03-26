const messageBulle = (config)=> {
    if (config.idsender == currentUser.id) { config.avatar = currentUser.avatar }
    return `<div class="message-bulbe flex-container">
                                    <span class="profil-img">
                                        <img src="${config.avatar}" alt="">
                                    </span>
                                    <span class="flex-container message-content">${config.messageContent}</span>
                                </div>`};
const tab = (config = {id: null, name:Name}) => `<span class="flex-container tab ${config.id}"><span>${config.name}</span>  <i class="close-tab material-icons">close</i></span>`;
const contactBox = (contact) => `<div id="${contact.login}" class="flex-container contact-box">
                                    <span class="profil-img">
                                        <img src="${contact.avatar}" alt="">
                                    </span>
                                    <span class="flex-container profile-info">
                                        <span class="nom-profile">${contact.affichage}</span>
                                    </span>
                                  </div>`;
const messageWindowC = (contact) => `<div class="flex-container message-window-content ${contact.login} hide-content">
                                               
                                             </div>`;