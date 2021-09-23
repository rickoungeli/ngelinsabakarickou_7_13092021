const model = require('../models/models')


//Middleware pour ajouter un commentaire
exports.addComment = (req, res, next) => {
    console.log('demande ajout de commentaire')
    model.Comment.create({
        //urlMedia: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        content: req.body.textOfComment,
        userCommentingId: req.body.userId,
        postCommentedId: req.body.postId
    })
    .then((comment) => {res.status(201).send({comment, 'message': 'commentaire enregistrée'})})
    .catch(error => res.status(400).send({ error }))
}

//Middleware (fonction) pour recupérer tous les commentaires d'un post
exports.getComments = (req, res, next) => {
    model.Comment.findAll({
        include: [{ model: model.User, required: true } ],
        where: { postCommentedId: req.params.id },
        order: [['created_at', 'DESC']]
    })
    .then( comments => res.status(200).json(comments))
    .catch(error => res.status(400).send({ error }))
}

//Middleware (fonction) pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    model.Comment.destroy({where: { id: req.params.id }})
    .then( (comment) =>{res.status(200).send({ 'message': 'Commentaire supprimé'})})
    .catch(error => {res.status(400).send({ error })})
}

//Fonction pour modifier un commentaire
exports.updateComment = (req, res, next)=>{ 
    model.User.update({ ...req.body }, {where: {id: req.params.id }})
    .then( () => {
        model.User.findOne({ where: {id: req.params.id} })
        .then((user) => res.status(200).json({'message':'informations modifiée'}))
        .catch(error => res.status(400).send({ error  }))
    })
    .catch(error => res.status(400).send({ error  }))
}