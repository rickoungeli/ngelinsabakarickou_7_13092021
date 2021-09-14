const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const commentCtrl = require('../controllers/comments.controllers')


/* ROUTES POUR LA GESTION DES COMMENTAIRES */

router.get('/getComments/:id', auth, commentCtrl.getComments) //Route pour recupérer tous les commentaires d'un post
router.post('/addComment', auth, commentCtrl.addComment) //Route pour ajouter un commentaire 
router.delete('/deleteComment/:id', auth, commentCtrl.deleteComment)
router.put('/updateComment/:id', auth, commentCtrl.updateComment)
 

module.exports = router