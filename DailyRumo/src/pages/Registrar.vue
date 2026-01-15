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
    <div class="auth-container">
      <h1>Criar Conta</h1>
      <p v-if="error" class="error-message">{{ error }}</p>

      <form @submit.prevent="doRegister">
        <input v-model="name" placeholder="Nome" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required/>
        <button type="submit">Criar Conta</button>
      </form>

      <router-link to="/login" class="reg-link">Já tens conta? Entrar</router-link>
    </div>
  </div>
</template>

<style scoped>
 .page-background {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), 
              url("@/assets/registroImg.jpg") no-repeat center center; 
  background-size: cover;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Ajuste específico para telas de computador (onde o corte acontece) */
@media (min-aspect-ratio: 1/1) {
  .page-background {
    background-position: center 40%; 
  }
}

.auth-container {
  width: 380px;
  padding: 40px; 
  border-radius: 24px; 
  background: rgba(15, 0, 30, 0.8); /* Roxo bem escuro e translúcido */
  border: 1px solid rgba(139, 44, 255, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: white;
  text-align: center;
  position: relative;
  z-index: 2;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.auth-container input {
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid rgba(139, 44, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 1rem;
  box-sizing: border-box; 
  transition: 0.3s;
}

.auth-container input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  border-color: #d2a8ff;
  box-shadow: 0 0 15px rgba(139, 44, 255, 0.3);
}

.auth-container button {
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  background: linear-gradient(135deg, #8b2cff, #5a00e0);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 44, 255, 0.3);
}

.auth-container button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 44, 255, 0.5);
  filter: brightness(1.1);
}

.reg-link {
  display: inline-block;
  margin-top: 20px;
  color: #d2a8ff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: 0.2s;
}

.reg-link:hover {
  text-decoration: underline;
  text-shadow: 0 0 8px rgba(210, 168, 255, 0.5);
}
  </style>