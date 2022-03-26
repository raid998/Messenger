//Ce fichier contient les fonctions que j'utilise dans l'application qui aident à créer certains éffets.

const nonRempli = () => {
    document.querySelector(".non-rempli").classList.add("scale-in");
}
const mdpIncorrect = () => {
    document.querySelector(".non-rempli").textContent = "Vous n'avez pas entré le même mot de passe dans les deux champs"
    document.querySelector(".non-rempli").classList.add("scale-in");

}
const dEtape = () => {
    return `<div class="row inscrire deuxieme">
    <form action="" class="col s12" enctype="multipart/form-data" >
        <div class="row">
            <div class="col s12 m12 l12 xl12">
                <i class="large material-icons">account_circle</i>
            </div>
        </div>
        <div class="row">
            <div class="file-field col s12 m12 l12 xl12">
                <div class="btn">
                    <span>File</span>
                    <input id="avatar" type="file" name="avatar">
                  </div>
                  <div class="file-path-wrapper">
                    <input id="" placeholder="Utiliser une photo de profile" class="file-path validate" type="text">
                  </div>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 m12 l12 xl12">
                <input placeholder="Nom d'affichage" id="affichage" type="text" class="validate">
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 m12 l12 xl12">
            </div>
        </div>
    </form>
    <button class="btn-large" id="submit2">Terminer</button>
</div>`;
}
