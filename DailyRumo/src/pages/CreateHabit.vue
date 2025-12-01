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
    const updatedUser = {   // Aqui estamos a criar um novo objeto de utilizador com o hábito adicionado
        ...authStore.user,
        habits: [...(authStore.user.habits || []), newHabit]  // Adiciona o novo hábito à lista existente
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
    <div class="background-container"> 
      
      <div class="card-form">
  
          <h1>✨ Criar Hábito</h1>
  
          <div class="category-tag">Categoria: {{ category.toUpperCase() }}</div>
  
          <form @submit.prevent="createHabit" class="habit-form">
            
            <div class="input-group">
              <label for="habit-name">Nome</label>
              <input 
                v-model="habitName" 
                type="text" 
                id="habit-name"
                placeholder="Ex: Beber 2L de água" 
                required 
              />
            </div>
  
            <div class="input-group">
              <label for="start-date">Data de Início</label>
              <input v-model="start" type="date" id="start-date" required />
            </div>
            
            <div class="input-group">
              <label for="end-date">Data Limite</label>
              <input v-model="end" type="date" id="end-date" required />
            </div>
  
            <button type="submit" class="submit-btn">
               Salvar Hábito
            </button>
          </form>
  
          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="success" class="success">{{ success }}</p>
          
          <button @click="router.back()" class="back-btn">Cancelar</button>
      </div>
    </div>
  </template>

<style scoped>
/*  ESTILO DO BACKGROUND GERAL */
.background-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1e0b3e); 
  padding: 20px;
}

/*  ESTILO DA CAIXA FLUTUANTE (O CARTÃO) */
.card-form {
  width: 90%;
  max-width: 450px;
  background-color: #1a1a1a; 
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 
              0 0 0 4px rgba(70, 0, 100, 0.5); 
  color: white;
  text-align: left;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 28px;
  margin-bottom: 10px;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
}

.category-tag {
    display: inline-block;
    background-color: #333;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #a878ff; 
    margin-bottom: 25px;
}

/* ESTILO DO FORMULÁRIO E INPUTS */
.habit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
    display: flex;
    flex-direction: column;
}

.input-group label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #ccc;
    font-weight: bold;
}

input {
  background-color: #2b2b2b; 
  border: 1px solid #444;
  border-radius: 10px;
  padding: 12px 15px;
  color: white;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #9955ff; 
  box-shadow: 0 0 0 3px rgba(153, 85, 255, 0.4);
  outline: none;
}

/*  ESTILO DO BOTÃO PRINCIPAL */
.submit-btn {
  background: linear-gradient(90deg, #9955ff, #c37eff); 
  color: white;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 15px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(153, 85, 255, 0.4);
}

.back-btn {
    background: none;
    color: #aaa;
    border: none;
    padding: 10px;
    margin-top: 15px;
    cursor: pointer;
    font-size: 14px;
    transition: color 0.2s;
}

.back-btn:hover {
    color: white;
}

/* 5. MENSAGENS DE ERRO/SUCESSO */
.error, .success {
    margin-top: 15px;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
}
.error { 
    background-color: #4f0000; 
    color: #ff8888; 
    border: 1px solid #ff0000;
}
.success { 
    background-color: #004f00; 
    color: #88ff88; 
    border: 1px solid #00ff00;
}
</style>
