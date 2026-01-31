<script setup>
import { ref } from 'vue';
import NavbarLogin from "./components/NavbarLogin.vue";
import NavBar from "./components/NavBar.vue";
import ChatBox from "./components/ChatBox.vue";
import { useAuthStore } from "./stores/authStore";

const auth = useAuthStore();
const isChatOpen = ref(false); 
</script>

<template>
  <div>
    <NavbarLogin v-if="auth.user" @toggle-chat="isChatOpen = !isChatOpen" />
    <NavBar v-else @toggle-chat="isChatOpen = !isChatOpen" />

    <router-view /> 

    <ChatBox :isOpen="isChatOpen" @close="isChatOpen = false" />
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: black;
}
</style>
