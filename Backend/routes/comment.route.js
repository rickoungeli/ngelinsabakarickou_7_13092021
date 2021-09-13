const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const commentCtrl = require('../controllers/comments.controllers')


/* ROUTES POUR LA GESTION DES SAUCES */

router.get('/getComments/:id', auth, commentCtrl.getComments) //Route pour recupérer tous les commentaires d'un post
router.post('/addComment', auth, commentCtrl.addComment) //Route pour ajouter un commentaire 
router.delete('/deleteComment/:id', auth, commentCtrl.deleteComment)
 

/*
router.get("/:id", auth, postCtrl.EnvoyerUnPost) //Route pour renvoyer la sauce ayant l'ID fourni
router.delete("/:id", auth, postCtrl.supprimerSauce) //Route pour supprimer la sauce ayant l'ID fourni
router.post("/:id/like", auth, postCtrl.aimerSauce) //Route pour définir le statut "J'aime" pour userID fourni
*/

module.exports = router


