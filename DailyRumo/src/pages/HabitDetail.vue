<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';
import { getWeatherByCity } from '@/services/weatherService'



const weather = ref(null)
const weatherError = ref(null)
const city = "Porto"


const isHabitFinished = computed(() => {
  if (!habit.value?.end) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(habit.value.end);
  endDate.setHours(0, 0, 0, 0);

  return today > endDate;
});



const router = useRouter(); 
const authStore = useAuthStore();
const baseUrl = 'http://localhost:3000';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const habit = ref(null);
const completions = ref([]);
const loading = ref(true);
const habitId = props.id; 

// Função para adicionar um check-in (completion)
const addCompletion = async () => {
    const today = new Date().toISOString().split('T')[0];
    // Verifica se já existe um check-in para hoje
    const alreadyCompleted = completions.value.some((c) => new Date(c.date).toISOString().split('T')[0]=== today);
    if(alreadyCompleted){
        alert("Já fez check-in para hoje!");
        return;
    }
    const completionData = {
        userId: authStore.user.id,
        habitId: habitId,
        date: today
    };
    try {
        const response = await fetch(`${baseUrl}/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(completionData)
        });
        if (!response.ok) {
            throw new Error(' Houve uma falha ao registar o check-in.');
        }
        const newCompletion = await response.json();
        // Atualiza o estado e regenera o calendário
        completions.value.push(newCompletion);
        generateCalendar();
        
        // Logica de atribuição Xp por cada dia que o utlizador faz check-in
        await authStore.addXP(20); // XP por check-in
    
    }catch(error){
        console.error("Erro ao fazer check-in:", error);
    }
}

// Função de carregamento de dados
const loadHabitData = async () => {
    loading.value = true;

    // 2. Safegard adicional:
    if (!authStore.user || !habitId) { 
        if (!authStore.user) router.push('/login');
        else {
            // Se o ID estiver em falta na URL
            console.error("ID do hábito em falta na rota.");
            router.push('/habits/daily'); // Redirecionar para a lista
        }
        return;
    }

    try {
        // 3. Obter detalhes do hábito (fetch)
        const habitResponse = await fetch(`${baseUrl}/habits/${habitId}`);
        
        if (!habitResponse.ok) {
            // Se o servidor devolver 404 (Hábito não existe), isto é apanhado
            throw new Error(`Hábito com ID ${habitId} não encontrado.`);
        }
        
        habit.value = await habitResponse.json();

        // 4. Obter os check-ins (completions) específicos deste hábito
        const completionsResponse = await fetch(`${baseUrl}/completions?habitId=${habitId}`);
        completions.value = await completionsResponse.json();

    } catch (error) {
        console.error("Erro ao carregar detalhe do hábito:", error);
        habit.value = null; // Garante que o estado de erro é exibido
    } finally {
        loading.value = false;
    }
};

const calendarDays = ref([]); // Placeholder para os dias do calendário

// Função para gerar o calendário
const generateCalendar = () => {
    if(!habit.value) return;
    
    const startDate = new Date(habit.value.start);
    startDate.setHours(0,0,0,0);
    
    const today = new Date();
    today.setHours(0,0,0,0);

    let currentDate = startDate;
    const days = [];

    // --- CÁLCULO PARA O ALINHAMENTO DA GRELA (Placeholders) ---
    let startDayOfWeek = startDate.getDay();
    let dayIndexForOffset = (startDayOfWeek - 1 + 7) % 7 // Ajusta para segunda-feira como início da semana
    let placeholders = dayIndexForOffset; // O numero de placeholder é igual ao índice do dia da semana
    
    // Adiciona placeholders vazios no início
    for(let i = 0; i < placeholders; i++) {
        days.push({ 
            date: null, 
            dayOfMonth: null, 
            completed: false, 
            isToday: false,
            isEmpty: true 
        });
    }

    // Um loop que itera desde a data de inicio até hoje
    while(currentDate <= today){
        // 1. RE-INSERIDO: Define a string da data para uso interno 
        const dateString = currentDate.toISOString().split('T')[0];

        // Verifica se há um check-in para este dia
        const completed = completions.value.some((c) => new Date(c.date).toISOString().split('T')[0]===dateString);
        
        // CÁLCULO DE ESTADOS DE DIA
        const isToday = currentDate.getTime() === today.getTime(); 
        const isStrictlyPast = currentDate.getTime() < today.getTime();
        
        // O dia é PERDIDO se: (Estiver no Passado) E (Não estiver Completo)
        const isMissed = isStrictlyPast && !completed;
        // -------------------------------------------------
        
        days.push({
            date: dateString,
            dayOfMonth: currentDate.getDate(),
            completed: completed,
            isToday: isToday,
            isEmpty: false,
            isMissed: isMissed 
        });

        // Avança para o próximo dia
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    // Atribui o array de dias ao calendario após o loop acabar
    calendarDays.value = days; 
};

onMounted(async() => {
    loadHabitData().then(() => {
        if(habit.value){
            generateCalendar();
        }
    });
    try{
        weather.value = await getWeatherByCity(city)
    }catch(err){
        weatherError.value = err.message
    }
});

const deleteHabit = async () => {
    const confirmDelete = confirm("Tem a certeza que quer apagar este hábito? Esta ação não pode ser desfeita.");
    if(!confirmDelete) return;

    try {
    //Apagar os check-ins ligados a este hábito
    const completionsResponse = await fetch(
      `${baseUrl}/completions?habitId=${habitId}`
    );
    const habitCompletions = await completionsResponse.json();

    for (const completion of habitCompletions) {
      await fetch(`${baseUrl}/completions/${completion.id}`, {
        method: "DELETE"
      });
    }

    // 2Apagar o hábito
    await fetch(`${baseUrl}/habits/${habitId}`, {
      method: "DELETE"
    });

    // Voltar para a lista de hábitos
    router.push("/habits/daily");

  } catch (error) {
    console.error("Erro ao apagar hábito:", error);
    alert("Erro ao apagar o hábito.");
  }

}


</script>

<template>
    <div class ="detail-wrapper">
        <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>A carregar detalhes...</p>
        </div>

        <div v-else-if="habit" class="habit-container">
            <header class="habit-header">
                <div class="title-section">
                    <h1 class="habit-title">{{ habit.name }}</h1>
                    <div class="habit-badges">
                        <span class="badge category">{{ habit.category }}</span>
                        <span class="badge date">Início: {{ habit.start }}</span>
                    </div>
                </div>
                <button @click="deleteHabit" class="btn-icon-delete" title="Apagar Hábito ">🗑️</button>
            </header>
            <div v-if="weather && habit.category === 'outdoor'" class="weather-glass-card">
                <div class="weather-loc">
                    <h3>{{ weather.name }}</h3>
                    <span class="temp">{{ Math.round(weather.main.temp) }}ºC</span>
                </div>
                <div class="weather-status">
                    <p class="desc">{{ weather.weather[0].description }}</p>

                    <div v-if="weather.weather[0].main=== 'Rain'" class="alert-box rain">
                        <img width="32" height="32" src="https://img.icons8.com/color/48/rain--v1.png" alt="rain"/>
                        <span>Chuva prevista - Adapta o teu plano.</span>
                    </div>
                    <div v-else class="alert-box sun">
                        <img width="32" height="32" src="https://img.icons8.com/color/48/sun-star.png" alt="sun-star"/>
                        <span>Dia perfeito para este hábito!</span>
                    </div>
                </div>
            </div>

            <section class="progress-section">
                <div class="section-header">
                    <h2>Progresso Diario</h2>
                    <div class="legend">
                    <div class="legend-item">
                        <span class="dot done"></span>
                        <span>Feito</span>
                    </div>
                    <div class="legend-item">
                        <span class="dot missed"></span>
                        <span>Falhado</span>
                    </div>
                </div>
                </div>

                <div class="calendar-wrapper">
                    <div class="calendar-grid">
                        <div v-for="label in ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom']" :key="label" class="weekday-label">
                            {{ label }}
                        </div>

                        <div v-for="(day, index) in calendarDays" 
                            :key="day.date || index" 
                            class="day-cell"
                            :class="{ 
                                'completed': day.completed,
                                'is-today': day.isToday,
                                'missed': day.isMissed,       
                                'empty': day.isEmpty 
                            }">
                            <span v-if="!day.isEmpty">{{ day.dayOfMonth }}</span>
                        </div>
                    </div>
                </div>
                <div class="action-area">
                    <button 
                        @click="addCompletion" 
                        class="btn-primary check-in"
                        :disabled="loading || isHabitFinished"
                    >
                        <span v-if="!isHabitFinished">✔ Efectuar Check-in</span>
                        <span v-else>Hábito Concluído</span>
                    </button>
                    <p v-if="isHabitFinished" class="habit-ended-msg">
                        Este hábito atingiu a data de término.
                    </p>
                </div>
            </section>
        </div>
        <div v-else class="error-state">
            <p>Hábito não encontrado ou removido</p>
            <button @click="router.push('/')" class="btn-secondary">Voltar à Home</button>  
        </div>
    </div>
    
</template>

<style scoped>
    .detail-wrapper {
        padding: 120px 20px 60px; /* Espaço para a Navbar fixa */
        min-height: 100vh;
        display: flex;
        justify-content: center;
    }
    
    .habit-container {
        width: 100%;
        max-width: 800px;
        animation: fadeIn 0.5s ease;
    }
    
    /* Header */
    .habit-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 30px;
    }
    
    .habit-title {
        font-size: 2.8rem;
        font-weight: 800;
        background: linear-gradient(90deg, #ffffff, #c37eff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 10px;
    }
    
    .habit-badges {
        display: flex;
        gap: 10px;
    }
    
    .badge {
        padding: 4px 12px;
        border-radius: 50px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .badge.category { background: rgba(195, 126, 255, 0.2); color: #c37eff; border: 1px solid rgba(195, 126, 255, 0.3); }
    .badge.date { background: rgba(255, 255, 255, 0.05); color: rgba(255,255,255,0.6); }
    
    /* Clima Card */
    .weather-glass-card {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 25px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .weather-loc h3 { font-size: 0.9rem; color: rgba(255,255,255,0.5); text-transform: uppercase; }
    .weather-loc .temp { font-size: 2rem; font-weight: 800; }
    
    .alert-box {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 15px;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 10px;
    }
    
    .alert-box.rain { background: rgba(59, 130, 246, 0.1); color: #93c5fd; }
    .alert-box.sun { background: rgba(255, 207, 84, 0.1); color: #ffe08a; }
    
    /* Calendário */
    .progress-section {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 30px;
        padding: 30px;
    }
    
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }
    
    .legend { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
    .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-left: 10px; }
    .dot.done { background: #00d463; }
    .dot.missed { background: #ff4d4d; }
    
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
    }
    
    .weekday-label {
        text-align: center;
        font-size: 0.7rem;
        font-weight: 800;
        color: rgba(255,255,255,0.3);
        text-transform: uppercase;
        padding-bottom: 10px;
    }
    
    .day-cell {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.03);
        font-size: 0.9rem;
        font-weight: 600;
        color: rgba(255,255,255,0.4);
        transition: all 0.2s;
    }
    
    .day-cell.completed { background: #00d463; color: #000; box-shadow: 0 0 15px rgba(0, 212, 99, 0.3); }
    .day-cell.missed { background: rgba(255, 77, 77, 0.1); border: 1px solid rgba(255, 77, 77, 0.3); color: #ff4d4d; }
    .day-cell.is-today { border: 2px solid #c37eff; color: #fff; }
    .day-cell.empty { background: transparent; }
    
    /* Botões */
    .action-area { text-align: center; margin-top: 30px; }
    
    .btn-primary {
        padding: 16px 40px;
        border-radius: 50px;
        border: none;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: 0.3s;
    }
    
    .btn-primary.check-in {
        background: linear-gradient(90deg, #9955ff, #c37eff);
        color: white;
        box-shadow: 0 10px 20px rgba(153, 85, 255, 0.2);
    }
    
    .btn-primary:disabled { opacity: 0.3; cursor: not-allowed; filter: grayscale(1); }
    
    .btn-icon-delete {
        background: rgba(255, 59, 59, 0.1);
        border: 1px solid rgba(255, 59, 59, 0.2);
        padding: 10px;
        border-radius: 12px;
        cursor: pointer;
        transition: 0.3s;
    }
    
    .btn-icon-delete:hover { background: #ff3b3b; transform: scale(1.1); }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    @media (max-width: 600px) {
        .habit-header { flex-direction: column; gap: 15px; }
        .weather-glass-card { flex-direction: column; text-align: center; gap: 20px; }
    }
    </style>
