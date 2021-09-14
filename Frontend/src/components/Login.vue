<template>
     <form @submit.prevent="checkUser">
        <p v-if="errors.length" class="alert alert-danger">
            Il y a des erreurs :
            <ul>
                <li v-for="error in errors" :key="error"> {{ error }} </li>
            </ul>
        </p>

        <h3>Se connecter</h3>
        <p class="alert alert-danger d-none mt-1" id="login-message"></p>
        <div class="d-inline-flex align-middle text-center ">
            <span class="mr-2 mb-2 fsize">Vous n'avez pas de compte?</span> <router-link to="/signup" class="nav-link p-0 fsize">S'inscrire</router-link>
        </div>
    
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model.trim="email" placeholder="Email" />
        </div>

        <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" class="form-control" v-model.trim="password" placeholder="Mot de passe" />
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
                email: '',
                password: '',
                errors: []
            }
        },
        methods: {

            checkUser: function() {
                this.errors = []
                if (!this.email || !this.password) { this.errors.push("L email ou le mot de passe sont obligatoires") }
                if (this.password.length < 3 || this.password.lenght > 20 ) { this.errors.push("Le mot de passe doit comprendre entre 3 et 20 caractères")}
                var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if ( !regex.test(this.email) ) {this.errors.push("L'email saisi est incorrect")}

                if(!this.errors.length) {
                    this.handleSubmit()
                }
            },

            handleSubmit: function() {
                if(this.email != "" && this.password != "") {
                    axios.post('users/login', { email: this.email, password: this.password })
                    .then (res => {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user', JSON.stringify(res.data.user))
                        this.$store.dispatch('user', res.data.user)
                        this.$router.push('/')
                    })
                    .catch (() => {
                        let divMessage = document.querySelector('#login-message')
                        divMessage.innerText = "L'email ou le mot de passe sont incorrects"
                        divMessage.classList.remove('d-none')
                    })
                }
            } 
        }
    }
</script>

<style scoped>
    fsize {
        font-size: 10px !important;
    }
</style>