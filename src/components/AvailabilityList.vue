<template>
  <div class="container mt-5">
    <h2>Horários Disponíveis</h2>
    <div class="mb-3">
      <label for="doctorId" class="form-label"
        >Filtrar por Médico (opcional)</label
      >
      <input
        v-model="doctorId"
        type="number"
        class="form-control"
        id="doctorId"
        placeholder="ID do médico"
      />
      <button @click="fetchAvailabilities" class="btn btn-primary mt-2">
        Filtrar
      </button>
    </div>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <ul v-else class="list-group">
      <li
        v-for="availability in availabilities"
        :key="availability.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ formatDate(availability.startTime) }} -
        {{ formatDate(availability.endTime) }} (Dr.
        {{ availability.doctor.name }})
        <button
          @click="bookAppointment(availability.id)"
          class="btn btn-success btn-sm"
        >
          Agendar
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      availabilities: [],
      doctorId: "",
      loading: false,
      error: "",
    };
  },
  mounted() {
    this.fetchAvailabilities();
  },
  methods: {
    async fetchAvailabilities() {
      this.loading = true;
      try {
        const url = this.doctorId
          ? `/public/availabilities?doctorId=${this.doctorId}`
          : "/public/availabilities";
        const response = await axios.get(url);
        this.availabilities = response.data;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Erro ao carregar horários";
      } finally {
        this.loading = false;
      }
    },
    async bookAppointment(availabilityId) {
      try {
        await axios.post("/patient/appointments", {
          patient: { id: this.$store.state.user.id },
          availabilityId,
          status: "CONFIRMED",
        });
        this.$router.push("/patient/appointments");
      } catch (error) {
        this.error =
          error.response?.data?.message || "Erro ao realizar agendamento";
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },
  },
};
</script>
