const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const userCtrl = require('../controllers/users.controllers')


router.get("/", userCtrl.EnvoyerTousLesUsers)
/* ROUTES POUR LA GESTION DES USERS */
router.post('/signup', userCtrl.signup) //Route pour créer une nouvel utilisateur
router.post('/login', userCtrl.login) //Route pour connecter un utilisateur
router.get('/:id', auth, userCtrl.getUser) //Route pour récupérer un utilisateur précis
router.put('/:id/addProfilPicture', auth, multer, userCtrl.addProfilPicture)
module.exports = router