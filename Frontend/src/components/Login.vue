<template>
     <form @submit.prevent="handleSubmit" class="form w-50">

        <h3 class="text-center">Se connecter</h3>
        <p class="mr-2 mb-2 fs-6 text-center">Vous n'avez pas de compte? <router-link to="/signup" class="nav-link p-0 fsize d-inline">S'inscrire</router-link></p>
        <p v-if="error.email || error.pwd || error.login" class="alert alert-danger title7" id="message">Il y a des erreurs, veuillez vérifier votre saisie</p>
        
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
                <input v-model.trim="user.pwd" type="password" class="form-control" id="pwd" placeholder="Mot de passe" />
                <p class="title7 text-danger d-none mb-0" id="message-pwd">{{message.pwd}}</p>
            </div>
        </div>


        <button class="btn btn-primary btn-block">Login</button>

    </form>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                user: {
                    email: '',
                    pwd: ''
                },
                message: {
                    email: "",
                    pwd: ""
                },
                error: {
                    email: false,
                    pwd: false,
                    login: false
                },
            }
        },
        methods: {
            handleSubmit: function() {
                this.checkInput()
                if(!this.error.email && !this.error.pwd) {
                    axios.post('users/login', { email: this.user.email, password: this.user.pwd })
                    .then (res => {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user', JSON.stringify(res.data.user))
                        this.$store.dispatch('user', res.data.user)
                        this.$router.push('/')
                    })
                    .catch ((error) => {
                        console.log(error);
                        this.error.login = true
                        document.querySelector('#message').innerHtml = "L'email ou le mot de passe sont incorrects"
                    })
                }
            },

            checkInput: function() {
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
                if(!this.user.pwd) {
                    this.error.pwd = true
                    this.message.pwd = "Le mot de passe ne peut pas être vide"
                    document.querySelector('#message-pwd').classList.remove('d-none') 
                    document.querySelector('#pwd').classList.add('border-danger') 
                }
                else if(this.user.pwd && (this.user.pwd.length<3 || this.user.pwd.length>20)) {
                    this.error.pwd = true
                    this.message.pwd = "Le mot de passe doit avoir entre 3 et 20 caractères"
                    document.querySelector('#message-pwd').classList.remove('d-none') 
                    document.querySelector('#pwd').classList.add('border-danger') 
                }
                else {
                    this.error.pwd = false
                    document.querySelector('#message-pwd').classList.add('d-none') 
                    document.querySelector('#pwd').classList.remove('border-danger') 
                }
            },
        }
    }
</script>

<style scoped>
    
    form {
        width: 50%;
        margin: 0 auto;
        font-size: 1em;
    }

</style>