<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Popup from "../components/PopUp.vue"; 

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const baseUrl = 'http://localhost:3000'; 

const category = computed (() => route.params.category)

const habits = ref([]);
const completions = ref([]); // Estado para guardar todos os check-ins
const loading = ref(true);
const showPopup = ref(false);
const popupMsg = ref("");

// --- FUNÇÕES DE LÓGICA DE DATA ---
const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
};

// Carregar habitos E checkins para a lógica de coloração
const loadHabitsAndCompletions = async () => {
    loading.value = true;
    if(!auth.user) {
        // Usa o popup e redireciona se não estiver logado
        popupMsg.value = "⚠️ Precisa estar logado para aceder aos hábitos."
        showPopup.value = true;
        return;
    }

    const userId = auth.user.id;

    try {
        // 1. Obter todos os hábitos do utilizador e da categoria
        const habitsResponse = await fetch(`${baseUrl}/habits?userId=${userId}&category=${category.value}`);
        habits.value = await habitsResponse.json();

        // 2. Obter todos os check-ins do utilizador
        const completionsResponse = await fetch(`${baseUrl}/completions?userId=${userId}`);
        completions.value = await completionsResponse.json();

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    } finally {
        loading.value = false;
    }
};

// --- PROPRIEDADE COMPUTADA PARA O ESTADO DE COLORAÇÃO ---
const categorizedHabits = computed(() => {
    const today = getTodayDate();
    const todayDate = new Date(today);
    
    return habits.value.map(habit => {
        
        // 1. Verificar se o check-in já foi feito hoje
        const isCompletedToday = completions.value.some(completion => 
            completion.habitId === habit.id && completion.date === today
        );
        
        let status = 'pending'; // Roxo
        
        if (isCompletedToday) {
            status = 'completed'; // VERDE
        } else {
            // Verifica se a data de fim do hábito já passou
            const habitEndDate = new Date(habit.end);
            if (habitEndDate < todayDate) {
                 status = 'failed'; // VERMELHO (Desafio Terminado)
            }
        }
        
        return {
            ...habit,
            status: status,
            isCompleted: isCompletedToday
        };
    });
});

// --- FUNÇÕES DE INTERAÇÃO ---
// Verifica login e carrega dados ao entrar na página
onMounted(()=>{
    loadHabitsAndCompletions();
});

// Vai para a página de criação de hábito
const goToCreate = () => {
    router.push({
        name: 'CreateHabit',
        params: { category: category }
    });
};

// Vai para a página de detalhe do hábito (Check-in)
const goToDetail = (habitId) => {
    router.push({ name: 'HabitDetail', params: { id: habitId } });
};

// Lida com o fecho do popup (Redireciona para login)
const handlePopupClose = () => {
    showPopup.value = false;
    router.push('/login');
};
</script>

<template>
    <div class="main-container">

       <header class="page-header">
           <h1 class="title"> Meus Hábitos – {{ category.toUpperCase() }}</h1>
           <p class="subtitle">Aqui pode visualizar, criar e gerir os seus hábitos de {{ category.toLowerCase() }}.</p>

       </header>

       <div v-if="loading" class="loading-state">A carregar hábitos...</div>

       <div v-else-if="categorizedHabits.length === 0" class="empty-state">
           <p>Parece que ainda não tem hábitos de **{{ category.toUpperCase() }}**.</p>
           <p>Clique no botão da Barra de Navegação para começar a tua jornada!</p>
       </div>

       <div class="habits-grid" v-else>
           <div 
                v-for="habit in categorizedHabits" 
                :key="habit.id" 
                class="habit-card"
                :class="{
                    'status-completed': habit.status === 'completed',
                    'status-failed': habit.status === 'failed',
                    'status-pending': habit.status === 'pending'
                }"
                @click="goToDetail(habit.id)"
            >
               <h2 class="habit-name">{{ habit.name }}</h2>
               <div class="habit-details">
                   <p><span>Início:</span> {{ habit.start }}</p>
                   <p><span> Fim:</span> {{ habit.end }}</p>
                   <p><span> Status:</span> {{ habit.status.toUpperCase() }}</p> </div>
               </div>
       </div>

       <Popup
         v-if="showPopup"
         :message="popupMsg"
         @close="handlePopupClose" 
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

/* ESTILOS DO CARTÃO INDIVIDUAL */
.habit-card {
    background-color: #1f1f1f; 
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4); /* Sombra mais visível */
    border-left: 6px solid transparent; 
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-left 0.3s ease;
    display: flex; 
    flex-direction: column;
    cursor: pointer; /* Adicionado para indicar que é clicável */
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

/* ESTILOS DE STATUS CONDICIONAL (NOVOS/FALTANTES) */

/* VERDE: Concluído hoje */
.status-completed {
    border-left-color: #55ff99; /* Verde neon */
}

/* VERMELHO: Falhado (Desafio terminou) */
.status-failed {
    border-left-color: #ff5555; /* Vermelho forte */
    opacity: 0.7; /* Para dar ideia de que está inativo */
}

/* ROXO/PENDENTE: Por fazer hoje */
.status-pending {
    border-left-color: #a052ff; 
}


.loading-state {
    text-align: center;
    color: #c9a0ff;
    margin-top: 30px;
    font-size: 18px;
}
</style>
