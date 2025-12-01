<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'; 

const route = useRoute();
const router = useRouter();

const category = route.params.category;
const authStore = useAuthStore();

const habitName = ref('');
const start = ref('');
const end = ref('');

const error = ref("");
const success = ref("");

const createHabit = async () => {
    if (!authStore.user) {
        error.value = "Precisa fazer login.";
        return router.push('/login');
    }

    // Criar objeto do hábito
    const newHabit = {
        id: Date.now(),
        name: habitName.value,
        start: start.value,
        end: end.value,
        category
    };

    // Guardar no utilizador
    const updatedUser = {
        ...authStore.user,
        habits: [...(authStore.user.habits || []), newHabit]
    };

    // Atualizar na API
    await fetch(`http://localhost:3000/users/${authStore.user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser)
    });

    success.value = "Hábito criado com sucesso!";
    router.push(`/habits/${category}`);
};
</script>

<template>
  <div class="container">

    <h1>Criar Hábito ({{ category }})</h1>

    <form @submit.prevent="createHabit">
      <input v-model="habitName" type="text" placeholder="Nome do hábito" required />
      <input v-model="start" type="date" required />
      <input v-model="end" type="date" required />

      <button type="submit">Criar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>

  </div>
</template>

<style>
.container {
  padding: 30px;
  color: white;
}
.error { color: red; }
.success { color: green; }
</style>
