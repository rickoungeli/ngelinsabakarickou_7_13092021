<template>
    <div class="container text-center">
        <h2>Votre profil</h2>
        <div class="photo" @click="showInput">
            <p v-if="!imageUrl">Votre photo</p>
            <img v-if="imageUrl" :src="imageUrl" class="w-100 rounded-circle"> 
        </div>
        <div class="d-flex d-none" id="file-input">
            <input type="file" @change="pictureSelected" >
            <button @click="uploadPicture">Télécharger</button>
        </div>
        
        <hr/>
        <section>
            <p> Mes informations <i class="fa fa-edit ms-3" @click="showInfoUpdate(user)"></i></p>
            <div class="">
                <div class="text-start w-100" id="mes-informations">
                    <p > Votre prénom : {{ user.firstname}} </p> 
                    <p> Votre Nom : {{ user.name}} </p>
                    <p> Votre Email : {{ user.email}} </p>
                    
                </div>
                <form @submit.prevent="changeInfos" class="text-start w-100 d-none" id="mes-informations-1">
                    <div class="form-group d-flex mb-2">
                        <label> Votre prénom : </label>
                        <input v-bind:value="firstname" type="text" class="form-control p-0 m-0"> 
                    </div>
                    <div class="form-group d-flex  mb-2">
                        <label> Votre nom : </label>
                        <input v-bind:value="name" type="text" class="form-control p-0 m-0"> 
                    </div>
                    <div class="form-group d-flex  mb-2">
                        <label> Votre email : </label>
                        <input v-bind:value="email" type="text" class="form-control p-0 m-0"> 
                    </div>
                    <div class="btn btn-secondary w-25 mx-auto">Valider</div>
                </form>
            </div>
        </section>
        <hr/>
        <section id="modif-password">
            <a @click="showPasswordForm" href="#"> Modifier mon mot de passe :  </a>
            <form @submit.prevent="changePassword" class="text-start d-none" id='form-password'>
                <div class="form-group d-flex">
                    <label>Ancien mot de passe</label>
                    <input type="password" class="form-control" v-model.trim="old_password" placeholder="Ancien mot de passe">
                </div>
                <div class="form-group d-flex">
                    <label>Nouveau mot de passe</label>
                    <input type="password" class="form-control" v-model.trim="new_password" placeholder="Mot de passe" />
                </div>
                <div class="form-group d-flex">
                    <label>Confirmer mot de passe</label>
                    <input type="password" class="form-control" v-model.trim="password_confirm" placeholder="Confirmer mot de passe" />
                </div>
                <div class="btn btn-secondary w-25 mx-auto">Valider</div>
            </form>
        </section>
        <hr/>
        <div class="btn btn-danger">Supprimer mon profil</div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'

    export default {
        name: 'Profil',
        data() {
            return {
                imageUrl: "",
                selectedFile: null,

                firstname: "",
                name: "",
                email: "",

                oldPassword: "",
                NewPassword: "",
                confirmPassword: ""
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        mounted() {
            this.imageUrl = this.user.picture_url
        },
        updated() {
            this.imageUrl = this.user.picture_url
            document.getElementById('file-input').classList.add('d-none')
        },
        methods: {
            pictureSelected(e) {
                this.selectedFile = e.target.files[0]
            },
            uploadPicture() {
                const newPicture = new FormData()
                newPicture.append('image', this.selectedFile, this.selectedFile.name)
                newPicture.append('userId', this.user.id)
                axios.put(`users/${this.user.id}/addProfilPicture`, newPicture)
                .then(() => { 
                    this.gettingUser()
                })
                .catch (err => console.log(err))
            },
            showInput() {
                let fileInput = document.getElementById('file-input')
                fileInput.classList.toggle('d-none')
            },
            showInfoUpdate(user) {
                this.firstname = user.firstname
                this.name = user.name
                this.email = user.email
                document.getElementById('mes-informations').classList.add('d-none')
                document.getElementById('mes-informations-1').classList.remove('d-none')
            },

            showPasswordForm() {
                document.getElementById('form-password').classList.remove('d-none')
            },
            
            gettingUser() {
                let userId = this.user.id
                console.log(userId);
                axios.get(`/users/${userId}`)
                .then((user) => {
                    console.log(user);
                    //this.imageUrl = user.picture_url
                    //this.store.state.user = user
                    this.$store.dispatch('user', user.data)
                })
                .catch (err => console.log(err))
            },

            changeInfos(){

            },

            changePassword(){

            },
            
        }
    }
</script>

<style scoped>
    * {
        font-size: .9rem;
    }
    .photo {
        background-color: #333;
        border-radius: 50%;
        width: 20%;
        height: 20%;
        text-align: center;
        color: white;
        
        margin: 0 auto;
        margin-bottom : 20px;
    }
    input {
        width: 60%;
    }

</style>