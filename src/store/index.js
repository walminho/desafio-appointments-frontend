import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import DoctorDashboard from "../views/DoctorDashboard.vue";
import PatientDashboard from "../views/PatientDashboard.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/doctor", component: DoctorDashboard },
  { path: "/patient", component: PatientDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
