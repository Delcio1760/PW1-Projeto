<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { useAuthStore } from '@/stores/authStore'; 
import { onMounted, defineProps } from 'vue';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})

const router = useRouter();

const authStore = useAuthStore();


const habitName = ref('');
const start = ref('');
const end = ref('');
const environment = ref('indoor')

const startTime = ref('');
const endTime = ref('');


const error = ref("");
const success = ref("");

onMounted(()=>{
  if(!authStore.user){
    router.push('/login');
  }
})

const createHabit = async () => {
  if (new Date(end.value) < new Date(start.value)) {
  error.value = "⚠️ A data de fim não pode ser anterior à data de início.";
  return;
}
   if(!authStore.user){
      
       error.value = "⚠️ Precisa estar logado para criar hábitos.";
       return;
   }

   const newHabit = {
    name: habitName.value,
    start: start.value,
    end: end.value,
    category: environment.value,
    userId: authStore.user.id,
    startTime: startTime.value || '00:00',
    endTime: endTime.value || '23:59',
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
        throw new Error("Erro ao criar hábito. Tente novamente.");
    }
    const createdHabit = await response.json();
    
    success.value = "Hábito criado com sucesso!";
    setTimeout(()=>{router.push(`/habits/${createdHabit.id}`)},2000);  /* Pus esse timeout para dar algum tempo para puder
                                                                       visualizar a mensagem de sucesso depois da criação do habito */
    habitName.value = "";
    startTime.value = "";
    endTime.value = "";
    error.value = "";
    
   
  }catch(error){
    success.value = "";
    error.value = error.message;
   }
};

</script>

<template>
  <div class="main-container"> 
    <header class="page-header-section">
      <img src="https://img.icons8.com/?size=100&id=7LhMaNDFgoYK&format=png&color=000000" class="header-icon" alt="Criar">
      <h1 class="premium-title">Criar Novo Hábito</h1>
      <p class="subtitle">Define a tua próxima meta e mantém a consistência.</p>
    </header>

    <div class="form-card glass-effect">
      <form @submit.prevent="createHabit">
        
        <div class="input-group">
          <label for="habit-name" class="label-title">O que vais conquistar?</label>
          <input
            type="text"
            id="habit-name"
            v-model="habitName"
            required
            placeholder="Ex: Meditação Matinal"
            class="premium-input"
          >
        </div>

        <div class="input-group">
          <label class="label-title">Duração da Jornada</label>
          <div class="date-grid">
            
            <div class="date-field">
              <span class="date-helper">Início</span>
              <img src="https://img.icons8.com/?size=100&id=23&format=png&color=c37eff" class="field-icon-svg" alt="calendário">
              <input 
                type="date" 
                v-model="start" 
                required 
                class="premium-input with-icon"
              >
            </div>

            <div class="date-field">
              <span class="date-helper">Fim</span>
              <img src="https://img.icons8.com/?size=100&id=12586&format=png&color=c37eff" class="field-icon-svg" alt="meta">
              <input 
                type="date" 
                v-model="end" 
                required 
                class="premium-input with-icon"
              >
            </div>
          </div>
        </div>

        <div class="input-group">
          <label class="label-title">Ambiente de Execução</label>
          <div class="environment-toggle">
            <label class="toggle-option" :class="{ active: environment === 'indoor' }">
              <input type="radio" v-model="environment" value="indoor" class="hidden-radio">
              <div class="option-content">
                <img src="https://img.icons8.com/?size=100&id=73&format=png&color=c37eff" class="toggle-icon" alt="indoor">
                <span>Indoor</span>
              </div>
            </label>
            <label class="toggle-option" :class="{ active: environment === 'outdoor' }">
              <input type="radio" v-model="environment" value="outdoor" class="hidden-radio">
              <div class="option-content">
                <img src="https://img.icons8.com/?size=100&id=63539&format=png&color=c37eff" class="toggle-icon" alt="outdoor">
                <span>Outdoor</span>
              </div>
            </label>
          </div>
        </div>

        <div class="message-container">
          <transition name="fade" mode="out-in">
            <p v-if="error" :key="'err'" class="alert-msg error">{{ error }}</p>
            <p v-else-if="success" :key="'succ'" class="alert-msg success">{{ success }}</p>
          </transition>
        </div>

        <button type="submit" class="premium-submit-btn">
          Salvar Hábito 
          <img src="https://img.icons8.com/?size=100&id=98967&format=png&color=ffffff" class="btn-icon" alt="check">
        </button>

      </form>
    </div>
  </div> 
</template>


<style scoped>
  /* 1. CONTAINER PRINCIPAL E FUNDO */
  .main-container {
      padding: 120px 20px 60px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      /* Radial gradient para dar profundidade ao fundo escuro */
      background: radial-gradient(circle at top, #1e0b3e 0%, #0f0f0f 100%);
  }
  
  .page-header-section {
      text-align: center;
      margin-bottom: 30px;
  }
  
  .header-icon { 
      width: 50px; 
      height: 50px;
      margin-bottom: 10px; 
  }
  
  .premium-title {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(90deg, #ffffff, #c37eff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
  }
  
  .subtitle { 
      color: rgba(255, 255, 255, 0.6); 
      margin-top: 10px;
  }
  
  /* 2. CARD GLASSMORPHISM */
  .glass-effect {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 25px;
      padding: 35px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
  
  /* 3. GRUPOS DE INPUT E LABELS */
  .input-group { 
      margin-bottom: 30px; 
  }
  
  .label-title {
      color: #c37eff;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
      display: block;
  }
  
  .premium-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 14px 15px;
      color: white;
      font-size: 1rem;
      transition: all 0.3s ease;
  }
  
  .premium-input:focus {
      outline: none;
      border-color: #c37eff;
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 15px rgba(195, 126, 255, 0.2);
  }
  
  .premium-input.with-icon { 
      padding-left: 45px; 
  }
  
  /* 4. GRID DE DATAS E HELPERS */
  .date-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 20px; 
  }
  
  .date-field { 
      position: relative; 
      display: flex; 
      align-items: center;
      margin-top: 10px; 
  }
  
  .date-helper {
      position: absolute;
      top: -18px;
      left: 2px;
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 700;
      text-transform: uppercase;
  }
  
  .field-icon-svg { 
      position: absolute; 
      left: 15px; 
      width: 18px; 
      height: 18px;
      pointer-events: none; 
      opacity: 0.9;
  }
  
  /* 5. SELECTOR DE AMBIENTE (TOGGLE) */
  .environment-toggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      background: rgba(0, 0, 0, 0.2);
      padding: 6px;
      border-radius: 14px;
  }
  
  .toggle-option {
      padding: 12px;
      text-align: center;
      cursor: pointer;
      border-radius: 10px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 600;
      transition: all 0.3s ease;
  }
  
  .toggle-option.active {
      background: #c37eff;
      color: white;
      box-shadow: 0 4px 15px rgba(195, 126, 255, 0.3);
  }
  
  .toggle-option.active .toggle-icon { 
      filter: brightness(0) invert(1); 
  }
  
  .option-content { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      gap: 8px; 
  }
  
  .toggle-icon { width: 20px; height: 20px; }
  .hidden-radio { display: none; }
  
  /* 6. BOTÃO SUBMIT */
  .premium-submit-btn {
      width: 100%;
      padding: 16px;
      background: linear-gradient(90deg, #9955ff, #c37eff);
      color: white;
      border: none;
      border-radius: 15px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .premium-submit-btn:hover { 
      transform: translateY(-3px); 
      box-shadow: 0 10px 20px rgba(153, 85, 255, 0.4);
  }
  
  .btn-icon { width: 20px; margin-left: 10px; }
  
  /* 7. MENSAGENS E ANIMAÇÕES */
  .message-container { 
      min-height: 60px; 
      display: flex;
      align-items: center;
  }
  
  .alert-msg { 
      width: 100%;
      padding: 12px; 
      border-radius: 10px; 
      text-align: center; 
      font-size: 0.9rem; 
      font-weight: 600;
  }
  
  .alert-msg.error { 
      background: rgba(255, 77, 77, 0.1); 
      color: #ff4d4d; 
      border: 1px solid rgba(255, 77, 77, 0.2); 
  }
  
  .alert-msg.success { 
      background: rgba(0, 212, 99, 0.1); 
      color: #00d463; 
      border: 1px solid rgba(0, 212, 99, 0.2); 
  }
  
  .fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
  
  input[type="date"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(1) sepia(100%) saturate(500%) hue-rotate(240deg);
      opacity: 0.6;
  }
  </style>