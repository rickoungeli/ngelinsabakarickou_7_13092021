<template>
    <main class="bg-light ">
        <h1 v-if="!user" class="text-center p-3"> VEUILLEZ VOUS CONNECTER ! </h1>
        <section v-if="user"> <Posts /> </section>
    </main>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Posts from './Posts.vue'

    export default {
        name: 'Accueil',
        components: {
            Posts
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style>


</style>