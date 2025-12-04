<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';


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
            // Se o ID estiver em falta na URL (embora deva ser sempre fornecido via props)
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
        // 1. RE-INSERIDO: Define a string da data para uso interno (resolvendo o erro)
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

onMounted(() => {
    loadHabitData().then(() => {
        if(habit.value){
            generateCalendar();
        }
    });
});
</script>

<template>
    <div class="detail-container">
        <div v-if="loading" class="loading-state">A carregar detalhes do hábito...</div>

        <div v-else-if="habit" class="habit-content">
            <h1 class="habit-title">{{ habit.name }}</h1>
            <p class="habit-meta">Categoria: {{ habit.category.toUpperCase() }} | Início: {{ habit.start }}</p>
            
            <section class="calendar-section">
                <h2>Progresso Diário</h2>

                <div class="calendar-grid">
                    <div class="day-box weekday-label">Seg</div>
                    <div class="day-box weekday-label">Ter</div>
                    <div class="day-box weekday-label">Qua</div>
                    <div class="day-box weekday-label">Qui</div>
                    <div class="day-box weekday-label">Sex</div>
                    <div class="day-box weekday-label">Sáb</div>
                    <div class="day-box weekday-label">Dom</div>

                    <div v-for="day in calendarDays" 
                        :key="day.date || day.index" 
                        class="day-box"
                        :class="{ 
                            'completed': day.completed,
                            'is-today': day.isToday,
                            'missed': day.isMissed,       
                            'empty-day': day.isEmpty 
                        }"
                        :title="day.date">
                        <span v-if="!day.isEmpty">{{ day.dayOfMonth }}</span>
                    </div>
                </div>
                
                <button 
                    @click="addCompletion" 
                    class="check-in-button"
                    :disabled="loading"
                >
                    ✔️ Check-in de Hoje
                </button>
            </section>
            </div>
        <div v-else class="error-state">
            <p>Não foi possível encontrar o hábito.</p>
        </div>
    </div>
</template>

<style scoped>
.detail-container {
    padding: 40px;
    min-height: 100vh;
    background: linear-gradient(135deg, #0e0018, #180536); 
    color: white;
    font-family: Arial, sans-serif;
}
.loading-state, .error-state {
    text-align: center;
    padding: 50px;
    font-size: 1.2em;
}
.habit-title {
    font-size: 2.5em;
    color: #a052ff;
    margin-bottom: 10px;
}
.habit-meta {
    color: #ccc;
    margin-bottom: 30px;
    border-bottom: 1px solid #333;
    padding-bottom: 15px;
}
.calendar-section {
    margin-top: 40px;
    padding: 20px;
    background-color: #1f1f1f;
    border-radius: 12px;
}
.calendar-section h2 {
    color: #c9a0ff;
    margin-bottom: 20px;
    font-size: 1.5em;
}

/* --- GRELHA DO CALENDÁRIO --- */
.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr); 
    gap: 8px; 
    padding: 15px 0;
}

.day-box {
    padding: 10px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 0.9em;
    font-weight: bold;
    color: #ccc; 
    background-color: #2b2b2b; /* Cor neutra para dias pendentes */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in-out;
}

/* Estilo para as legendas dos dias da semana (Seg, Ter, ...) */
.weekday-label {
    background-color: #333;
    color: #999;
    font-size: 0.8em;
    text-transform: uppercase;
    height: 20px;
    line-height: 20px;
    padding: 5px;
}

/* Estilo para Placeholders vazios */
.empty-day {
    background-color: transparent; 
    box-shadow: none;
}

/* --- ESTADOS DA GRELA (Precedência) --- */

/* 1. Dia COMPLETO (Mais alta precedência) */
.day-box.completed {
    background: linear-gradient(135deg, #00b347, #55ff99);
    color: #1a1a1a;
    transform: scale(1.05); 
    border: none; /* Anula qualquer borda anterior */
}

/* 2. Dia PERDIDO (Aplica-se apenas a dias passados não completos) */
.day-box.missed {
    background-color: #7b241c; /* Vermelho escuro/ferrugem */
    border: 2px solid #e74c3c;
    color: white; 
}

/* 3. Dia ATUAL (Aplica-se hoje, sobrepõe-se a 'missed' e ao padrão) */
/* O dia atual é neutro, apenas com borda para o destacar. */
.day-box.is-today {
    background-color: #2b2b2b; /* Volta para a cor neutra do pendente */
    border: 3px solid #f39c12; /* Borda amarela/laranja forte */
    color: #ccc; 
}


/* --- BOTÃO DE CHECK-IN --- */
.check-in-button {
    display: block;
    width: 80%;
    margin: 20px auto 0;
    padding: 15px;
    border: none;
    border-radius: 10px;
    font-size: 1.1em;
    font-weight: bold;
    color: #1a1a1a;
    background: linear-gradient(to right, #00d463, #38ff93); 
    cursor: pointer;
    transition: background 0.3s, opacity 0.3s;
}
.check-in-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>