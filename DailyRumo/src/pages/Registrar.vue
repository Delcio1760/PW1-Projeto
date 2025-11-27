<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

const doRegister = async () => {
  await auth.register(name.value, email.value, password.value);
  router.push("/");
};
</script>

<template>
    <div class="auth-container">
  <div class="register-container">
    <h1>Criar Conta</h1>

    <form @submit.prevent="doRegister">
      <input v-model="name" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <button type="submit">Criar Conta</button>
    </form>

    <router-link to="/login">Já tens conta? Entrar</router-link>
  </div>
    </div>
</template>

<style scoped>
.auth-container {
  width: 380px;
  margin: 80px auto;
  padding: 30px;
  border-radius: 12px;
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, .1);
}

.auth-container h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 26px;
}

.auth-container form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-container input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.auth-container button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 8px;
  border: none;
  background: #4f46e5;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.auth-container button:hover {
  background: #4338ca;
}

.auth-container a {
  display: block;
  margin-top: 15px;
  text-align: center;
  color: #4f46e5;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
