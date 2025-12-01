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
     <div class="container">
    <h1 class="title">Hábitos – {{ category }}</h1>

    <button class="btn" @click="goToCreate">➕ Criar Hábito</button>

    <div v-if="habits.length === 0" class="empty">
      Nenhum hábito ainda nesta categoria.
    </div>

    <div class="list">
      <div v-for="habit in habits" :key="habit.id" class="habit">
        <h2>{{ habit.name }}</h2>
        <p>Início: {{ habit.start }}</p>
        <p>Fim: {{ habit.end }}</p>
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
.container {
  padding: 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #150015, #2b005e);
  color: white;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

input, button {
  padding: 10px;
  border-radius: 8px;
  border: none;
}

button {
  background: purple;
  color: white;
  cursor: pointer;
}
</style>
