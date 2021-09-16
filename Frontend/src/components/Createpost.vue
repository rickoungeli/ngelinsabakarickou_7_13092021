<template>
    <main class="bloc-modale" v-if="reveleCreatePost">

        <section v-on:click="closeModale" class="overlay" id="section-overlay">

        </section>

        <transition name="fade">
        <section class="modale card container" id="section-modale">
            <div class="d-flex " id="entete">
                <span v-on:click="closeModale" class="px-3 "><i class="fas fa-angle-double-left"></i></span>
                <p v-if="!post">Nouvelle publication</p>  
                <p v-if="post">Modifier une publication</p>     
            </div>
         
            <form @submit.prevent="createPost" v-if="!post" class="form" id="new-post-form">
                <textarea  v-model.trim="content" class="form-control my-2" style="min-height: 150px;"></textarea>
                
                <img v-if="picture" :src="pictureUrl" width="170px" class="d-block w-25" alt="Image">
                
                <input type="file" @change="loadPicture">
                <button class="btn px-3 ml-2 border border-secondary rounded text-align-center">
                    <span ><i class="fas fa-external-link-alt"></i> Publier</span>
                </button>
            </form>

            <form @submit.prevent="updatePost" v-if="post" class="form" id="update-post-form">
                <textarea  :value="post.content" class="form-control my-2" style="min-height: 150px;"></textarea>
                
                <img v-if="!picture" :src="post.urlMedia" width="70px" class="d-block w-25" alt="Image">
                <img v-if="picture" :src="pictureUrl" width="70px" class="d-block w-25" alt="Image">
                
                <input type="file" @change="loadPicture">
                <button class="btn px-3 ml-2 border border-secondary rounded text-align-center">
                    <span ><i class="fas fa-check-circle"></i> Valider</span>
                </button>
            </form>
        </section>
        </transition>

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
                content: "",
                picture: null,
                pictureUrl: "", 
            }
        },
        computed: {
            ...mapGetters(['user']),
            //...mapGetters(['attachedFile'])
        },
        
        
        methods: {
            closeModale() {
                this.content = ""
                this.picture = null
                //this.pictureUrl = ""
                this.toggleCreatePost()
            },

            loadPicture(event) {
                if(event.target.files.length === 0) {return}
                this.picture = event.target.files[0]
                
                let reader = new FileReader()
                
                //reader.addEventListener("load", function () {
                reader.onLoad = function () {
                    console.log('bonjour');
                    console.log(event.target.result);
                    this.pictureUrl = reader.result
                    //this.$store.dispatch('attachedFile', this.pictureUrl)
                }
                //Lecture du fichier
                reader.readAsDataURL(this.picture)
                console.log(this.picture.name);
            },

            createPost() {
                let data
                const newPost = new FormData()
                if(this.picture) {
                    console.log(this.picture);
                    newPost.append('image', this.picture, this.picture.name)
                    newPost.append('textOfPost', this.content)
                    newPost.append('userId', this.user.id)
                    data = newPost
                    axios.post('posts/createPost', newPost)
                    .then ( ()=> this.emitCustomEvent(data))
                    .catch (err => console.log(err))
                }
                if(!this.picture) {
                    data = { textOfPost: this.content, userId: this.user.id}
                    console.log(data);
                    
                    axios.post('posts/createPost', data )
                    .then ( ()=> this.emitCustomEvent(data))
                    .catch (err => console.log(err))
                    
                }
                this.$route=null
            },
            
            updatePost(event) {
                let data
                const newPost = new FormData()
                if(this.picture) {
                    newPost.append('image', this.picture, this.picture.name)
                    newPost.append('textOfPost', event.target[0].value)
                    data = newPost
                    axios.put(`posts/updatePost/${this.post.id}`, newPost)
                    .then ( ()=> this.emitCustomEvent(data))
                    .catch (err => console.log(err))
                }
                if(!this.picture) {
                    data = { textOfPost: event.target[0].value }
                    axios.put(`posts/updatePost/${this.post.id}`, data)
                    .then ( ()=> this.emitCustomEvent(data))
                    .catch (err => console.log(err))
                }
                
                //this.$route=null
            },

            emitCustomEvent(data) { //Cette méthode crée et émet un événément personnalisé 
                this.$emit('custom-event', data)
                this.toggleCreatePost() 
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

    
   .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>