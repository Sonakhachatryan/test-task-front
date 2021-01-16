<template>
  <div>
    <h1 class="display-4 text-center m-5">Firebase Auth</h1>
    <div class="row justify-content-center">
      <div class="col-10 col-sm-8 col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div class="row">
              <div class="form-group col-12">
                <label>Email</label>
                <input
                    v-model="$v.userDetails.email.$model"
                    type="email"
                    class="form-control"
                    :class="{'is-invalid': $v.userDetails.email.$error }"
                    placeholder="Email"
                >
                <div v-if="$v.userDetails.email.$error" class="c-validation text-left">
                  <small class="text-danger" v-if="!$v.userDetails.email.required">Email field is required.</small>
                  <small class="text-danger" v-if="!$v.userDetails.email.email">Not a valid email address.</small>
                </div>
              </div>
              <div class="form-group col-12">
                <label>Password</label>
                <input
                    v-model="$v.userDetails.password.$model"
                    type="password"
                    class="form-control"
                    :class="{'is-invalid': $v.userDetails.password.$error }"
                    placeholder="Password">
                <div v-if="$v.userDetails.password.$error" class="c-validation text-left">
                  <small class="text-danger" v-if="!$v.userDetails.password.required">Password field is required.</small>
                </div>
              </div>
              <div class="form-group col-12 text-center">
                <button class="btn btn-lg btn-primary btn-block" @click="login">Login</button>
                <small>Don't have an account? <router-link :to="{name: 'register'}">REGISTER</router-link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import UserService from "@/services/UserService";
import {email, required} from "vuelidate/lib/validators";
import * as mutationTypes from "@/store/mutation-types";

export default {
  name: 'Login',

  data(){
    return {
      UserService: new UserService(),
      userDetails:{
        email: '',
        password: '',
      }
    }
  },

  methods: {
    login: async function (){
      this.$v.userDetails.$touch();

      if (this.$v.userDetails.$invalid) {
        return false;
      }

      const loader = this.$loading.show();
      let result = await this.UserService.loginUser(this.userDetails);

      if(result.uid){
        result.additionalInfo = await this.UserService.getUserData();
        this.$store.commit('auth/' + mutationTypes.SET_IS_AUTHENTICATED, true);
        this.$store.commit('auth/' + mutationTypes.SET_USER, { user: result});
        loader.hide();

        this.$router.push({ name: 'home' });
      }else{
        loader.hide();
        this.$toast.error('Wrong email or password.');
      }

    },
  },

  validations(){
    return{
      userDetails: {
        email: {
          required,
          email,
        },

        password: {
          required
        },
      }
    }
  }
}
</script>

<style scoped>
</style>
