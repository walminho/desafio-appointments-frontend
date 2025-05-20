<template>
  <div class="container mt-5">
    <h1>Painel do Paciente</h1>
    <availability-list />
    <appointment-list />
  </div>
</template>

<script>
import AvailabilityList from "../components/AvailabilityList.vue";
import AppointmentList from "../components/AppointmentList.vue";
import store from "../store";

export default {
  components: {
    AvailabilityList,
    AppointmentList,
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters.userRole !== "PATIENT") {
      next("/login");
    } else {
      next();
    }
  },
};
</script>
