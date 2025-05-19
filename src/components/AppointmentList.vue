<template>
  <div class="container mt-5">
    <h2>Meus Agendamentos</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <ul v-else class="list-group">
      <li v-for="appointment in appointments" :key="appointment.id" class="list-group-item">
        {{ formatDate(appointment.startTime) }} - Dr. {{ appointment.doctor.name }}
        <span :class="appointment.status === 'CONFIRMED' ? 'badge bg-success' : 'badge bg-secondary'">
          {{ appointment.status }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      appointments: [],
      loading: false,
      error: ''
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      this.loading = true;
      try {
        const response = await axios.get(`/patient/appointments?patientId=${this.$store.state.user.id}`);
        this.appointments = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao carregar agendamentos';
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
      });
    }
  }
};
</script>