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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const user = authStore.user;

const xpMax = computed(()=> user.level *100);
const xpPercent = computed(() => Math.min((user.xp / xpMax.value) * 100, 100));

// Estatisticas : Check-ins da semana
const weeklyCompletions = ref(0);
const baseUrl = 'http://localhost:3000';

const currentStreak = ref(0);
const bestStreak = ref(0);


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
onMounted(() => {
  loadWeeklyStats();
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
  </style>