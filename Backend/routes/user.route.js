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
router.put('/:id/updateUserPicture', auth, multer, userCtrl.updateUserPicture) //Route pour modifier la photo de profil
router.put('/:id/updateUserInfos', auth, userCtrl.updateUserInfos) //Route pour modifier les infos de l'utilisateur
router.put('/:id/updateUserPassword', auth, userCtrl.updateUserPassword) //Route pour modifier les infos de l'utilisateur
router.delete('/:id', auth, userCtrl.deleteUser) //Route pour supprimer un utilisateur
module.exports = router