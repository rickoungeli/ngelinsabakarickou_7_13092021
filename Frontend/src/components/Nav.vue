<template>
  
  <nav class="navbar navbar-expand navbar-light fixed-top perso-nav">
    <div>
     
      <p class="fs-4 text-center bg-secondary text-white m-0">GROUPOMANIA</p>
    </div>
    <div class="container menu">
      <router-link to="/" class="navbar-brand">Accueil</router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">S'inscrire</router-link>
          </li>
        </ul>

        <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="user">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img  v-if="!pictureUrl" src="../../public/images/profil_picture.png" class="rounded-circle" >
                <img  v-if="pictureUrl" :src="pictureUrl" class="rounded-circle" >
                <span>{{ user.firstname }}</span>  
              </a>
              
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/profil" class="nav-link dropdown-item">Profil</router-link>
                <div class="dropdown-divider"></div>
                <a href="javascript:void(0)" @click="handleClick"  class="nav-link dropdown-item"><i class="fab fa-confluence"></i>Déconnexion</a>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default ({
    name: 'Nav',
    data() {
      return {
        pictureUrl : ""
      }
    },
    methods: {
      handleClick() {
        this.pictureUrl=""
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$store.dispatch('user', null)
        this.$router.push('/login')
      }
    },

    computed: {
      ...mapGetters(['user'])
    },

    updated() {
      var ctx = this
      setTimeout(function(){
          ctx.pictureUrl = ctx.user.picture_url
      }, 200)
    }
  })
</script>

<style scoped>
  router-link:active {
    text-decoration: underline;
  }
  .menu {
    height: 35px;
  }
  .perso-nav {
    display: inline-block;
  }
  ul img {
    width: 50px;
  }
</style>