<template>
     <form @submit.prevent="handleSubmit" class="form w-50">
        <h3 class="text-center">Inscription</h3>
        <p class="mr-2 mb-2 fs-6 text-center">Vous avez déjà un compte? <router-link to="/login" class="nav-link p-0 fsize d-inline">Se connecter</router-link></p>
        <p v-if="error.firstname || error.name || error.email || error.password ||error.passwordConfirm || error.login" class="alert alert-danger title7 " id="message">Il y a des erreurs, veuillez vérifier votre saisie</p>
        
        <div class="form-group mb-2 mt-2 d-flex">
            <label class="w-25">Prénom</label>
            <div class="d-flex flex-column w-75">
                <input v-model.trim="user.firstname" type="text" class="form-control" id="firstname" placeholder="Prénom" />
                <p class="title7 text-danger d-none mb-0" id="message-firstname">{{message.firstname}}</p>
            </div>
        </div>
        
        <div class="form-group mb-2 mt-2 d-flex">
            <label class="w-25">Nom</label>
            <div class="d-flex flex-column w-75">
                <input v-model.trim="user.name" type="text" class="form-control" id="name" placeholder="Nom" />
                <p class="title7 text-danger d-none mb-0" id="message-name">{{message.name}}</p>
            </div>
        </div>
        
        <div class="form-group mb-2 mt-2 d-flex">
            <label class="w-25">Email</label>
            <div class="d-flex flex-column w-75">
                <input v-model.trim="user.email" type="text" class="form-control" id="email" placeholder="Email" />
                <p class="title7 text-danger d-none mb-0" id="message-email">{{message.email}}</p>
            </div>
        </div>

        <div class="form-group mb-2 d-flex">
            <label class="w-25">Mot de passe</label>
            <div class="d-flex flex-column w-75">
                <input v-model.trim="user.password" type="password" class="form-control" id="pwd" placeholder="Mot de passe" />
                <p class="title7 text-danger d-none mb-0" id="message-pwd">{{message.password}}</p>
            </div>
        </div>

        <div class="form-group mb-2 d-flex">
            <label class="w-25">Confirmer Mot de passe</label>
            <div class="d-flex flex-column w-75">
                <input v-model.trim="user.passwordConfirm" type="password" class="form-control" id="pwd-2" placeholder="Mot de passe" />
                <p class="title7 text-danger d-none mb-0" id="message-pwd-2">{{message.passwordConfirm}}</p>
            </div>
        </div>

        <button class="btn btn-primary btn-block">S'inscrire</button>

     </form>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Register',
        data() {
            return {
                user: {
                    firstname: '',
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                },
                message: {
                    firstname: '',
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                },
                error: {
                    firstname: false,
                    name: false,
                    email: false,
                    password: false,
                    passwordConfirm: false,
                    login: false
                },
            }
        },
        methods: {

            handleSubmit: function() {
                this.checkInput()
                if(!this.error.firstname && !this.error.name && !this.error.email && !this.error.password &&  !this.error.passwordConfirm) {
                    axios.post('users/signup', {
                        firstname: this.user.firstname,
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password,
                        password_confirm: this.user.passwordConfirm
                    })
                    .then (res => {
                        console.log(res);
                        this.$router.push('/login')
                    })
                    .catch (error => {
                        console.log(error);
                        this.error.login = true
                        document.querySelector('#message').innerHtml = "Il y a eu un problème"
                    })
                }
            },

            checkInput: function() {
                //Check name
                if(!this.user.firstname) {
                    this.error.firstname = true
                    this.message.firstname = "Le prénom ne peut pas être vide"
                    document.querySelector('#message-firstname').classList.remove('d-none') 
                    document.querySelector('#firstname').classList.add('border-danger') 
                }
                else if(this.user.firstname && (this.user.firstname.length<2 || this.user.firstname.length>30)) {
                    this.error.firstname = true
                    this.message.firstname = "Le prénom doit avoir entre 2 et 30 caractères"
                    document.querySelector('#message-firstname').classList.remove('d-none') 
                    document.querySelector('#firstname').classList.add('border-danger') 
                }
                else {
                    this.error.firstname = false
                    document.querySelector('#message-firstname').classList.add('d-none') 
                    document.querySelector('#firstname').classList.remove('border-danger') 
                }

                if(!this.user.name) {
                    this.error.name = true
                    this.message.name = "nom ne peut pas être vide"
                    document.querySelector('#message-name').classList.remove('d-none') 
                    document.querySelector('#name').classList.add('border-danger') 
                }
                else if(this.user.name && (this.user.name.length<2 || this.user.name.length>50)) {
                    this.error.name = true
                    this.message.name = "Le nom doit avoir entre 2 et 50 caractères"
                    document.querySelector('#message-name').classList.remove('d-none') 
                    document.querySelector('#name').classList.add('border-danger') 
                }
                else {
                    this.error.name = false
                    document.querySelector('#message-name').classList.add('d-none') 
                    document.querySelector('#name').classList.remove('border-danger') 
                }

                //Check email
               var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if ( !this.user.email) {
                    this.error.email = true
                    this.message.email = "L'email ne peut pas être vide"
                    document.querySelector('#message-email').classList.remove('d-none') 
                    document.querySelector('#email').classList.add('border-danger') 
                }
                else if (this.user.email && !regex.test(this.user.email)) {
                    this.error.email = true
                    this.message.email = "L'email est incorrect"
                    document.querySelector('#message-email').classList.remove('d-none') 
                    document.querySelector('#email').classList.add('border-danger') 
                }
                else {
                    this.error.email = false
                    document.querySelector('#message-email').classList.add('d-none')
                    document.querySelector('#email').classList.remove('border-danger')  
                }

                //Check password
                if(!this.user.password) {
                    this.error.password = true
                    this.message.password = "Le mot de passe ne peut pas être vide"
                    document.querySelector('#message-pwd').classList.remove('d-none') 
                    document.querySelector('#pwd').classList.add('border-danger') 
                }
                else if(this.user.password && (this.user.password.length<3 || this.user.password.length>20)) {
                    this.error.password = true
                    this.message.password = "Le mot de passe doit avoir entre 3 et 20 caractères"
                    document.querySelector('#message-pwd').classList.remove('d-none') 
                    document.querySelector('#pwd').classList.add('border-danger') 
                }
                else {
                    this.error.password = false
                    document.querySelector('#message-pwd').classList.add('d-none') 
                    document.querySelector('#pwd').classList.remove('border-danger') 
                }

                //Check passwordConfirm
                if(!this.user.passwordConfirm) {
                    this.error.passwordConfirm = true
                    this.message.passwordConfirm = "Le mot de passe ne peut pas être vide"
                    document.querySelector('#message-pwd-2').classList.remove('d-none') 
                    document.querySelector('#pwd-2').classList.add('border-danger') 
                }
                else if(this.user.passwordConfirm && (this.user.passwordConfirm.length<3 || this.user.passwordConfirm.length>20)) {
                    this.error.passwordConfirm = true
                    this.message.passwordConfirm = "Le mot de passe doit avoir entre 3 et 20 caractères"
                    document.querySelector('#message-pwd-2').classList.remove('d-none') 
                    document.querySelector('#pwd-2').classList.add('border-danger') 
                }
                else {
                    if( this.user.password !== this.user.passwordConfirm) {
                        this.error.passwordConfirm = true
                        this.message.passwordConfirm = "Les mots de passe ne correspondent pas"
                        document.querySelector('#message-pwd-2').classList.remove('d-none') 
                        document.querySelector('#pwd-2').classList.add('border-danger') 
                    }
                    else {
                        this.message.passwordConfirm = ""
                        this.error.passwordConfirm = false
                        document.querySelector('#message-pwd-2').classList.add('d-none') 
                        document.querySelector('#pwd-2').classList.remove('border-danger') 
                    }
                }
            },
        }
    }
</script>

<style>

form {
    min-width: 300px;
    
}
</style>