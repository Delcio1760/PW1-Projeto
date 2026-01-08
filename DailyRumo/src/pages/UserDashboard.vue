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
};

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