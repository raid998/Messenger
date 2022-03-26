//étapes pour installer l'application

** VOUS DEVEZ DISPOSER D'UNE CONNEXION INTERNET POUR POUVOIR TELECHARGER LES MODULES NECESSAIRES POUR QUE L'APPLICATION FONCTIONNE **
\*\* UNE FOIS LES MODULES SONT TELECHARGÉS, VOUS POUVEZ LANCER L'APPLICATION SANS LE BESOIN D'UNE CONNEXION INTERNET POUR LA PROCHAINES FOIS

1. L'environnement de l'application est Node.JS dons il doit être installé dans l'ordinateur/serveur dans lequel l'application sera hébérgée.
   Nous avons inclu un fichier d'installation du Node.js dans le CD avec le projet (son installation est assez simple et intuitive)
2. Une fois Node.js est installé, vous copiez le dossier nommé "code source" dans le CD vers la destination que vous souhaitez.
3. L'application utilise MySQL comme SGBD. nous avons inclu le fichier SQL qui va générer le schéma de base de données que l'application adopte
   Si MySQL n'est pas installé dans votre machine, vous pouvez l'installer depuis l'installateur inclu dans le CD. (pour windows)
   après vous importez le schéma de base de données dans MySQL.
4. Une fois MySQL est installé et le schème est importé, vous allez au chemin que vous avez déplacer le dossier "code source" est vous ouvrez le fichier app.js
   avec votre editeur de texte, et vous entrer les données d'accès de MySQL (lignes 23 et 50).
5. Dans la ligne 229 dans app.js, vous entrer votre adresse IP local sous la forme d'une chaine de charactères (ex: '192.168.X.X')
   après vous sauvegardez le fichier.
6. Vous ouvrez l'invite de commandes (cmd) et vous naviguez vers le dossier où app.js réside. (le dossier 'code source'), et vous executer cette commande
   pour télécharger les modules nécessaires utilisés par Node.js:

   > npm install

7. dès que le téléchargement termine, vous entrez la commande >node app.js
   lorsque vouz voyez le message de succès "Server created Successfully on PORT 3000", vous laissez la console ouverte et vous naviguez vers votre adresse IP locale
   dans le navigateur en indiquant le port (ex: 192.168.X.X:3000)

Dans un seul navigateur, vous pouvez seulement connecter un seul utilisateur, pour tester l'application d'une manière complète, vous pouvez soit naviguez vers
le lien de l'application depuis un autre navigateur du même machine, ou depuis une autre machine du même réseau.

En cas d'erreur d'installation ou un problème pour lancer le serveur, veuillez bien me contacter sur mon adresse email pour vous aider à résoudre le problème
email : benakcharaid@gmail.com
