const { Sequelize } = require('sequelize') //Importation de l'objet DataTypes qui contient les types disponibles dans sequelize pour définir les types de données contenues dans les propriétés des models
//const fr = require('fs')
//const basename = path.basename(_filename)


//Connexion à la bdd
const sequelize = new Sequelize(process.env.DB_DATABASENAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

try {
    sequelize.authenticate()
    console.log('La connexion à la bade de données à réussi')
} catch(error) {
    console.error('Impossible de se connecter à la base de données', error)
}

//const exports = module.exports = {}
//exports.sequelize = sequelize

//Création du modèle USER
const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING(50), allowNull: false },
    firstname: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(255), allowNull: false },
    picture_url: { type: Sequelize.STRING(255) },
    is_moderator: { type: Sequelize.INTEGER, allowNull: false }
},
{
    timestamps: true, createdAt: 'created', updatedAt: false, underscored: true
})
exports.User = User


//Création du modèle POST
const Post = sequelize.define('post', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: Sequelize.TEXT, allowNull: true },
    urlMedia: { type: Sequelize.STRING(255) },
    userCreatingId: { type: Sequelize.INTEGER, allowNull: false },
    liked: { type: Sequelize.INTEGER(255), allowNull: true }
},
{ timestamps: true, underscored: true })
exports.Post = Post


//Création du modèle COMMENT pour table commentaire
const Comment = sequelize.define('comment', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: Sequelize.TEXT, allowNull: true },
    userCommentingId: { type: Sequelize.INTEGER, allowNull: false },
    postCommentedId: { type: Sequelize.INTEGER, allowNull: false }    
},
{ timestamps: true, underscored: true })
exports.Comment = Comment

//Création des relations entre les tables
User.hasMany(Post, {foreignKey: 'userCreatingId'});//l'utilisateur peux avoir plusieurs Commentaires
Post.belongsTo(User, {foreignKey: 'userCreatingId'})
User.hasMany(Comment, {foreignKey: 'userCommentingId'});//un utilisateur peux avoir plusieurs Commentaires
Comment.belongsTo(User, {foreignKey: 'userCommentingId'})
//On demande à sequelize de générer les tables
sequelize.sync()