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
  <div class="page-background">
    <div class="auth-container"> <h1>Login</h1>

      <form @submit.prevent="doLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Entrar</button>
      </form>

      <p class="error" v-if="error">{{ error }}</p>

      <div class="footer-links">
        <router-link to="/register" class="reg-link">Criar Conta</router-link>
      </div>
    </div> </div>
</template>

<style scoped>
.page-background {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), 
              url("@/assets/loginPage.jpg") no-repeat center 15%; 
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.auth-container {
  width: 380px;
  padding: 40px; 
  border-radius: 24px; 
  background: rgba(15, 0, 30, 0.8); 
  border: 1px solid rgba(139, 44, 255, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(15px);
  color: white;
  text-align: center;
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
/* Estilização do Botão */
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
  
  /* Transição suave para o efeito de hover */
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 44, 255, 0.3);
}

.auth-container button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 44, 255, 0.5);
  filter: brightness(1.1);
}

.auth-container button:active {
  transform: translateY(0);
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
