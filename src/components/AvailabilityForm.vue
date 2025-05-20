<template>
  <div class="container mt-5">
    <h2>Cadastrar Horário Disponível</h2>
    <form @submit.prevent="createAvailability">
      <div class="mb-3">
        <label for="startTime" class="form-label">Início</label>
        <input
          v-model="startTime"
          type="datetime-local"
          class="form-control"
          id="startTime"
          required
        />
      </div>
      <div class="mb-3">
        <label for="endTime" class="form-label">Fim</label>
        <input
          v-model="endTime"
          type="datetime-local"
          class="form-control"
          id="endTime"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar</button>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      error: "",
    };
  },
  methods: {
    async createAvailability() {
      try {
        await axios.post("/doctor/availabilities", {
          doctor: { id: this.$store.state.user.id },
          startTime: this.startTime,
          endTime: this.endTime,
          status: "AVAILABLE",
        });
        this.$router.push("/doctor");
      } catch (error) {
        this.error =
          error.response?.data?.message || "Erro ao cadastrar horário";
      }
    },
  },
};
</script>
