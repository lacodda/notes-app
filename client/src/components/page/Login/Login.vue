<template>
  <div class="login__container">
    <h1>Login</h1>
    <button class="btn btn--orange" @click="onLogin">Login</button>
    <button class="btn btn--orange" @click="onRegister">Register</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',

  props: {},

  data() {
    return {
      data: {
        email: 'jonsnow2@gmail.com',
        password: '123456',
      },
    };
  },

  methods: {
    ...mapActions('auth', ['login', 'register']),

    onRegister() {
      this.register(this.data);
    },

    onLogin() {
      this.login(this.data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
