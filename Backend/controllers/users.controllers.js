const model = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const RANDOM_TOKEN_SECRET = process.env.DB_RANDOM_TOKEN_SECRET


exports.EnvoyerTousLesUsers = (req, res, next)=>{ 
    model.User.findAll()
    .then( posts => res.status(200).send(posts) )
    .catch(error => res.status(400).send({ error  }))
}


//Fonction pour l'inscription d'un utilisateur'
exports.signup = (req, res, next) => {
    if (req.body.email == null || req.body.password == null) return res.status(400)
    bcrypt.hash(req.body.password, 5)
    .then(hash => {
        const user = new model.User({
            firstname: req.body.firstname,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            picture_url: '',
            is_moderator: 0
        })
        user.save()
            .then(() => {
                res.status(200).send({ message: 'Utilisateur créé !' })
            })
            .catch(error => {
                console.log(error);
                res.status(400).send({ error })
            })
    })
    .catch(error => res.status(500).send({  error  }))
    
}

//Fonction pour la connexion d'un utilisateur
exports.login = (req, res, next)=>{ 
    model.User.findOne({ where: {email: req.body.email} })
    .then(user => {
        if(!user) {
            return res.status(401).send({ 'message': "Utilisateur non trouvé"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).send({ 'error': "Mot de passe incorrect"})
            }
            res.status(200).json({
                user: user,
                message: 'success',
                token: jwt.sign( {userId: user.id}, RANDOM_TOKEN_SECRET, { expiresIn: '24h'} )
            })
            
        })
        .catch(error => res.status(500).send({ error }))
    })
    .catch(error => res.status(500).send({ 'error': 'erreur' }))
}

//Fonction pour récupérer un utilisateur précis
exports.getUser = (req, res, next)=>{ 
    model.User.findByPk(req.params.id)
    .then( user => res.status(200).send(user))
    .catch(error => res.status(400).send({ error  }))
}

//Fonction pour modifier la photo de profil
exports.updateUserPicture = (req, res, next)=>{ 
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    model.User.update({picture_url: imageUrl}, {where: {id: req.params.id }})
    .then( () => {
        model.User.findOne({ where: {id: req.params.id} })
        .then((user) => res.status(200).json({'imageUrl':user.picture_url, 'message':'Photo enregistrée'}))
        .catch(error => res.status(400).send({ error  }))
    })
    .catch(error => res.status(400).send({ error  }))
}

//Fonction pour modifier les informations de l'utilisateur
exports.updateUserInfos = (req, res, next)=>{ 
    model.User.update({ ...req.body }, {where: {id: req.params.id }})
    .then( () => {
        model.User.findOne({ where: {id: req.params.id} })
        .then((user) => res.status(200).json({'message':'informations modifiée'}))
        .catch(error => res.status(400).send({ error  }))
    })
    .catch(error => res.status(400).send({ error  }))
}

//Fonction pour modifier le mot de passe de l'utilisateur
exports.updateUserPassword = (req, res, next)=>{ 
    //Je cherche l'utilisateur dans la bdd
    model.User.findOne({ where: {id: req.params.id} })
    .then( user => {
        //Si je trouve, je compare l'ancien mot de passe envoyé et celui trouvé dans la bdd
        bcrypt.compare(req.body.oldPwd, user.password)
        .then(valid => {
            if(!valid) { //Si les mots de passe de correspondent pas
                return res.status(401).send({ error: "Mot de passe incorrect"})
            }

            //Si les mots de passe correspondent, je crypte le nouveau mp et je l'enregistre
            bcrypt.hash(req.body.newPwd, 5)
            .then(hash => {
                model.User.update({ password: hash}, {where: {id: req.params.id }})
                .then((res) => res.status(200).send({'message':'mot de passe modifié'}))
                .catch(error => res.status(400).send({ error  }))
            })
            .catch(error => res.status(500).send({  error  })) 
        }) 
        .catch(error => res.status(500).send({  error  }))
    })  
    .catch(error => res.status(500).send({  error  }))  
}