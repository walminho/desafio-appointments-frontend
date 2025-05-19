// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Configurar a URL base do backend
axios.defaults.baseURL = 'http://localhost:8080/api'; // Ajuste conforme a URL do backend
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`;

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');