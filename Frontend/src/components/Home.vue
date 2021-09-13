<template>
    <div>
        <div v-if="user"> <Posts /> </div>
        <h3 v-if="!user"> VEUILLEZ VOUS CONNECTER ! </h3>
    </div>
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
