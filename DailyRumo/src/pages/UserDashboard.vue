<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS43NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGFydC1uby1heGVzLWNvbWJpbmVkLWljb24gbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtY29tYmluZWQiPjxwYXRoIGQ9Ik0xMiAxNnY1Ii8+PHBhdGggZD0iTTE2IDE0djciLz48cGF0aCBkPSJNMjAgMTB2MTEiLz48cGF0aCBkPSJtMjIgMy04LjY0NiA4LjY0NmEuNS41IDAgMCAxLS43MDggMEw5LjM1NCA4LjM1NGEuNS41IDAgMCAwLS43MDcgMEwyIDE1Ii8+PHBhdGggZD0iTTQgMTh2MyIvPjxwYXRoIGQ9Ik04IDE0djciLz48L3N2Zz4=" alt=""> 
          Progresso Semanal
        </h1>
      </header>

      <div class="main-grid">
        <div class="card profile-card">
          <div class="user-info">
            <h2>Olá, {{ user.nome }}!</h2>
            <span class="level-badge">{{ currentBadgeName }}</span>
          </div>
          
          <div class="xp-section">
            <div class="xp-labels">
              <span>{{ nextBadge ? `Próximo: ${nextBadge.name}` :'Nível Máximo' }}</span>
              <span>{{ user.xp }} / {{ xpMax }}XP</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: xpPercent + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="mini-card">
            <span class="stat-value">{{ weeklyCompletions }}</span>
            <span class="stat-label">Check-ins/Semana</span>
          </div>
          <div class="mini-card highlight">
            <span class="stat-value">
              <img class="icon-inline" src="https://img.icons8.com/?size=100&id=zD-VLZTPKlpb&format=png&color=000000" />
              {{ currentStreak }}
            </span>
            <span class="stat-label">Streak Atual</span>
          </div>
          <div class="mini-card">
            <span class="stat-value">{{ bestStreak }}</span>
            <span class="stat-label">Recorde</span>
          </div>
        </div>

        <div class="card chart-card" v-show="chartReady">
          <h3>Distribuição de Atividades</h3>
          <div class="chart-container">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Chart, registerables} from 'chart.js'
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
Chart.register(...registerables)

const authStore = useAuthStore();
const user = authStore.user;

const badges = [
  { name: 'Bronze', minXP: 0 },
  { name: 'Ouro', minXP: 300 },
  { name: 'Platina', minXP: 700 },
  { name: 'Diamante', minXP: 1200 },
  { name: 'Mestre', minXP: 2000 }
];

// Encontra o proximo badge com base no XP atual
const nextBadge = computed(()=> {
  return badges.find(b=> user.xp < b.minXP) || null;
});

// Define o maximo da barra (o minino do proximo badge ou XP se for Mestre)
const xpMax = computed(()=> nextBadge.value ? nextBadge.value.minXP : user.xp);

// Calcula Percentagem
const xpPercent = computed(()=>{
  if(!nextBadge.value) return 100; // Se for Mestre, barra cheia
  return Math.min((user.xp / nextBadge.value.minXP)*100,100)
});

const currentBadgeName = computed(() => {
  const current = [...badges].reverse().find(b => user.xp >= b.minXP);
  return current ? current.name : 'Iniciante';
});

// Estatisticas : Check-ins da semana
const weeklyCompletions = ref(0);
const baseUrl = 'http://localhost:3000';

const currentStreak = ref(0);
const bestStreak = ref(0);
const chartReady = ref(false)

const loadWeeklyStats = async () => {
  const today = new Date()
  const weekAgo = new Date()
  weekAgo.setDate(today.getDate() -6); // Ultimos 7 dias
  const response = await fetch(`${baseUrl}/completions?userId=${user.id}`);
  const allCompletions = await response.json();

  // Filtra os check-ins desta semana
  weeklyCompletions.value = allCompletions.filter(c => {
    const date = new Date(c.date);
    return date >= weekAgo && date <= today;
  }).length;

  calculateStreaks(allCompletions)
  chartReady.value = true
};

//--- Função para calcular Streaks ----//
const calculateStreaks = (completions) =>{
  const uniqueDates = [...new Set(completions.map(c=>new Date(c.date).toISOString().split('T')[0]))] // Extrair datas unicas
  uniqueDates.sort()
  let best = 0

  // Calcular a Streak maxima
  let streak = 1
  for(let i=1 ;i < uniqueDates.length; i++){
    const previos = new Date(uniqueDates[i-1])
    const currentDate = new Date(uniqueDates[i])

    const difference = (currentDate - previos) / (1000*60*60*24) // Diferença em milissegundos convertida para dias

    if(difference === 1){
      streak++
    }else{
      best = Math.max(best, streak)
      streak = 1
    }
  }
  best = Math.max(best, streak)

  // Calcular a streak atual, comecando hoje
  const today = new Date()
  today.setHours(0,0,0,0)

  let temporaryStreak = 0
  let dayPointer = today

  while(uniqueDates.includes(dayPointer.toISOString().split('T')[0])){
    temporaryStreak++
    dayPointer.setDate(dayPointer.getDate()-1)
    currentStreak.value = temporaryStreak
    bestStreak.value = best
  }
}

 const chartCanvas = ref(null)
 let chartInstance = null
 
 //-- Funcao para buscar as completions e os habitos
 const loadChartData = async ()=>{
  const today = new Date()
  today.setHours(0,0,0,0)

  const lastSevenDays = []
  for(let i=6; i>=0; i--){
    const day = new Date(today)
    day.setDate(today.getDate() -i)
    lastSevenDays.push(day.toISOString().split('T')[0])
  }
  //Buscar os habitos
  const habitsResponse = await fetch(`${baseUrl}/habits?userId=${user.id}`)
  const habits = await habitsResponse.json()

  const habitCategoryMap = {}
  habits.forEach(habit => {
  habitCategoryMap[habit.id] = habit.category
  })
  
  // Buscar os check-ins
  const completionsResponse = await fetch(`${baseUrl}/completions?userId=${user.id}`)
  const completions = await completionsResponse.json()
  //Contar indoor vs outdoor
  let indoorCount = 0
  let outdoorCount = 0

  completions.forEach(c => {
    const category = habitCategoryMap[c.habitId]
    if (category === 'indoor') indoorCount++
    if (category === 'outdoor') outdoorCount++
  })
  createChart(['Categorias'], [indoorCount], [outdoorCount])
}

 //--- Funcao para criar grafico ----//
 const createChart = (labels, indoorData, outdoorData) => {
  if(chartInstance)chartInstance.destroy();

  chartInstance = new Chart(chartCanvas.value,{
    type:'bar',
    data: {
      labels,
      datasets:[{
        label: 'indoor',
        data: indoorData
      },
    {
      label:'outdoor',
      data: outdoorData
    }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  })


 }

onMounted(() => {
  loadWeeklyStats();
  loadChartData()
});
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  padding: 40px 20px;
  background: radial-gradient(circle at top right, #2d0b5a, #0d0d0d);
  font-family: 'Inter', sans-serif;
}

.dashboard-container {
  max-width: 900px;
  margin: 0 auto;
}

.dashboard-header h1 {
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  font-size: 1.8rem;
  margin-bottom: 30px;
}

/* Layout em Grid */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Estilo Base dos Cartões (Glassmorphism) */
.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 25px;
  color: white;
}

/* Cartão de Perfil */
.profile-card {
  grid-column: span 1;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.level-badge {
  background: #8b2cff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.xp-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #ccc;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b2cff, #00d4ff);
  box-shadow: 0 0 10px rgba(139, 44, 255, 0.5);
}

/* Mini Cards de Estatísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  grid-column: span 1;
}

.mini-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  transition: transform 0.2s;
}

.mini-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.06);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
}

.stat-label {
  font-size: 0.75rem;
  color: #999;
  text-align: center;
  margin-top: 5px;
}

.highlight .stat-value {
  color: #ff7b00;
}

/* Gráfico */
.chart-card {
  grid-column: span 2;
  margin-top: 10px;
}

.chart-card h3 {
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #ddd;
}

.chart-container {
  height: 250px;
}

/* Mobile */
@media (max-width: 768px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
  .profile-card, .stats-grid, .chart-card {
    grid-column: span 1;
  }
}
</style>