<template>
  
  <nav class="navbar navbar-expand navbar-light px-2 fixed-top">
    <!-- Logo -->
    <router-link to="/" class="navbar-brand">
      <div class=" bg-secondary m-0 p-1 d-flex flex-row rounded-1">
        <img src="images/icon.png" width="30px" class="ms-2 rounded-circle mx-auto">
        <p class="fs-6 text-center text-white pt-1">GROUPOMANIA</p>
      </div>
    </router-link>

    <div class="collapse navbar-collapse me-2" id="navbarSupportedContent">
      <ul v-if="!user" class="navbar-nav ms-auto mb-2 mb-lg-0" >
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Se connecter</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signup" class="nav-link">S'inscrire</router-link>
        </li>
      </ul>
      <div  v-if="user" class="collapse navbar-collapse me-5" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span>{{ user.firstname }}</span> 
              <img  v-if="!pictureUrl" src="../../public/images/profil_picture.png" class="rounded-circle" >
              <img  v-if="pictureUrl" :src="pictureUrl" class="rounded-circle" >
               
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
    .navbar-light {
    background-color: #fff;
    box-shadow: 0px 14px 20px rgba(34, 35, 58, 0.2);
  }

  ul img {
    width: 50px;
  }
 

</style>