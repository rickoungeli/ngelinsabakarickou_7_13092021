const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const postCtrl = require('../controllers/posts.controllers')


/* ROUTES POUR LA GESTION DES SAUCES */
router.get('/', auth, postCtrl.getAllPosts) //Route pour renvoyer le tableau de toutes les sauces de la bdd
router.post('/createPost', auth, multer, postCtrl.createPost) //Route pour créer une nouvelle publication 
router.delete('/deletePost/:id', auth, postCtrl.deletePost)
router.put("/updatePost/:id", auth, multer, postCtrl.updatePost) //Route pour renvoyer la sauce ayant l'ID fourni


/*

router.delete("/:id", auth, postCtrl.supprimerSauce) //Route pour supprimer la sauce ayant l'ID fourni
router.post("/:id/like", auth, postCtrl.aimerSauce) //Route pour définir le statut "J'aime" pour userID fourni
*/

module.exports = router


