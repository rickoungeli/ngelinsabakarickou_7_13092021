<template>
  <main id="app">

    <div class="container w-100" >
      <Nav/>
      <div class="bg-light body-min-height perso-css-body">
        <router-view />
      </div>
      
    </div>
  </main>
</template>

<script>
  import Nav from './components/Nav.vue'
  
  export default {
    name: 'App',
    components: {
      Nav
    },
        
    async beforeCreated() {
      const res = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('user', res.data)
    },
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800&display=swap');
  
  *, ::before, ::after {
    box-sizing: border-box;
    padding: 0;
    margin : 0;
  }

  body {
    background: #1C8EF9 !important;
    border-color: red !important;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }
  h1 {
    font-size: 2em;
  }

  #container {
    min-height: 700px !important;
  
  }

  .body-min-height {
      min-height: 100vh;
  }

  .form-control:focus {
    border-color: #167bff;
    box-shadow: none;
  }

  .profil-picture {
        width: 50px;
        margin: 5px;
  }

  .profil-picture1 {
        width: 30px;
        margin: 3px;
  }

  .title7 {
    font-size: 0.8rem;
    font-style: italic;
  }
  
  .perso-css-body {
    padding-top: 120px;
  }
    .perso-css-form {
        font-size: .8em;
        width: 90%;
    }
    @media screen and (min-width: 768px) {
        .perso-css-form {
            font-size: 1em;
            width: 75%;
        }
    }
    @media screen and (min-width: 992px) {
        .perso-css-form {
            font-size: 1em;
            width: 60%;
        }
    }
  
</style>
