<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");

const auth = useAuthStore();
const router = useRouter();

const doLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (e) {
    error.value = e.message;
  }
};
</script>

<template>
    <div class="auth-container">
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="doLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Entrar</button>
    </form>

    <p class="error" v-if="error">{{ error }}</p>

    <router-link to="/register">Criar Conta</router-link>
  </div>
    </div>
</template>

<style scoped>
.auth-container {
  width: 380px;
  margin: 80px auto;
  padding: 30px;
  
  border-radius: 16px;
  background: rgba(20, 0, 40, 0.8);

  border: 2px solid #8b2cff;
  box-shadow: 0 0 25px #8b2cffaa, inset 0 0 15px #4c00aa;

  backdrop-filter: blur(8px);

  color: white;
  text-align: center;
}

.auth-container h1 {
  color: #d2a8ff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #8b2cff;
}

.auth-container input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #8b2cff;
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.auth-container button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;

  background: linear-gradient(135deg, #8b2cff, #4c00aa);
  border: none;
  border-radius: 8px;

  color: white;
  font-weight: bold;
  letter-spacing: 1px;

  cursor: pointer;
  transition: 0.3s;
}

.auth-container button:hover {
  box-shadow: 0 0 15px #b366ff;
  transform: translateY(-2px);
}

</style>
