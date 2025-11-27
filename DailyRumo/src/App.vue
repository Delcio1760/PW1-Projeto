<script setup>
import NavBar from "./components/NavBar.vue";
import NavbarLogin from "./components/NavbarLogin.vue";
import { useAuthStore } from "./stores/authStore";

const auth = useAuthStore();
</script>

<template>
  <div>
    <!-- Se o utilizador estiver logado -->
    <NavbarLogin v-if="auth.user" />

    <!-- Se não estiver logado -->
    <NavBar v-else />

    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: black;
}
</style>
