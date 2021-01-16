<template>
  <div>
    <h1 class="display-4 text-center m-5">Firebase Auth</h1>
    <div class="row justify-content-center">
    <div class="col-10 col-sm-8 col-md-6">
      <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body">
        <div class="row">
          <div class="form-group col-12">
            <label>Name</label>
            <input
                v-model="$v.userDetails.name.$model"
                type="text"
                class="form-control"
                :class="{'is-invalid': $v.userDetails.name.$error }"
                placeholder="Name"
            >
            <div v-if="$v.userDetails.name.$error" class="c-validation text-left">
              <small class="text-danger" v-if="!$v.userDetails.name.required">Name field is required.</small>
              <small class="text-danger" v-if="!$v.userDetails.name.maxLength">Max 60 characters are allowed.</small>
            </div>
          </div>
          <div class="form-group col-12">
            <label>Phone Number</label>
            <input
                v-model="$v.userDetails.phoneNumber.$model"
                type="text"
                class="form-control"
                :class="{'is-invalid': $v.userDetails.phoneNumber.$error }"
                @input="acceptNumber"
                placeholder="Phone Number">
            <div v-if="$v.userDetails.phoneNumber.$error" class="c-validation text-left">
              <small class="text-danger" v-if="!$v.userDetails.phoneNumber.required">Phone Number field is required.</small>
              <small class="text-danger" v-if="!$v.userDetails.phoneNumber.maxLength">Max 60 characters are allowed.</small>
            </div>
          </div>
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
              <small class="text-danger" v-if="!$v.userDetails.email.maxLength">Max 60 characters are allowed.</small>
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
              <small class="text-danger" v-if="!$v.userDetails.password.minLength">Allowed min length is 6 characters.</small>
              <small class="text-danger" v-if="!$v.userDetails.password.maxLength">Max 60 characters are allowed.</small>
              <small class="text-danger" v-if="!$v.userDetails.password.confirmed">Password and password confirmation does not match.</small>
            </div>
          </div>
          <div class="form-group col-12">
            <label>Confirm Password</label>
            <input
                v-model="userDetails.passwordConfirmation"
                type="password"
                class="form-control"
                placeholder="Confirm Password">
          </div>
          <div class="form-group col-12 text-center">
            <button class="btn btn-lg btn-primary btn-block" @click="save">Register</button>
            <small>Already have an account? <router-link :to="{name: 'login'}">LOGIN</router-link></small>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import UserService              from "@/services/UserService";
import * as mutationTypes       from '@/store/mutation-types';
import {email, maxLength, required, minLength} from "vuelidate/lib/validators";

export default {
  name: 'Register',

  data(){
    return {
      UserService: new UserService(),
      userDetails:{
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },

  methods: {


    save: async function (){
      this.$v.userDetails.$touch();

      if (this.$v.userDetails.$invalid) {
        return false;
      }

      const loader = this.$loading.show();
      let result = await this.UserService.createUser(this.userDetails);


      if(result.code === 'auth/email-already-in-use'){
        loader.hide();
        this.$toast.error(result.message);
      }

      if(result.uid){
        await result.reload();
        result.additionalInfo = await this.UserService.getUserData();
        loader.hide();
        this.$toast.success('Your account successfully created!!!!!!!!');
        this.$store.commit('auth/' + mutationTypes.SET_IS_AUTHENTICATED, true);
        this.$store.commit('auth/' + mutationTypes.SET_USER, { user: result});
        this.$router.push({ name: 'home' });
      }

    },

    acceptNumber() {
      var x = this.userDetails.phoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.userDetails.phoneNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }

  },

  validations(){
    return{
      userDetails: {
        name: {
          required,
          maxLength: maxLength(60)
        },
        phoneNumber: {
          required,
          maxLength: maxLength(60)
        },

        email: {
          required,
          email,
          maxLength: maxLength(60)
        },

        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(40),
          confirmed: () => {
            if(this.passwordConfirmation){
              return this.password == this.passwordConfirmation
            }

            return true;
          }
        },
      }
    }
  }
}
</script>

<style scoped>
</style>
