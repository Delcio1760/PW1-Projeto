<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

//--- Funcoes para validar email e password ---//
const error = ref("");
const validEmail = (email) => {
  const regex = /^[^\s@]+@(gmail\.com|yahoo\.com|icloud\.com|outlook\.com)$/;
  return regex.test(email);
};
const validPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};
const doRegister = async () => {
  error.value = "";

  if (!validEmail(email.value)) {
    error.value = "Esse email é inválido. Usa gmail, yahoo, icloud ou outlook.";
    return;
  }

  if (!validPassword(password.value)) {
    error.value =
      "A password deve ter pelo menos 8 caracteres, com letras e números.";
    return;
  }

  await auth.registrar(name.value, email.value, password.value);
  router.push("/");
};
</script>

<template>
  <div class="page-background">
    <img alt="background image" src="@/assets/hajime.jpeg" class="background-image" />
    <div class="auth-container">
  <div class="register-container">
    <h1>Criar Conta</h1>
    <p v-if="error" class="error-message">{{ error }}</p>

    <form @submit.prevent="doRegister">
      <input v-model="name" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required/>

      <button type="submit">Criar Conta</button>
    </form>

    <router-link to="/login">Já tens conta? Entrar</router-link>
  </div>
    </div>
  </div>
</template>

<style scoped>
.page-background{
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.5);
}
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

.error-message {
  color: #ff6b6b;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
