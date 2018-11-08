<template>
  <div class="login__container">
    <h1>Login</h1>
    <button class="btn btn--orange" @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',

  props: {
    data: String,
  },
  methods: {
    login() {
      const data = {
        email: 'jonsnow@gmail.com',
        password: '123456',
      };

      console.log('data', data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
