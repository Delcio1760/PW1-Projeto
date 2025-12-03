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

onMounted(() => {
    loadHabitData();
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
                    <p>Estrutura da grelha de calendário será inserida aqui.</p>
                </div>
            </section>
            
            <button class="checkin-btn">
                ✔️ Check-in de Hoje
            </button>
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
.checkin-btn {
    width: 100%;
    max-width: 400px;
    display: block;
    margin: 30px auto 0;
    padding: 15px;
    background: linear-gradient(90deg, #55ff99, #00b347);
    border: none;
    border-radius: 8px;
    color: #1a1a1a;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
}
.checkin-btn:hover {
    box-shadow: 0 0 15px rgba(85, 255, 153, 0.6);
}
</style>