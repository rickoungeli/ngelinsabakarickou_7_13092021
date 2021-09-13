const jwt = require('jsonwebtoken')
const RANDOM_TOKEN_SECRET = process.env.DB_RANDOM_TOKEN_SECRET

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable'
        } else {
            next()
        }
    } catch (error){
        res.status(400).send({'erreur': "Requête non authentifiée " + error})
    }
}
