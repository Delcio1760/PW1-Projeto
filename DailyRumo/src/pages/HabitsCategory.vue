<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Popup from "../components/PopUp.vue";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const category = route.params.category; // "daily", "planners", "personal"

const habits = ref([]);
const showPopup = ref(false);
const popupMsg = ref("");

// Busca habitos da categoria selecionada
const loadHabits = async () => {
    if(!auth.user) return; // User não logado não vê habitos

    const res = await fetch(`http://localhost:3000/habits?userId=${auth.user.id}&category=${category}`);
    habits.value = await res.json();
};

// Verifica login ao entarar na página
onMounted(()=>{
    if(!auth.user){
        popupMsg.value = "⚠ Precisa estar logado para aceder aos hábitos."
        showPopup.value = true;
        return;
    }
    loadHabits();
})

// Vai para a página de criação de hábito
const goToCreate = () => {
    router.push(`/habits/${category}/create`);
};
</script>

<template>
    <div class="main-container">

       <header class="page-header">
           <h1 class="title"> Meus Hábitos – {{ category.toUpperCase() }}</h1>
           <p class="subtitle">Aqui pode visualizar, criar e gerir os seus hábitos de {{ category.toLowerCase() }}.</p>

           <button class="add-btn" @click="goToCreate">
               <span class="plus-icon">➕</span> Criar Novo Hábito
           </button>
       </header>

       <div v-if="habits.length === 0" class="empty-state">
           <p>Parece que ainda não tem hábitos de **{{ category.toUpperCase() }}**.</p>
           <p>Clique em **"Criar Novo Hábito"** para começar a tua jornada!</p>
       </div>

       <div class="habits-grid">
           <div v-for="habit in habits" :key="habit.id" class="habit-card">
               <h2 class="habit-name">{{ habit.name }}</h2>
               <div class="habit-details">
                   <p><span>Início:</span> {{ habit.start }}</p>
                   <p><span> Fim:</span> {{ habit.end }}</p>
               </div>
               </div>
       </div>

       <Popup
         v-if="showPopup"
         :message="popupMsg"
         @close="router.push('/login')"
       />
   </div>
</template>

<style scoped>
/* 1. CONTAINER E BACKGROUND GERAL */
.main-container {
  padding: 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0e0018, #180536); 
  color: white;
  font-family: Arial, sans-serif;
}

/* 2. CABEÇALHO DA PÁGINA */
.page-header {
    margin-bottom: 40px;
    border-bottom: 1px solid #3a0e63; 
    padding-bottom: 20px;
}

.title {
  font-size: 32px;
  margin-bottom: 5px;
  color: #c9a0ff; 
}

.subtitle {
    font-size: 16px;
    color: #ccc;
    margin-bottom: 20px;
}

/* 3. BOTÃO DE CRIAÇÃO */
.add-btn {
  background: linear-gradient(90deg, #8a2be2, #a052ff); 
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: inline-flex;
  align-items: center;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
}

.plus-icon {
    margin-right: 8px;
    font-size: 18px;
}

/* 4. ESTADO VAZIO */
.empty-state {
    background-color: #1a1a1a;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    color: #ccc;
    border: 2px dashed #4b0082;
    margin-top: 30px;
}
.empty-state p {
    margin: 5px 0;
}

/* 5. LISTA DE HÁBITOS (GRID) */
.habits-grid {
    display: grid;
    /* 3 colunas em telas maiores, 1 coluna em telas pequenas */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
    gap: 25px;
    margin-top: 30px;
}

.habit-card {
    background-color: #1a1a1a; 
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
    border-left: 5px solid #8a2be2; 
    transition: transform 0.3s ease;
}

.habit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
}

.habit-name {
    font-size: 22px;
    color: #c9a0ff; 
    margin-bottom: 10px;
    border-bottom: 1px solid #333;
    padding-bottom: 8px;
}

.habit-details p {
    font-size: 14px;
    margin: 5px 0;
    color: #ccc;
}

.habit-details span {
    font-weight: bold;
    color: white;
    margin-right: 5px;
}

/* 5. LISTA DE HÁBITOS (GRID) */
.habits-grid {
    display: grid;
    /* 3 colunas em telas maiores, 1 coluna em telas pequenas */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
    gap: 25px;
    margin-top: 30px;
}

/* ESTILO PARA O CARTÃO INDIVIDUAL */
.habit-card {
    background-color: #1f1f1f; /* Fundo do cartão ligeiramente mais claro que o background */
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4); /* Sombra mais visível */
    border-left: 6px solid #a052ff; /* Linha de destaque roxa vibrante */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex; /* Usar flexbox para melhor organização interna */
    flex-direction: column;
}

.habit-card:hover {
    transform: translateY(-5px); 
    box-shadow: 0 10px 20px rgba(160, 82, 255, 0.15); 
}

.habit-name {
    font-size: 22px;
    color: #e6e6fa; 
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #333; 
    font-weight: bold;
}

.habit-details {
    margin-top: auto; 
}

.habit-details p {
    font-size: 14px;
    margin: 8px 0;
    color: #b0b0b0; 
    display: flex;
    align-items: center;
}

.habit-details span {
    font-weight: bold;
    color: white;
    margin-right: 5px;
    font-size: 16px; 
}


.habit-name + .habit-details {
    margin-top: 0;
}
</style>
