<template>
    <main class="container mt-2">

        <!-- ZONE DE SAISIE D'UNE PUBLICATION -->
        <input v-on:click="toggleCreatePost" type="text" placeholder="Votre publication" class="form-control mb-2 w-100" >

        <div class="card mb-2 border-2 border-secondary" v-for="(post) in posts" v-bind:key="post.id">
            <!-- L UTILISATEUR QUI A PUBLIE -->
            <section class="card-title d-flex justify-content-between mb-2 bg-secondary" id='user-infos'>
                <div class="d-flex">
                    <img v-if="post.user.picture_url" :src="post.user.picture_url" class="card-img-top profil-picture rounded-circle" alt="">
                    <img v-if="!post.user.picture_url" src="../../public/images/profil_picture.png" class="card-img-top profil-picture rounded-circle" alt=""> 
                    <div class="card-text">
                        <p class="fw-bold m-0 text-shadow"> {{ post.user.firstname }} {{ post.user.name }}  </p>
                        <small class=" m-0"> Publiée le {{ post.createdAt }} </small>
                    </div>
                </div>
            </section>

             <!-- MENU PUBLICATIONS -->
                <nav v-if="user.is_moderator==1 || user.id==post.userCreatingId" class="nav-item dropdown me-2 rounded-circle  icone-menu-post">
                    <div class="btn rounded-circle text-center " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        <i class="fas fa-ellipsis-v align-middle text-white"></i>
                    </div>
                    <ul class="dropdown-menu bg-dark post-menu ">
                        <li v-if="user.id==post.user.id" v-on:click="toggleUpdatePost(post)" class="dropdown-item text-white"><i class="fa fa-paste"></i> Modifier </li>
                        <li><hr class="dropdown-divider text-white"></li>
                        <li v-if="user.is_moderator==1 || user.id==post.user.id" @click="removePost(post)" class="dropdown-item text-white"><i class="fa fa-trash-o"></i>  Supprimer </li>
                    </ul>
                </nav>

                         
             <!-- PUBLICATIONS  -->
            <section class="card-body" >
                
                <div class="card-text p-0 mx-auto" id="post">
                    <p class="card-text rounded px-3" style="white-space: pre-line;"> {{ post.content }} </p>
                    <div v-if="post.urlMedia" class="card-img mb-2 w-100 text-center"><img :src="post.urlMedia" class="w-75" ></div>
                </div>                

                <div class="w-100 p-1 d-flex justify-content-between like-line">
                    <button v-on:click="showComments(post)" class="btn btn-secondary rounded " >
                        <i class="far fa-comment-alt border-light mr-1"></i>
                        Commenter
                    </button>
                </div>
            </section>

             <!-- COMMENTAIRES -->
            <section  v-bind:id="post.id" class="card mb-2 pt-2 border-2 d-none w-100" >
                
                <!-- FORMULAIRE DE SAISIE D'UN COMMENTAIRES -->
                <form @submit.prevent="addComment(post)" class="d-flex" name="form-new-comment">
                    <input type="text" v-model.trim="textOfComment" class="form-control m-2 " placeholder="Votre commentaire">
                    <button class="btn py-0 px-3 me-2 mt-2 border border-secondary rounded text-align-center">Ajouter</button>
                </form>

                <!-- LISTE DES COMMENTAIRES -->
                <div v-for="(comment, index) in comments" v-bind:key="comment.id" class="card-body d-flex mb-0 p-0 fst-italic">
                    <div v-if="comment.postCommentedId==post.id" class="comment d-flex border rounded mx-2 my-1 fs-6">
                    
                        <div id="picture-profil">
                            <img v-if="!comment.user.picture_url" src="../../public/images/profil_picture.png" class="card-img-top profil-picture rounded-circle" alt=""> 
                            <img v-if="comment.user.picture_url" :src= "comment.user.picture_url" class="card-img-top profil-picture rounded-circle" alt="" >
                        </div>

                        <div id="user-commented">
                            <div class="px-2 rounded fsize-1 d-flex justify-content-between ">
                                <!-- UTILISATEUR QUI A COMMENTE -->
                                <small class="fw-bold m-0 pt-2"> {{comment.user.firstname }} {{ comment.user.name }} </small>
                                
                                <!-- MENU DES COMMENTAIRES -->
                                <nav v-if="user.is_moderator==1 || user.id==comment.user.id" class="nav-item dropdown">
                                    <span class="rounded-circle bg-light text-center me-2 "  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                        <i class="fas fa-ellipsis-v align-middle"></i>
                                    </span>
                                    <ul class="dropdown-menu">
                                        <li v-if="user.is_moderator==1 || user.id==comment.user.id" @click="removeComment(comment, post)" class="dropdown-item" ><i class="fa fa-trash-o"></i> Supprimer</li>
                                        <li v-if="user.id==comment.user.id" @click="showInputModifyComment(index)" class="dropdown-item" ><i class="fa fa-edit"></i> Modifier</li>
                                    </ul>
                                </nav>
                                   
                            </div>
                            <p v-if="!modifyOn" v-on:dblclick="showInputModifyComment(index)" class="card-text bg-light rounded fs-6"> {{ comment.content }} </p> 
                            <input v-else v-bind:value="comment.content" v-on:keyup="updateComment(index, $event)" type="text" class="w-75">
                        </div>
                    </div>
                
                </div>
            </section>

        </div>

        <div class="w-75 p-2 bg-secondary" id="update-comment-div">
            <input type="text" v-model.trim="textOfComment" class="form-control m-2 w-75 mx-auto" placeholder="Votre commentaire">
        </div>
        
        <Createpost v-bind:reveleCreatePost="reveleCreatePost" v-bind:toggleCreatePost="toggleCreatePost" :post="post" @custom-event="gettingPosts"></Createpost>
    </main>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import Createpost from './Createpost.vue'    

    export default {
        name: 'Publications',
        components: {
            Createpost
        },
        data () {
            return {
                posts: [],
                comments: [],
                user_id:"",  //L'utilisateur qui est connecté
                textOfComment:'',
                reveleCreatePost: false, //pour cacher la fenêtre modale de création des posts
                post: "",
                modifyOn: false //pour vérifier si on doit modifier un commentaire
            }
        },
        created() {
            this.user_id=this.user.id
            this.gettingPosts() //Cette commande appelle la méthode qui récupère tous les posts 

        },
        computed: {
            ...mapGetters(['user'])

        },
        methods: {

            // Ouvrir/fermer la fenêtre modale de création des posts
            toggleCreatePost(){   
                //this.post = ""
                this.reveleCreatePost = !this.reveleCreatePost
            },

            // Ouvrir/fermer la fenêtre modale de modification des posts
            toggleUpdatePost(post) {
                this.post = post
                this.reveleCreatePost = !this.reveleCreatePost
            },

            //Récupèration de tous les posts
            gettingPosts() { 
                axios.get('/posts/') 
                .then (res => { this.posts = res.data })
                .catch (err => console.log(err))
            },

            //suppression d'un post
            removePost(post) {
                axios.delete(`/posts/deletePost/${post.id}`) 
                .then(() => this.gettingPosts())
                .catch (err => console.log(err))
            },

            //Affichage des commentaires
            showComments(post) {
                this.modifyOn = false
                document.getElementById(`${post.id}`).classList.remove('d-none')
                this.gettingComments(post)
            },

            //Récupèration tous les commentaires d'un post
            gettingComments(post) { 
                axios.get(`/comments/getComments/${post.id}`) 
                .then (res => this.comments = res.data )
                .catch (err => console.log(err))
            },

            //Affiche zone de saisie pour modifier un commentaire
            showInputModifyComment() {
                this.modifyOn = true
            },

            //Modification d'un commentaire
            updateComment(index, $event) {
                if ($event.key == "Enter") {
                    let value = event.target.value
                    this.comments[index].content = value
                    axios.put(`comments/updateComment/${this.comments[index].id}`, this.comments[index])
                    .then( () => this.modifyOn = false)
                    .catch (err => console.log(err))
                }
            },

            //Ajout d'un commentaire à un post
            addComment(post) {
                if(this.textOfComment ) {
                    axios.post('comments/addComment', {
                        textOfComment: this.textOfComment,
                        userId: this.user.id,
                        postId: post.id
                    })
                    .then (() => { 
                        this.textOfComment=""
                        this.gettingComments(post) 
                    })
                    .catch (err => console.log(err))
                }
            },

            //suppression d'un commentaire
            removeComment(comment, post) {
                axios.delete(`/comments/deleteComment/${comment.id}`) 
                .then(() => this.gettingComments(post))
                .catch (err => console.log(err))
            }                   
        }
    }
</script>

<style scoped>
    
    i {
        font-size: 1rem;
    }
    .like-line {
        background-color: rgb(211, 211, 240)
    }
    button {
        height: 40px;
    }
    .icone-menu-post {
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 995;
        height: 30px !important;
        
    }
    .icone-menu.comment {
        width: 25px;
        height: 25px;
        position: absolute;
        right: 0px;
        
        z-index: 995;
    }
    #user-commented {
        width: 90% !important;
    }
    .comment {
        width: 100%;
    }
    
    #update-comment-div {
        height: 200px;
        
    }
</style>
