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
                return res.status(401).send({ error: "Mot de passe incorrect"})
            }
            res.status(200).json({
                user: user,
                message: 'success',
                token: jwt.sign( {userId: user.id}, RANDOM_TOKEN_SECRET, { expiresIn: '24h'} )
            })
            
        })
        .catch(error => res.status(500).send({ error }))
    })
    .catch(error => {
        console.log(error);
        res.status(500).send({ error })
    })
}

//Fonction pour modifier la photo de profil
exports.addProfilPicture = (req, res, next)=>{ 
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    model.User.update({picture_url: imageUrl}, {where: {id: req.params.id }})
    .then( () => {
        console.log(req.params.id)
        model.User.findOne({ where: {id: req.params.id} })
        .then((user) => {
           
            res.status(200).json({'imageUrl':user.picture_url, 'message':'Photo enregistrée'})
        })
        .catch(error => res.status(400).send({ error  }))
    })
    .catch(error => res.status(400).send({ error  }))
}

/*
if(req.file) {
    req.body.user = JSON.parse(req.body.user)
    req.body.user.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    sauceSchema.updateOne({_id: req.params.id}, {...req.body.sauce, _id: req.params.id} )
    .then( () =>res.status(200).send({'message': 'Sauce modifiée' }) )       
    .catch(error => res.status(400).send({ error }))
} else {
    sauceSchema.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id} ) //la méthode updateOne demande deux paramètres
    .then( () =>res.status(200).send({'message': 'Sauce modifiée' }) )       
    .catch(error => res.status(400).send({ error }))
} 
*/

//Fonction pour récupérer un utilisateur précis
exports.getUser = (req, res, next)=>{ 
    console.log('bonsoir')
    console.log(req.params.id)
    model.User.findByPk(req.params.id)
    .then( user => {
        console.log(user.picture_url)
        res.status(200).send(user) })
    .catch(error => {
        console.log(error)
        res.status(400).send({ error  })})
}
