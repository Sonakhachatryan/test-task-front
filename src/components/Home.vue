<template>
  <div>
    <h1 class="display-4 text-center m-5">Welcome to our application !!!!!</h1>
    <div class="row justify-content-center">
      <div class="list-group col-10 col-md-8">
        <div class="list-group-item list-group-item-action active">Account Details</div>
        <div class="list-group-item list-group-item-action">Name: {{ user.displayName }}</div>
        <div class="list-group-item list-group-item-action">Email: {{ user.email }}</div>
        <div class="list-group-item list-group-item-action">Phone Number: {{ user.additionalInfo.phoneNumber }}</div>
      </div>
    </div>
  </div>
  </template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Home',

  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
}
</script>

<style scoped>

</style>
