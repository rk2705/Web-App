<template>
  <div id="login-form">
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <input type="submit" value="Login" />
    <p id="response">You Have Been Logged Out!</p>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="scss">
#login-form {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 45%;
  z-index: 10;

  display: grid;
  gap: 1em;

  input {
    padding: 0.5em 0.5em;
    width: 325px;

    @media (min-width: 400px) {
      width: 350px;
    }
  }

  input[type="submit"] {
    background-color: #999999;
    color: #000000;
    border: none;
    transition: 0.2s ease;
    border-radius: 1px;
    padding: 0.75em 0;
    letter-spacing: 0.5px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  input[type="text"],
  input[type="password"] {
    border: none;
    border-bottom: solid 2px #bc150a;
    font-size: 1rem;
    background: transparent;
    color: rgba(255, 255, 255, 0.75);
    font-weight: 100;
    letter-spacing: 0.5px;

    &:focus,
    &:active {
      outline: none;
      background: transparent;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0) inset !important;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: white !important;
    }
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: white;
    opacity: 0.75 !important;
  }

  p {
    color: white;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
}
</style>
