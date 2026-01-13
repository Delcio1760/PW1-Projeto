<template>
  <div class="dashboard-container">
    <h1>📊 Dashboard de Progresso</h1>

    <div class="stats-card">
      <h2>Bem-vindo, {{ user.nome }}!</h2>

      <p>⭐ Nível: {{ user.level }}</p>
      <p>🔥 XP atual: {{ user.xp }} / {{ xpMax }} XP</p>
      
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: xpPercent + '%' }"></div>
      </div>

      <p>✅ Check-ins esta semana: {{ weeklyCompletions }}</p>
      <p>Streak atual: {{ currentStreak }} dias</p>
      <p>Melhor Streak: {{ bestStreak }} dias</p>
    </div>
    <div class="chart-card" v-show="chartReady">
      <h3>Check-ins Indoor vs Outdoor (últimos 7 dias)</h3>
      <canvas ref="chartCanvas"></canvas>
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

const xpMax = computed(()=> user.level *100);
const xpPercent = computed(() => Math.min((user.xp / xpMax.value) * 100, 100));

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

    const difference = (currentDate - previos) / (1000*60*60*24)

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
  .dashboard-container {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    background: #1e0b3e;
    color: white;
    border-radius: 12px;
    text-align: center;
  }
  
  .stats-card {
    margin-top: 20px;
  }
  
  .progress-bar {
    width: 100%;
    height: 18px;
    background: #333;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00ff88, #00ccff);
    transition: width 0.3s ease;
  }
  .charts-section {
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
  margin-top: 40px;
  padding: 20px;
}

.chart-card {
  background-color: #0d0d0d; 
  border: 1px solid #222;    
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: border-color 0.3s ease;
}

.chart-card:hover {
  border-color: #c37eff; 
}

/* Títulos dos Gráficos */
.chart-title {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.chart-title i {
  color: #c37eff; 
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

/* Responsividade para ecrãs pequenos */
@media (max-width: 600px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
  .chart-card {
    padding: 15px;
  }
}
  </style>