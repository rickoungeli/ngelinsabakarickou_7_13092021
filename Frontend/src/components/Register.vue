<template>
     <form @submit.prevent="checkUser">
        <p v-if="errors.length" class="alert alert-danger">
            Il y a des erreurs :
            <ul>
                <li v-for="error in errors" :key="error"> {{ error }} </li>
            </ul>
        </p>
         <h3>Inscription</h3>
            <div class="form-group">
                <label>Prénom</label>
                <input type="text" class="form-control" v-model.trim="firstname" placeholder="Prénom" />
            </div>
            <div class="form-group">
                <label>Nom</label>
                <input type="text" class="form-control" v-model.trim="name" placeholder="Nom" />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model.trim="email" placeholder="Email" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control" v-model.trim="password" placeholder="Mot de passe" />
            </div>

            <div class="form-group">
                <label>Confirmer mot de passe</label>
                <input type="password" class="form-control" v-model.trim="password_confirm" placeholder="Confirmer mot de passe" />
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
                firstname: '',
                name: '',
                email: '',
                password: '',
                password_confirm: '',
                errors: []
            }
        },
        methods: {

            checkUser: function() {
                this.errors = []
                if (!this.firstname || !this.name || !this.email || !this.password) { this.errors.push("Tous les champs sont obligatoires") }
                if (this.firstname && (this.firstname.length<2 || this.firstname>30)) { this.errors.push("Le prénom doit avoir entre 2 et 30 caracères") }
                if (this.name && (this.name.length<2 || this.name>50)) { this.errors.push("Le nom doit avoir entre 2 et 50 caracères") }
                if (this.password && (this.password.length < 3 || this.password.lenght > 20 )) { this.errors.push("Le mot de passe doit comprendre entre 3 et 20 caractères")}
                var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (this.email && !regex.test(this.email) ) {this.errors.push("L'email saisi est incorrect")}
                if (this.password != this.password_confirm) { this.errors.push("Les mots de passe ne correspondent pas")}

                if(!this.errors.length) {
                    this.handleSubmit()
                }
                
                

            },
            handleSubmit: function() {
                if(this.email != "" && this.password != "" && this.password_confirm != "") {
                    axios.post('users/signup', {
                        firstname: this.firstname,
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirm: this.password_confirm
                    })
                    .then (res => {
                        console.log(res);
                        this.$router.push('/login')
                    })
                    .catch (err => console.log(err))
                }
            } 
        }
    }
</script>

<style>

form {
    min-width: 300px;
    
}
</style>