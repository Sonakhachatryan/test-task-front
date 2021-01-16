<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Firebase Auth</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
        </li>
      </ul>
      <button type="button" class="btn btn-light" @click="logout">Log Out</button>
    </div>
  </nav>
</template>

<script>
import UserService        from "@/services/UserService";
import { mapGetters }     from "vuex";
import * as mutationTypes from "@/store/mutation-types";

export default {
  name: 'Navbar',

  data(){
    return {
      UserService: new UserService(),
    }
  },

  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },

  methods: {
    logout: async function(){
      let result = await this.UserService.logOutUser();
      if(result){
        this.$store.commit('auth/' + mutationTypes.SET_IS_AUTHENTICATED, false);
        this.$store.commit('auth/' + mutationTypes.SET_USER, {user: null});
        this.$router.push({name: "login"});
      }
    }
  }
}
</script>

<style scoped>

</style>
