<template>
  <div class="nav-container">
    <nav class="navBar">
      <div class="nav-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/dashboard" class="nav-item">Dashboard</router-link>
        <router-link to="/contacto" class="nav-item">Contacto</router-link>
        <router-link to="/perfil" class="nav-item">Perfil</router-link>
      </div>
      
      <div class="nav-auth">
        <button v-if="auth.user" @click="logout" class="auth-btn logout">Sair</button>
        <router-link v-else to="/login" class="auth-btn login">Login</router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import router from "@/router";
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();

const logout = () => {
  auth.logout();
};
</script>
  
<style scoped>
  /* Container flutuante */
  .nav-container {
    position: fixed;
    top: 25px; /* Desce um pouco mais do topo */
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1000;
  }
  
  .navBar {
    width: auto;
    min-width: 750px; /* Aumentado para dar mais "ar" aos elementos */
    height: 70px; /* Aumentado de 55px para 70px para melhor presença */
    
    background: rgba(255, 255, 255, 0.08); /* Ligeiramente mais visível */
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    padding: 0 40px; /* Mais espaço nas extremidades */
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  }
  
  .nav-links {
    display: flex;
    gap: 35px; /* Aumentado o espaço entre links */
  }
  
  /* Estilização dos Links mais legíveis */
  .nav-item {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-size: 18px; /* Aumentado de 15px para 18px */
    font-weight: 600; /* Peso da fonte aumentado para melhor leitura */
    transition: all 0.3s ease;
    position: relative;
    letter-spacing: 0.5px;
  }
  
  .nav-item:hover, .router-link-active {
    color: #c37eff;
    transform: translateY(-1px);
  }
  
  /* Indicador de página ativa mais visível */
  .router-link-active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: #c37eff;
    border-radius: 50%;
    box-shadow: 0 0 10px #c37eff;
  }
  
  /* Botões de Auth maiores */
  .auth-btn {
    padding: 12px 25px; /* Aumentado o preenchimento */
    border-radius: 50px;
    font-size: 16px; /* Fonte maior */
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    border: none;
    text-decoration: none;
  }
  
  .login {
    background: linear-gradient(90deg, #9955ff, #c37eff);
    color: white;
    box-shadow: 0 4px 15px rgba(153, 85, 255, 0.3);
  }
  
  .logout {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  /* Responsividade */
  @media (max-width: 800px) {
    .navBar {
      min-width: 95%;
      height: 65px;
      padding: 0 20px;
    }
    .nav-links {
      gap: 15px;
    }
    .nav-item {
      font-size: 16px;
    }
  }
  </style>