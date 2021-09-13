const express = require('express')
const bodyParser = require('body-parser')
const path = require("path") //le plugin path nous donne accès aux chemins de notre système de fichier
const cors = require('cors')
require('dotenv').config({path: './config/.env'})
require('./models/models')

const app = express()
const port = process.env.PORT
const postRoutes = require('./routes/post.route')
const commentRoutes = require('./routes/comment.route')
const userRoutes = require('./routes/user.route')


//Middlewares Express
app.use(bodyParser.urlencoded({ extended: true})) //permet de récupérer les données envoyées via un formulaire
app.use(bodyParser.json())
app.use(cors())
//app.use(favicon(_dirname + '/favicon.png'))


//Ici nous plaçons nos middlewares
app.use("/images", express.static(path.join(__dirname, 'images')))
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)


app.listen(port, ()=> console.log(`Listening on port ${port}`))