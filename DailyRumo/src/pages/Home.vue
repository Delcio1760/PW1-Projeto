<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import Popup from "../components/PopUp.vue";
import { Chart, plugins } from 'chart.js/auto';
import {getWeatherByCity} from '@/services/weatherService'

const weather = ref(null);
const weatherError = ref(null);
const city = "Porto";

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

const weeklyChart = ref(null);

const loadWeeklyChart = async () => {
  const response = await fetch("http://localhost:3000/completions");
  const completions = await response.json();

  // só do user logado
  const userCompletions = completions.filter(c =>c.userId === authStore.user.id);
  // ultimos 7 dias
  const days = [];
  const counts = [];

  for(let i=6; i>=0; i--){
    const date = new Date();
    date.setDate(date.getDate()-i);

    const day = date.toISOString().split('T')[0];
    days.push(date.toLocaleDateString("pt-PT",{weekday:"short"}));

    counts.push(userCompletions.filter(c => c.date === day).length);
  }
  new Chart(weeklyChart.value,{
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "Check-ins",
          data: counts,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
        }
      ]
    },
    options:{
      responsive: true,
      plugins: {
        legend: {display: false}
      }
    }
  });
};
 onMounted(async() =>{
  if(authStore.user){
    loadWeeklyChart();
    try{
    const data = await getWeatherByCity(city);
    weather.value = data;
  }catch(err){
    weatherError.value = "Não possivel carregar o tempo!";
  }
  }
  
 });

</script>

<template>
  <div class="hero-wrapper">
    <div class="main-container">
      
      <header class="main-header">
        <h1>
          <img class="logo-inline" alt="logotipo" src="../assets/logo.png" />
          Bem-vindo ao <span>DailyRumo</span>
        </h1>
        <p class="tagline">Gira os teus hábitos de acordo com o teu ambiente.</p>
      </header>

      <div v-if="weather" class="weather-loc">
        <h3>{{ weather.name }}</h3>
        <div class="temp">
          <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="Weather Icon" width="50" />
          {{ Math.round(weather.main.temp) }}
        </div>
      </div>

      <div class="cards-wrapper">
        <div class="glass-card" @click="openCategory('indoor')">
          <div class="icon-wrapper"><img src="https://img.icons8.com/?size=100&id=tNcJ7GGjHsUq&format=png&color=000000" alt=""></div>
          <div class="card-content">
            <h2>Indoor</h2>
            <p>Foco total no teu espaço interior. Ideal para leitura e meditação.</p>
            <div class="btn-minimal">Aceder à lista <span class="arrow">→</span></div>
          </div>
        </div>

        <div class="glass-card" @click="openCategory('outdoor')">
          <div class="icon-wrapper"><img src="https://img.icons8.com/?size=100&id=QHLdZSmc4FXT&format=png&color=000000" alt=""></div>
          <div class="card-content">
            <h2>Outdoor</h2>
            <p>Atividades ao ar livre com integração meteorológica inteligente.</p>
            <div class="btn-minimal">Aceder à lista <span class="arrow">→</span></div>
          </div>
        </div>
      </div>

      <div v-if="authStore.user" class="home-chart-card">
        <h3>📈 Check-ins da Semana</h3>
        <canvas ref="weeklyChart"></canvas>
      </div>

      <section v-if="!authStore.user" class="cta-guest">
        <h2>Começa a construir melhores hábitos hoje</h2>
        <p>
          Cria hábitos Indoors e Outdoors, acompanha o teu progresso
          e evolui com streaks, niveis e XP
        </p>
        <div class="cta-actions">
          <button class="cta-primary" @click="router.push('/register')">
            Criar conta gratis
          </button>
          <button class="cta-secondary" @click="router.push('/login')">
            Já tenho conta
          </button>
        </div>
      </section>
      <section v-if="!authStore.user" class="dashboard-preview">
        <h2>O teu progresso num relance</h2>

        <div class="preview-card">
          <p>⭐ Nível 2</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 60%"></div>
          </div>
          <p>🔥 Streak atual: 5 dias</p>
          <p>🏠 Indoor: 3 hábitos</p>
          <p>🌳 Outdoor: 2 hábitos</p>
        </div>
        <p class="preview-hint">
          Cria uma conta para começares a acompanhar o teu progresso real.
        </p>
      </section>  

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
  
  .main-header {
    margin-bottom: 60px;
  }
  
  .logo-inline {
  width: 70px; 
  height: auto;
  filter: drop-shadow(0 0 15px rgba(153, 126, 255, 0.6));
  vertical-align: middle; 
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

  .cta-guest {
  margin-top: 80px;
  padding: 40px;
  text-align: center;
  border-radius: 20px;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.cta-guest h2 {
  font-size: 2rem;
  margin-bottom: 12px;
}

.cta-guest p {
  opacity: 0.9;
  margin-bottom: 30px;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cta-primary {
  background: linear-gradient(90deg, #00ffcc, #00ccff);
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
}

.cta-secondary {
  background: transparent;
  border: 1px solid white;
  padding: 14px 28px;
  border-radius: 30px;
  color: white;
  cursor: pointer;
}
.dashboard-preview {
  margin-top: 80px;
  text-align: center;
  color: white;
}

.preview-card {
  max-width: 400px;
  margin: 30px auto;
  padding: 25px;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
}

.preview-hint {
  opacity: 0.8;
  font-size: 0.9rem;
}

  @media (max-width: 768px) {
    .cards-wrapper { flex-direction: column; align-items: center; }
    h1 { font-size: 2.2rem; }
  }
  .home-chart-card {
  margin-top: 40px;
  padding: 32px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.home-chart-card h3 {
  font-family: "Poppins", sans-serif;
  margin-bottom: 20px;
  font-size: 1.3rem;
}
.weather-loc {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0; 
  gap: 5px;
}
.weather-loc h3 {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
}
.weather-loc .temp {
  font-size: 3.5rem; 
  font-weight: 800;
  display: flex;
  align-items: center;
  color: #fff;
  line-height: 1;
}

.weather-loc .temp img {
  margin-right: -10px; 
  filter: drop-shadow(0 0 8px rgba(255,255,255,0.2));
}
.weather-loc .temp::after {
  content: "°C";
  font-size: 1.5rem;
  margin-left: 5px;
  color: #a855f7; /* Um toque de cor apenas na unidade */
}
  </style>
