<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import Popup from "../components/PopUp.vue";

const authStore = useAuthStore();
const router = useRouter();

const showPopup = ref(false);
const popupMessage = ref("");

const openCategory = (category) => {
  if (!authStore.user) {
    popupMessage.value = "⚠ Precisa fazer login para aceder a esta secção.";
    showPopup.value = true;
    return;
  }

  router.push({
    name: 'HabitsCategory',
    params: {category : category }
  })
};
</script>

<template>
  <div class="hero-wrapper">
    <div class="main-container">
      
      <header class="main-header">
        <img class="logo" alt="logotipo" src="../assets/logo.png" />
        <h1>Bem-vindo ao <span>DailyRumo</span></h1>
        <p class="tagline">Gira os teus hábitos de acordo com o teu ambiente.</p>
      </header>

      <div class="cards-wrapper">
        <div class="glass-card" @click="openCategory('indoor')">
          <div class="icon-wrapper">🏠</div>
          <div class="card-content">
            <h2>Indoor</h2>
            <p>Foco total no teu espaço interior. Ideal para leitura e meditação.</p>
            <div class="btn-minimal">Aceder à lista <span class="arrow">→</span></div>
          </div>
        </div>

        <div class="glass-card" @click="openCategory('outdoor')">
          <div class="icon-wrapper">🌳</div>
          <div class="card-content">
            <h2>Outdoor</h2>
            <p>Atividades ao ar livre com integração meteorológica inteligente.</p>
            <div class="btn-minimal">Aceder à lista <span class="arrow">→</span></div>
          </div>
        </div>
      </div>

    </div>
    
    <Popup 
      v-if="showPopup" 
      :message="popupMessage" 
      @close="router.push('/login')"
    />
  </div> 
</template>

<style scoped>
  .hero-wrapper {
    min-height: 100vh;
    background: 
      linear-gradient(to bottom, rgba(0, 0, 0, 0.4), #000000), 
      url('../assets/homeImg.jpeg');
    background-size: cover;
    background-position: center top;
    background-attachment: fixed; 
    display: flex;
    justify-content: center;
  }
  
  .main-container {
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px;
    text-align: center;
  }
  
  /* 2. HEADER: Tipografia limpa sobre a imagem */
  .main-header {
    margin-bottom: 60px;
  }
  
  .logo {
    width: 80px;
    filter: drop-shadow(0 0 15px rgba(153, 126, 255, 0.6));
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 3rem;
    color: white;
    font-weight: 800;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
  
  h1 span {
    color: #c37eff;
  }
  
  .tagline {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    margin-top: 10px;
  }
  
  /* 3. CARDS: Efeito Glassmorphism (Vidro) */
  .cards-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
  }
  
  .glass-card {
    flex: 1;
    min-width: 320px;
    max-width: 420px;
    background: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(15px); 
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 32px;
    padding: 50px 30px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .glass-card:hover {
    background: rgba(153, 85, 255, 0.1);
    border-color: rgba(153, 85, 255, 0.5);
    transform: translateY(-12px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  }
  
  .icon-wrapper {
    font-size: 60px;
    margin-bottom: 25px;
    background: rgba(255, 255, 255, 0.1);
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .card-content h2 {
    font-size: 2rem;
    color: white;
    margin-bottom: 15px;
  }
  
  .card-content p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  .btn-minimal {
    color: #c37eff;
    font-weight: 700;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  @media (max-width: 768px) {
    .cards-wrapper { flex-direction: column; align-items: center; }
    h1 { font-size: 2.2rem; }
  }
  </style>
    