const model = require('../models/models')
const fs = require('file-system')

//Middleware (fonction) pour créer un post
exports.createPost = (req, res, next) => {
    let urlMedia
    if(req.file) { urlMedia= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} else {urlMedia=""}
   
    model.Post.create({
        urlMedia: urlMedia,
        content: req.body.textOfPost,
        userCreatingId: req.body.userId,
        liked: 0
    })
    .then(post => res.status(201).send({ 'message': 'publication enregistrée'}))
    .catch(error => res.status(400).send({ error }))  
}

//Middleware (fonction) pour renvoyer tous les posts au frontend (méthode GET sur la route '/')
exports.getAllPosts = (req, res, next)=>{ 
    model.Post.findAll({
        //Je récupère tous les posts avec les infos du user-creator pour chaque post
        include: [{ model: model.User, required: true } ],
        order: [['created_at', 'DESC']]
    })
    .then(posts => { 
        res.status(200).send(posts)
    })
    .catch(error => {
        console.log("voici l'erreur : " + error)
        res.status(400).send({ error })
    })
}

//Middleware (fonction) pour supprimer un post
exports.deletePost = (req, res, next) => {
    console.log(req.params.id);

    //Suppression des commentaires joints
    model.Comment.destroy({where: { postCommentedId: req.params.id }})
    .then( () => {
        //Suppression de l' image jointe
        model.Post.findOne({where: { id: req.params.id }})
        .then((post) => {
            const filename = post.urlMedia.split("/images")[1]
            fs.unlink(`images/${filename}`, () => {
                model.Post.destroy({where: { id: req.params.id }})
                .then( () =>res.status(200).send({ 'message': 'Post supprimé'}))
                .catch(error => {
                    console.log(error);
                    res.status(400).send({ error })
                })
            } )
        })
        .catch(error => { res.status(400).send({ error })  })
    })
    .catch(error => { res.status(400).send({ error }) })
}

//Middleware (fonction) pour modifier un post
exports.updatePost = (req, res, next) => {
    console.log(req.body);
    console.log(req.file)
    console.log('Bonsoir')
    if(req.file) {
        model.Post.update({
                urlMedia: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                content: req.body.textOfPost
            },
            {where: { id: req.params.id }
        })
        .then( () =>res.status(200).send({ 'message': 'Post supprimé'}))
        .catch(error => {
            console.log(error);
            res.status(400).send({ error })
        })
    }
    else {
        model.Post.update({ content: req.body.textOfPost}, {where: { id: req.params.id }})
        .then( () =>res.status(200).send({ 'message': 'Post supprimé'}))
        .catch(error => {
            console.log(error);
            res.status(400).send({ error })
        })       
    }
}



