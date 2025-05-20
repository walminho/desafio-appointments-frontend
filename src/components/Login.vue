/* eslint-disable vue/multi-word-component-names */
<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Usuário</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Entrar</button>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
        const role = this.$store.getters.userRole;
        if (role === "DOCTOR") {
          this.$router.push("/doctor");
        } else if (role === "PATIENT") {
          this.$router.push("/patient");
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
