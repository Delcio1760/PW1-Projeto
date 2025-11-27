<template>
    <nav class="navBar">
      <router-link to="/">Home</router-link>
      <router-link to="/sobre">Sobre</router-link>
      <router-link to="/contacto">Contacto</router-link>
      <router-link to="/login" @click="logout">Logout</router-link>
    </nav>
  </template>

<script setup>
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();

const logout = () => {
  auth.logout();
};
</script>
  
  <style scoped>
  .navBar {
    width: 100%;
    height: 60px;
    background-color: purple;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    border-radius: 8px;
  }
  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  </style>
  