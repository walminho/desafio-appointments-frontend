<template>
  <div class="container mt-5">
    <h1>Painel do Médico</h1>
    <availability-form />
    <appointment-list />
  </div>
</template>

<script>
import AvailabilityForm from "../components/AvailabilityForm.vue";
import AppointmentList from "../components/AppointmentList.vue";

export default {
  components: {
    AvailabilityForm,
    AppointmentList,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.getters.userRole !== "DOCTOR") {
        vm.$router.push("/login");
      }
    });
  },
};
</script>
