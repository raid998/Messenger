const Utilisateur = {
    identifiant:"",
    mdp:"",
    image:"",
    affichage:""
}
let tID, utilisateurExistant;
const suivant = document.querySelector(".etape-suivante");
const premiereEtape = document.querySelector(".premiere-etape");
const deuxiemeEtape = document.querySelector(".deuxieme-etape");
const login = document.querySelector(".identifiant-box input");
const messageErreur = document.querySelector(".erreur-etape-1");
const mdpChamp1 = document.querySelector(".mdp1");
const mdpChamp2 = document.querySelector(".mdp2");
const verifierUser = async (user) => {
    const data = {
        user: user
    }
    return await fetch(`/identifiants?login=${login.value}`)
}
suivant.addEventListener("click", ()=> {

    if(!(login.value && mdpChamp1.value && mdpChamp2. value)){
        messageErreur.textContent = "Veuillez remplir tous les champs";
        messageErreur.classList.remove("hide-content");
    } else {
        let mdpIdentique;
        if(mdpChamp1.value != mdpChamp2.value){
            mdpIdentique = false;
            messageErreur.textContent = "Les mots de passes que vous avez entré ne sont pas identiques";
            messageErreur.classList.remove("hide-content")
        } else {
            mdpIdentique = true;
        }
        if(!utilisateurExistant && mdpIdentique) {
            premiereEtape.classList.add("hide-content");
            deuxiemeEtape.classList.remove("hide-content");
        }
    }
    
    
});
document.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {               
        e.preventDefault();
        return false;
      }
})
login.addEventListener('input', ()=> {
    if(tID) clearTimeout(tID);
     tID = setTimeout(
        async () => {
            let response = await verifierUser(login.value).then(resp => 
                resp.json()).then(body => {
                    utilisateurExistant = body.userExists;
                    if(utilisateurExistant) {
                        messageErreur.textContent = "Cet identifiant est déjà pris. Veuillez entrer un identifiant différent";
                        messageErreur.classList.remove("hide-content");
                    } else {
                        messageErreur.classList.add("hide-content")
                    }
                })
          
        }, 500
    );

})