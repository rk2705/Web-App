<template>
  <form id="login-form" @submit.prevent="login">
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <input type="submit" value="Login" />
    <p
      id="response"
      v-bind:class="[level === 'error' ? 'negative' : 'positive']"
    >
      {{ response }}
    </p>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      response: "",
      level: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
    },
  },
  created() {
    this.$store.watch(
      (state) => state.auth.error,
      (newValue) => {
        this.response = newValue;
        this.level = "error";
      }
    );
    this.response = this.$route.params.success;
    this.level = "success";
  },
};
</script>

<style lang="scss">
#login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;

  display: grid;
  gap: 1em;

  input:not([type="submit"]) {
    padding: 0.5em;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid $primary-light;
  }

  input[type="submit"] {
    font-size: 1.1rem;
    letter-spacing: 1.5px;
    padding: 0.5em;
    background-color: $primary-dark;
    border-radius: 5px;
    border: 1px solid $primary-light;
    cursor: pointer;
    transition: 0.2s ease;
    color: $primary-light;

    &:hover {
      opacity: 0.85;
    }
  }
}
</style>
