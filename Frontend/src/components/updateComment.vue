<template>
    <main class="bloc-modale" v-if="reveleCreatePost">

        <section v-on:click="toggleCreatePost" class="overlay">

        </section>

        <section class="modale card container">
            <div class="d-flex ">
                <span v-on:click="toggleCreatePost" class="px-3 "><i class="fas fa-angle-double-left"></i></span>
                <p v-if="!post">Nouvelle publication</p>  
                <p v-if="post">Modifier une publication</p>     
            </div>
         
            <form @submit.prevent="handleSubmit" class="form">
                <textarea  v-if="!post" v-model.trim="textOfPost" class="form-control my-2" style="min-height: 150px;"></textarea>
                <textarea  v-if="post" v-model.trim="content" class="form-control my-2" style="min-height: 150px;"></textarea>
                
                <img v-if="!post" :src="imageUrl" class="d-block w-25" alt="Image">
                <img v-if="post" :src="post.urlMedia" class="d-block w-25" alt="Image">
                
                <input type="file" @change="onFileSelected">
                
                <button class="btn px-3 ml-2 border border-secondary rounded text-align-center">
                    <span v-if="!post"><i class="fas fa-external-link-alt"></i> Publier</span>
                    <span v-if="post"><i class="fas fa-check-circle"></i> Valider</span>
                </button>
            </form>
        </section>

    </main>
</template>
<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Createpost',
        props: ['reveleCreatePost', 'toggleCreatePost', 'post'],
        data() {
            return {
                textOfPost: "",
                selectedFile: null,
                content: "",
                viewUrl: ""
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        
        updated() {
            var ctx = this
            setTimeout(function(){
                ctx.content = ctx.post.content
            }, 200)
        },
        
        methods: {
            onFileSelected(e) {
                this.selectedFile = e.target.files[0]
                console.log(this.selectedFile);
                this.viewUrl = '/'+ this.selectedFile.name
               
            },

            handleSubmit() {
                
                //Cas nouvelle publication
                if (!this.post) {
                    const newPost = new FormData()
                    if(this.textOfPost != "" && this.selectedFile != null) {
                        newPost.append('image', this.selectedFile, this.selectedFile.name)
                        newPost.append('textOfPost', this.textOfPost)
                        newPost.append('userId', this.user.id)
                        axios.post('posts/createPost', newPost)
                        .then ( ()=> {
                            this.emitCustomEvent(newPost) //Ici j'appelle la méthode du même nom
                            this.toggleCreatePost() //Ici j'appelle la méthode toggleModale envoyé à travers le props par le composant parent
                        })
                        .catch (err => console.log(err))
                    }
                    if(this.textOfPost != "" && this.selectedFile == null) {
                        console.log('bon matin');
                        axios.post('posts/createPost', {
                            textOfPost: this.textOfPost,
                            userId: this.user.id
                        })
                        .then ( ()=> {
                            this.emitCustomEvent(newPost) //Ici j'appelle la méthode du même nom
                            this.toggleCreatePost() //Ici j'appelle la méthode toggleModale envoyé à travers le props par le composant parent
                        })
                        .catch (err => console.log(err))
                    }
                    
                }

                //Cas modification d'une publication
                if (this.post) {
                    const newPost = new FormData()
                    if(this.textOfPost != "" || this.selectedFile != null) {
                        newPost.append('image', this.selectedFile, this.selectedFile.name)
                        newPost.append('textOfPost', this.textOfPost)
                        axios.put(`posts/updatePost/${this.post.id}`, newPost)
                        .then ( ()=> {
                            this.emitCustomEvent(newPost) 
                            this.toggleCreatePost() 
                        })
                        .catch (err => console.log(err))
                    }
                    if(this.textOfPost !== "" && this.selectedFile === null) {
                        axios.put(`posts/updatePost/${this.post.id}`, {
                            textOfPost: this.textOfPost,
                        })
                        .then ( ()=> {
                            this.emitCustomEvent(newPost) 
                            this.toggleCreatePost() 
                        })
                        .catch (err => console.log(err))
                    }
                    this.$route=null
                }
            },
            
            emitCustomEvent(newPost) { //Cette méthode crée et émet un événément personnalisé 
                    this.textOfPost = ""
                    this.$emit('custom-event', newPost)
            },
        }
    }
</script>

<style>
    .bloc-modale {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modale {
        background: #f1f1f1;
        color: #333;
        padding: 10px 50px 50px 50px;
        position: fixed;
        top: 20%;
    }
    main, textarea {
        font-size: 15px !important;
    }
    

</style>