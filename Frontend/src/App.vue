<template>
  <div id="app" class="mx-auto">
    <Nav/>
    <div class="faux-div"></div>
    <div class="container ">
      <div class="bg-light rounded p-2 ">
        <router-view />
      </div>
      
    </div>
  </div>
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
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800&display=swap');
  
  *, ::before, ::after {
    box-sizing: border-box;
  }

  body {
    background: #1C8EF9 !important;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: 'Fira Sans', sans-serif;
    margin: 0 auto !important;
  }

  h1, h2, h3, h4, h5, h6, label, span {
    font-weight: 500;
    font-family: 'Fira Sans', sans-serif;
  }

  body, html,  #rrot {
    width: 100%;
    height: 100%;
  }

  .navbar-light {
    background-color: #fff;
    box-shadow: 0px 14px 20px rgba(34, 35, 58, 0.2);
  }

  .container .form-control:focus {
    border-color: #167bff;
    box-shadow: none;
  }

  .container h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 0px;
  }

  .custom-control-label {
    font-weight: 400;
  }

  .forgot-password, 
  .forgot-password a {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;
  }

  .forgot-password a {
    color: #167bff;
  }

  .faux-div {
    width: 100%;
    height: 100px;
  }

  .profil-picture {
        width: 50px;
        margin: 5px;
    }
</style>
