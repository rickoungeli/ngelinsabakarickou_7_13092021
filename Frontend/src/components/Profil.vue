<template>
    <div class="container text-center">
        <h2>Votre profil</h2>
        <small class="title7">Cliquez sur la photo pour modifier</small>
        <div class="photo" @click="showFileInput">
            <p v-if="!picture.url">Votre photo</p>
            <img v-if="picture.url" :src="picture.url" class="w-100 rounded-circle"> 
        </div>
        <div class="d-flex d-none" id="file-input">
            <input type="file" @change="pictureSelected" >
            <button @click="updatePicture">Télécharger</button>
        </div>
        
        <hr/>
        <section>
            <p> Mes informations <i class="fa fa-edit ms-3" @click="showInfos1Div(user)"></i></p>
            <div class="container">
                <div class="text-start w-100" id="infos">
                    <p class="w-100"><span class="w-25"> Prénom : </span><span class="border-bottom">{{ user.firstname}} </span></p> 
                    <p class="w-100"><span class="w-25"> Nom : </span><span class="border-bottom">{{ user.name}} </span></p>
                    <p class="w-100"><span class="w-25"> Email : </span><span class="border-bottom">{{ user.email}} </span></p>
                </div>
                <form @submit.prevent="updateInfos" class=" text-start mx-auto d-none" id="infos-1">
                    <div class="form-group mb-2 d-flex">
                        <label class="w-25"> Prénom : </label>
                        <div class="d-flex flex-column w-75">
                            <input v-model.trim="infos.firstname" type="text" class="form-control p-0 m-0 w-100" id="firstname"> 
                            <p class="title7 text-danger d-none mb-0" id="message-firstname">{{message.firstname}}</p>
                        </div>
                    </div>

                    <div class="form-group mb-2 d-flex">
                        <label class="w-25"> Nom : </label>
                        <div class="d-flex flex-column w-75">
                            <input v-model.trim="infos.name" type="text" class="form-control p-0 m-0 w-100" id="name">
                            <p class="title7 text-danger d-none mb-0" id="message-name">{{message.name}}</p>
                        </div>
                    </div>

                    <div class="form-group d-flex  mb-2">
                        <label class="w-25"> Email : </label>
                        <div class="d-flex flex-column w-75">
                            <input v-model.trim="infos.email" type="text" class="form-control p-0 m-0 w-100" id="email">
                            <p class="title7 text-danger d-none mb-0" id="message-email">{{message.email}}</p>
                        </div>
                    </div>

                    <p v-if="error.infos" class="alert alert-danger" >Il y a des erreurs, veuillez vérifier votre saisie</p>
                    <button class="btn btn-secondary w-25">Valider</button>
                </form>
            </div>
        </section>
        <hr/>

        <section id="modif-password">
            <a @click="showPasswordForm" href="#"> Modifier mon mot de passe :  </a>
                <form @submit.prevent="updatePassword" class=" text-start mx-auto d-none" id="password-form">
                    <div class="form-group mb-2 d-flex">
                        <label class="w-25"> Ancien : </label>
                        <div class="d-flex flex-column w-75">
                            <input v-model.trim="password.old" type="password" class="form-control p-0 m-0 w-100" id="oldpwd"> 
                            <p class="title7 text-danger d-none mb-0" id="message-oldpwd">{{message.oldPwd}}</p>
                        </div>
                    </div>

                    <div class="form-group mb-2 d-flex">
                        <label class="w-25"> Nouveau : </label>
                        <div class="d-flex flex-column w-75">
                            <input v-model.trim="password.new" type="password" class="form-control p-0 m-0 w-100" id="newpwd-1">
                            <p class="title7 text-danger d-none mb-0" id="message-newpwd-1">{{message.newPwd}}</p>
                        </div>
                    </div>

                    <div class="form-group d-flex  mb-2">
                        <label class="w-25"> Confirmer : </label>
                        <div class="d-flex flex-column w-75">
                            <input v-model.trim="password.confirm" type="password" class="form-control p-0 m-0 w-100" id="newpwd-2">
                            <p class="title7 text-danger d-none mb-0" id="message-newpwd-2">{{message.newPwd2}}</p>
                        </div>
                    </div>

                    <p v-if="error.password" class="alert alert-danger" >Il y a des erreurs, veuillez vérifier votre saisie</p>
                    <button class="btn btn-secondary w-25">Valider</button>
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
                picture: {
                    url: "",
                    file: null,
                },

                infos: {
                    firstname: "",
                    name: "",
                    email: "",
                },

                password: {
                    old: "",
                    new: "",
                    confirm: "",
                },

                message: {
                    firstname: "",
                    name: "",
                    email: "",
                    oldPwd: "",
                    newPwd: "",
                    newPwd2: ""
                },

                error: {
                    infos: false,
                    password: false
                }
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        mounted() {
            this.picture.url = this.user.picture_url
        },
        updated() {
            this.picture.url = this.user.picture_url
            document.querySelector('#file-input').classList.add('d-none')
        },

        methods: {
            pictureSelected(e) {
                this.picture.file = e.target.files[0]
            },

            showFileInput() {
                let fileInput = document.getElementById('file-input')
                fileInput.classList.toggle('d-none')
            },
            showInfos1Div(user) {
                this.infos.firstname = user.firstname
                this.infos.name = user.name
                this.infos.email = user.email
                this.toggleDivInfos()
            },

            showPasswordForm() {
                document.getElementById('password-form').classList.toggle('d-none')
            },

            toggleDivInfos() {
                document.getElementById('infos').classList.toggle('d-none')
                document.getElementById('infos-1').classList.toggle('d-none')
            },
            
            gettingUser() {
                let userId = this.user.id
                console.log(userId);
                axios.get(`/users/${userId}`)
                .then((user) => this.$store.dispatch('user', user.data))
                .catch (err => console.log(err))
            },

            updatePicture() {
                const newPicture = new FormData()
                newPicture.append('image', this.picture.file, this.picture.file.name)
                newPicture.append('userId', this.user.id)
                axios.put(`users/${this.user.id}/updateUserPicture`, newPicture)
                .then(() => { 
                    this.gettingUser()
                })
                .catch (err => console.log(err))
            },
            updateInfos() {
                this.checkInfosInput()
                axios.put(`users/${this.user.id}/updateUserInfos`, {
                    firstname: this.infos.firstname,
                    name: this.infos.name,
                    email: this.infos.email
                })
                .then(() => {
                    this.toggleDivInfos()
                    this.gettingUser() 
                })
                .catch (err => console.log(err))
            },

            updatePassword(){
                this.checkPasswordInput()
                if(!this.error.password){
                    axios.put(`users/${this.user.id}/updateUserPassword`, { 
                        oldPwd: this.password.old,
                        newPwd: this.password.new 
                    })
                    .then(() => this.showPasswordForm())
                    .catch (err => console.log(err))
                }
            },

            checkPasswordInput() {
                if(!this.password.old) {
                    this.error.password = true
                    this.message.oldPwd = "Le mot de passe ne peut pas être vide"
                    document.querySelector('#message-oldpwd').classList.remove('d-none') 
                    document.querySelector('#oldpwd').classList.add('border-danger') 
                }
                else if(this.password.old && (this.password.old.length<3 || this.password.old.length>20)) {
                    this.error.password = true
                    this.message.oldPwd = "Le mot de passe doit avoir entre 3 et 20 caractères"
                    document.querySelector('#message-oldpwd').classList.remove('d-none') 
                    document.querySelector('#oldpwd').classList.add('border-danger') 
                }
                else {
                    this.error.password = false
                    document.querySelector('#message-oldpwd').classList.add('d-none') 
                    document.querySelector('#oldpwd').classList.remove('border-danger') 
                }

                if(!this.password.new) {
                    this.error.password = true
                    this.message.newPwd = "Le  nouveau mot de passe ne peut pas être vide"
                    document.querySelector('#message-newpwd-1').classList.remove('d-none') 
                    document.querySelector('#newpwd-1').classList.add('border-danger') 
                }
                else if(this.password.new && (this.password.new.length<3 || this.password.new.length>20)) {
                    this.error.password = true
                    this.message.newPwd = "Le nouveau mot de passe doit avoir entre 3 et 20 caractères"
                    document.querySelector('#message-newpwd-1').classList.remove('d-none') 
                    document.querySelector('#newpwd-1').classList.add('border-danger') 
                }
                else {
                    this.error.password = false
                    document.querySelector('#message-newpwd-1').classList.add('d-none') 
                    document.querySelector('#newpwd-1').classList.remove('border-danger') 
                }

                if(!this.password.confirm) {
                    this.error.password = true
                    this.message.newPwd2 = "Le  nouveau mot de passe ne peut pas être vide"
                    document.querySelector('#message-newpwd-2').classList.remove('d-none') 
                    document.querySelector('#newpwd-2').classList.add('border-danger') 
                }
                else if(this.password.confirm && (this.password.confirm.length<3 || this.password.confirm.length>20)) {
                    this.error.password = true
                    this.message.newPwd2 = "Le nouveau mot de passe doit avoir entre 3 et 20 caractères"
                    document.querySelector('#message-newpwd-2').classList.remove('d-none') 
                    document.querySelector('#newpwd-2').classList.add('border-danger') 
                }
                else {
                    if( this.password.confirm !== this.password.new) {
                        this.error.password = true
                        this.message.newPwd2 = "Les mots de passe ne correspondent pas"
                        document.querySelector('#message-newpwd-2').classList.remove('d-none') 
                        document.querySelector('#newpwd-2').classList.add('border-danger') 
                    }
                    else {
                    this.error.password = false
                        document.querySelector('#message-newpwd-2').classList.add('d-none') 
                        document.querySelector('#newpwd-2').classList.remove('border-danger') 
                    }
                }

                

            },

            checkInfosInput() {
                if(!this.infos.firstname) {
                    this.error.infos = true
                    this.message.firstname = "Le prénom ne peut pas être vide"
                    document.querySelector('#message-firstname').classList.remove('d-none') 
                    document.querySelector('#firstname').classList.add('border-danger') 
                }
                else if(this.infos.firstname && (this.infos.firstname.length<2 || this.infos.firstname.length>30)) {
                    this.error.infos = true
                    this.message.firstname = "Le prénom doit avoir entre 2 et 30 caractères"
                    document.querySelector('#message-firstname').classList.remove('d-none') 
                    document.querySelector('#firstname').classList.add('border-danger') 
                }
                else {
                    this.error.infos = false
                    document.querySelector('#message-firstname').classList.add('d-none') 
                    document.querySelector('#firstname').classList.remove('border-danger') 
                }

                if(!this.infos.name) {
                    this.message.name = "nom ne peut pas être vide"
                    document.querySelector('#message-name').classList.remove('d-none') 
                    document.querySelector('#name').classList.add('border-danger') 
                    this.error.infos = true
                }
                else if(this.infos.name && (this.infos.name.length<2 || this.infos.name.length>50)) {
                    this.message.name = "Le nom doit avoir entre 2 et 50 caractères"
                    document.querySelector('#message-name').classList.remove('d-none') 
                    document.querySelector('#name').classList.add('border-danger') 
                    this.error.infos = true
                }
                else {
                    this.error.infos = false
                    document.querySelector('#message-name').classList.add('d-none') 
                    document.querySelector('#name').classList.remove('border-danger') 
                }

                var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if ( !this.infos.email) {
                    this.message.email = "L'email ne peut pas être vide"
                    this.error.infos = true
                    document.querySelector('#message-email').classList.remove('d-none') 
                    document.querySelector('#email').classList.add('border-danger') 
                }
                else if ( this.infos.email && !regex.test(this.infos.email) ) {
                    this.message.email = "L'email est incorrect"
                    this.error.infos = true
                    document.querySelector('#message-email').classList.remove('d-none') 
                    document.querySelector('#email').classList.add('border-danger') 
                }
                else {
                    this.error.infos = false
                    document.querySelector('#message-email').classList.add('d-none')
                    document.querySelector('#email').classList.remove('border-danger')  
                }
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