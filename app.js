const bodyparser    = require('body-parser') 
const express       = require("express") 
const path          = require('path');
const fs            = require("fs");
const ejs           = require('ejs');
const mysql         = require("mysql2");
const mysql2		= require("mysql")
const multer        = require("multer");
const app           = express() 
const server        = require('http').createServer(app);
const upload        = multer({ dest: 'uploads/' })
const io            = require('socket.io')(server);
const session       = require('express-session');
const bcrypt        = require("bcrypt");
const passport      = require("passport")
const LocalStrategy = require("passport-local").Strategy;
var PORT = process.env.port || 3000 
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const passportSocketIo = require('passport.socketio')
const { Sequelize } = require('sequelize');
const { cpuUsage } = require('process');
const sequelize = new Sequelize('chat_app', `nom d'utilisateur BDD ici `, 'mot de passe BDD ici', {
	host: 'localhost',
	dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });
  var SequelizeStore = require("connect-session-sequelize")(session.Store);
passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password'
},async function(username, password, done) {
	  connection.promise().query(`select * from utilisateur WHERE Login = '${username}'`)
	  .then(async ([rows,fields]) => {
		if(!rows.length) return done(null, false, { message: 'Identifiant Incorrect' });
		await bcrypt.compare(password,rows[0].MotDePasse)
		.then(result => {
			if(!result) return done(null, false, { message: 'Mot de Passe Incorrect' });
			return done(null, rows[0]);
		}).catch(new Error('error'));;
	  }).catch(new Error('error'));
	}
  ));
  var myStore = new SequelizeStore({
	db: sequelize,
  });
  var options = {
	host: 'localhost',
	port: 3306,
	user: `nom d'utilisateur BDD ici`,
	password: 'mot de passe BDD ici',
	database: 'chat_app'
};

  const connection = mysql.createConnection(options);  
  passport.serializeUser(function (user, done) {
    done(null, user.idUtilisateur); // a user id is enough. let's go with that.
});
passport.deserializeUser(function (id, done) {
    connection.query("SELECT * FROM utilisateur WHERE idUtilisateur = ?", [id], function (err, rows) {
		const user = {
			id: rows[0].idUtilisateur,
			affichage: rows[0].affichage,
			avatar: rows[0].avatar,
			logged_in: rows[0].logged_in,
			login: rows[0].Login
		}
		if(!user.affichage) user.affichage = rows[0].Login
        done(err, user); 
    });
});

const isNotAuthenticated = (req,res,next) =>{
	if (!req.user) return res.redirect("/connecter");
	next();
}
isAuthenticated = (req, res, next) => {
	if(req.user) return res.redirect("/conversations")
	next();
}
// Mise en place du moteur de modèle
app.set("./views", path.join(__dirname)) 
app.set("view engine", "ejs") 
app.use(express.static(__dirname + '/public'));
app.use(express.json())

// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:true})) 
app.use(bodyparser.json()) 
app.use(session({ secret: 'keyboard cat',store: myStore, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------------
io.use(
	passportSocketIo.authorize({
	  cookieParser: cookieParser,
	  secret: 'keyboard cat',
	  store: myStore, 
	  success: function(data,accept){
		console.log('succeeded')
		accept();
	  },
	  fail: function() {
		  console.log('failed')
	  }
	})
  );
  myStore.sync();

//----L'acheminement --------
app.get("/", (req,res)=>{
    res.render("accueil", {isAuthenticated: req.isAuthenticated()});
});
app.get("/connecter", isAuthenticated,(req,res) => {
	res.render("connecter", {isAuthenticated: req.isAuthenticated()});
})
app.get("/inscrire", isAuthenticated, (req,res) =>{
	res.render("inscrire", {isAuthenticated: req.isAuthenticated()});
});
	
app.get("/identifiants", async (req,res) => {
	let user = await connection.promise().query(`select * from utilisateur where Login = "${req.query.login}";`)
	if(user[0].length)
		return res.json({userExists: true});
		res.json({userExists: false});
});

app.post("/connecter",passport.authenticate('local', { successRedirect: '/conversations',
failureRedirect: '/connecter?erreur=login' }))

app.post("/inscrire", [isAuthenticated,upload.single('avatar')], async (req,res) => {
	const Utilisateur = {
		id:"",
		identifiant: req.body.identifiant,
		mdp: req.body.mdp,
		image: './avatars/default.png',
		affichage: req.body.affichage
	}
	if(req.file) {
		const currentPath = `./uploads/${req.file.filename}`
		const newPath = `./public/avatars/${req.body.identifiant}/${req.file.filename}.jpg`
		 fs.mkdir(`./public/avatars/${req.body.identifiant}`, {recursive: true},(err) => { 
			if (err) { 
			  return console.error(err); 
			}})
		 fs.rename(currentPath,newPath, (err) => { 
			if (err) { 
			  return console.error(err); 
			}});
		Utilisateur.image = `./avatars/${req.body.identifiant}/${req.file.filename}.jpg`;
	}
	await bcrypt.hash(Utilisateur.mdp, saltRounds)
	.then((hash, err) => {
	//	if(err) throw err;
		Utilisateur.mdp = hash;
	}).catch((error) => {
		console.error(error);
	  });
	  connection.promise().query(`insert into utilisateur (idUtilisateur, Login, MotDePasse,Avatar, Affichage) values (default, '${Utilisateur.identifiant}', '${Utilisateur.mdp}', '${Utilisateur.image}', '${Utilisateur.affichage}')`)
	  .then((result, fields) => {
	  });
	res.redirect('/connecter');
});
app.get('/deconnecter', (req,res) => {
	req.logout();
  	res.redirect('/');
})
app.get("/conversations",isNotAuthenticated, async (req,res) => {
	const [convos, fields] = await connection.promise().query(`select Login, Affichage,avatar from chat_app.utilisateur where idUtilisateur in
	(SELECT idUtilisateur FROM chat_app.conversation
	WHERE idConversation IN (
		select idConversation from chat_app.conversation WHERE idUtilisateur = ${req.user.id}) and NOT(idUtilisateur = ${req.user.id}));`);
	res.render("conversations", {
		isAuthenticated: req.isAuthenticated(),
		convos: convos
	});
});
app.get('/conversations/:id', isNotAuthenticated, async (req,res) => {

	const [convos, fields] = await connection.promise().query(
		`select * from chat_app.message where idConversation IN (select idConversation from chat_app.conversation  WHERE idUtilisateur in (select idUtilisateur from chat_app.utilisateur where Login = '${req.params.id}')) and idConversation in (select idConversation from chat_app.conversation where idUtilisateur = ${req.user.id}) order by timeSent asc`);
		if(convos.length)
	return res.json(convos);
	return null
})
//Socket.IO
const users = {}
const nsp = io.of('/conversations');
nsp.on('connect', (socket) => {
	users[socket.request.user.login] = socket.id
	socket.emit('data',socket.request.user)
	socket.on('add', async(data) => {
		const [rows,fields] = await connection.promise().query(`select * from utilisateur where Login = '${data}'`)

		// si l'utilisateur existe
		if(rows.length) {
			const userSearch = {
				id: rows[0].idUtilisateur,
				login:rows[0].Login,
				affichage: rows[0].Affichage,
				avatar: rows[0].avatar
			}
			if(!userSearch.affichage) userSearch.affichage = userSearch.login;
			

			if(userSearch.login != socket.request.user.login) socket.emit('user-search', userSearch)}
		else socket.emit('user-search', false)

	})
	socket.on('message', async (message)=> {
		
		let [receiver, fields2] = await connection.promise().query(`select idUtilisateur from utilisateur where Login = '${message.idreceiver}'` )
		let receiverid = receiver[0].idUtilisateur;
		let convoID;
		const [convos, fields] = await connection.promise().query(
			`select * from chat_app.message where idConversation IN (select idConversation from chat_app.conversation  WHERE idUtilisateur in (select idUtilisateur from chat_app.utilisateur where Login = '${message.idreceiver}')) and idConversation in (select idConversation from chat_app.conversation where idUtilisateur = ${socket.request.user.id}) order by timeSent asc`);
			if(!convos.length) {
				const [row] = await connection.promise().query(`insert into chat_app.conversation (idConversation, idUtilisateur) values (default, ${receiverid});`);
				convoID = row.insertId;
				await connection.promise().query(`insert into conversation (idConversation, idUtilisateur) values ('${convoID}', '${socket.request.user.id}')`)
			} else convoID = convos[0].idConversation;
		await connection.promise().query(`insert into message (idMessage, messageContent, idsender, idreceiver, idConversation) values (default,'${message.messageContent}',${socket.request.user.id},'${receiverid}','${convoID}')`)
		socket.to(users[message.idreceiver]).emit('message', {from: socket.request.user,message: message.messageContent})
	})
})
app.use(function (req, res, next) {
	res.status(404).redirect("/")
  })
server.listen(PORT, 'votre adresse IP locale ici',function(){
	console.log("Server created Successfully on PORT", PORT) 
}) 
