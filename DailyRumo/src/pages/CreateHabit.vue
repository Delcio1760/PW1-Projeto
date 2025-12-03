<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // useRoute removido
import { useAuthStore } from '@/stores/authStore'; 
import { onMounted, defineProps } from 'vue';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})

// const route = useRoute(); // REMOVIDO
const router = useRouter();

const authStore = useAuthStore();

const habitName = ref('');
const start = ref('');
const end = ref('');

const startTime = ref('');
const endTime = ref('');

const goalValue = ref(1);
const goalUnit = ref('vez/dia');

const error = ref("");
const success = ref("");

onMounted(()=>{
  if(!authStore.user){
    router.push('/login');
  }
})

const createHabit = async () => {
   if(!authStore.user){
      
       error.value = "⚠️ Precisa estar logado para criar hábitos.";
       return;
   }

   const newHabit = {
    name: habitName.value,
    start: start.value,
    end: end.value,
    category: props.category,
    userId: authStore.user.id,
    startTime: startTime.value || '00:00',
    endTime: endTime.value || '23:59',

    goalValue: goalValue.value,
    goalUnit: goalUnit.value
   };

   try{
    const response = await fetch('http://localhost:3000/habits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newHabit)
    });
    if(!response.ok){
        // CORREÇÃO DE ENCODING
        throw new Error("Erro ao criar hábito. Tente novamente.");
    }
    
    success.value = "✅ Hábito criado com sucesso!";
    habitName.value = "";
    startTime.value = "";
    endTime.value = "";
    goalValue.value = 1;
    error.value = "";
    router.push(`/habits/${props.category}`);
   
  }catch(error){
    success.value = "";
    error.value = error.message;
   }
};
</script>

<template>
  <div class="main-container"> 
    
    <h1 class="page-header">✨ Criar Hábito</h1>

    <div class="form-card">
      <form @submit.prevent="createHabit">
        
        <div class="section-group">
          <label for="habit-name" class="label-title">Nome do Hábito</label>
          <input type="text" id="habit-name" v-model="habitName" required placeholder="Ex: Beber 3L de água" class="input-field">
        </div>

        <div class="section-group">
          <label class="label-title">Meta (Goal)</label>
          <div class="goal-input-group">
            
            <input type="number" v-model.number="goalValue" min="1" required class="input-field goal-value-input">
            
            <select v-model="goalUnit" class="input-field goal-unit-select">
                <option value="vez/dia">vez/dia</option>
                <option value="vezes/semana">vezes/semana</option>
                <option value="minutos">minutos</option>
                <option value="páginas">páginas</option>
            </select>
            
          </div>
        </div>
        
        <div class="section-group">
          <label class="label-title">Período e Horário</label>
          
          <div class="date-input-group">
            <div class="date-field">
                <label for="start-date">📅 Data Início</label>
                <input type="date" id="start-date" v-model="start" required class="input-field">
            </div>
            <div class="date-field">
                <label for="end-date">🚩 Data Fim</label>
                <input type="date" id="end-date" v-model="end" required class="input-field">
            </div>
          </div>

          <div class="date-input-group mt-3">
             <div class="date-field">
                <label for="start-time">⌚ Hora Início</label>
                <input type="time" id="start-time" v-model="startTime" class="input-field">
            </div>
            <div class="date-field">
                <label for="end-time">⏱️ Hora Limite</label>
                <input type="time" id="end-time" v-model="endTime" class="input-field">
            </div>
          </div>

        </div>

        <div class="section-group">
          <label class="label-title">Categoria</label>
          <p class="category-display">{{ props.category.toUpperCase() }}</p>
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>
        <p v-if="success" class="success-msg">{{ success }}</p>

        <button type="submit" class="submit-btn">
          <span class="icon">✔️</span> Salvar Hábito
        </button>
        
      </form>
    </div>
  </div> 
</template>

<style scoped>
/* 1. BACKGROUND GERAL E CONTAINER PRINCIPAL */
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0f0f, #1e0b3e);
}

.page-header {
    font-size: 36px;
    color: #c37eff; /* Cor roxa primária */
    margin-bottom: 30px;
    font-weight: bold;
}

/* 2. CARD PRINCIPAL (form-card) */
.form-card {
  width: 100%;
  max-width: 600px; /* Largura para acomodar bem os campos */
  background-color: #1a1a1a; 
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 
              0 0 0 4px rgba(70, 0, 100, 0.5); 
  color: white;
  text-align: left;
}

/* 3. ESTILO DOS GRUPOS DE SECÇÕES */
.section-group {
    margin-bottom: 25px;
    padding: 15px;
    background-color: #2b2b2b;
    border-radius: 10px;
    border-left: 5px solid #a052ff; /* Roxo primário */
}

.label-title {
    display: block;
    font-size: 14px;
    color: #c37eff;
    margin-bottom: 8px;
    font-weight: bold;
}

.input-field {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #444;
    border-radius: 8px;
    background-color: #333;
    color: white;
    font-size: 16px;
    box-sizing: border-box;
}

.input-field:focus {
    border-color: #9955ff;
    box-shadow: 0 0 0 3px rgba(153, 85, 255, 0.4);
    outline: none;
}

/* 4. ESTILOS DE GOAL E DATAS/HORAS */
.goal-input-group, .date-input-group {
    display: flex;
    gap: 15px;
}

.goal-value-input {
    width: 30%;
    text-align: center;
}

.goal-unit-select {
    width: 70%;
}

.date-field {
    flex: 1;
}

.date-field label {
    display: block;
    color: #ccc;
    font-size: 12px;
    margin-bottom: 5px;
}

.mt-3 {
    margin-top: 15px;
}

.category-display {
    background-color: #a052ff;
    color: white;
    padding: 8px 15px;
    border-radius: 6px;
    display: inline-block;
    font-weight: bold;
}

/* 5. ESTILO DO BOTÃO SUBMIT */
.submit-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(90deg, #9955ff, #c37eff);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 25px;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(153, 85, 255, 0.4);
}

/* 6. MENSAGENS DE FEEDBACK */
.error-msg, .success-msg {
    margin-top: 15px;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
}
.error-msg { 
    background-color: #4f0000; 
    color: #ff8888; 
    border: 1px solid #ff0000;
}
.success-msg { 
    background-color: #004f00; 
    color: #88ff88; 
    border: 1px solid #00ff00;
}
</style>
