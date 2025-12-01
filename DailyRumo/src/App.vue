<script setup>
import NavBar from "./components/NavBar.vue";
import NavbarLogin from "./components/NavbarLogin.vue";
import { useAuthStore } from "./stores/authStore";
import { useRoute } from 'vue-router';
const $route = useRoute();

const auth = useAuthStore();
</script>

<template>
  <div>
    <!--user logado-->
    <NavbarLogin v-if="auth.user" />

    <!--User não logado-->
    <NavBar v-else />

    <router-view :key="$route.fullPath" /> 
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: black;
}
</style>
