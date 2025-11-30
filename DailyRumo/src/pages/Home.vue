<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import Popup from "../components/PopUp.vue";

const authStore = useAuthStore();
const router = useRouter();

const showPopup = ref(false);
const popupMessage = ref("");

const openCategory = (category) => {
  if (!authStore.user) {
    popupMessage.value = "⚠ Precisa fazer login para aceder a esta secção.";
    showPopup.value = true;
    return;
  }

  router.push(`/habits/${category}`);
};
</script>


<template>
    <div class="container">
    
   
     <img class="headerImg" alt="imagem do card" src="../assets/cardImg.png" />
    
     <h1>
       Bem Vindo ao DailyRumo!
       <img class="logo" alt="logotipo" src="../assets/logo.png" />
     </h1>
    
     <div class="cardsContainer">
    
       <div class="card" @click="openCategory('daily')">
         <img class="cardimg" alt="Icone de tarefas" src="../assets/card1Img.png" />
         <h2>Daily</h2>
         <ul>
           <li>Planeador</li>
           <li>Habitos</li>
           <li>Diario</li>
         </ul>
       </div>
    
       <div class="card" @click="openCategory('planners')">
         <img class="cardimg" alt="I­cone de metas" src="../assets/card2Img.png" />
         <h2>Planners</h2>
         <ul>
           <li>Planeador de refeição</li>
           <li>Planeador de Viagens</li>
           <li>Planeador de Treino</li>
         </ul>
       </div>
    
       <div class="card" @click="openCategory('personal')">
         <img class="cardimg" alt="I­cone de finanças" src="../assets/card3Img.png" />
         <h2>Personal</h2>
         <ul>
           <li>Leitura</li>
           <li>Filmes</li>
           <li>Finanças</li>
         </ul>
       </div>
    
       <div class="card" @click="openCategory('goals')">
         <img class="cardimg" alt="I­cone de produtividade" src="../assets/card4Img.png" />
         <h2>Goals</h2>
         <ul>
           <li>Visão</li>
           <li>Saúde</li>
           <li>Objectivos</li>
         </ul>
       </div>
    
     </div>
     
     <Popup 
  v-if="showPopup" 
  :message="popupMessage" 
  @close="router.push('/login')"/>

    </div> 
     </template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  text-align: center;
}

.logo {
  width: 100px;
  height: auto;
}

h1 {
  font-family: 'Arial', bold;
  font-size: 40px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.headerImg {
  width: 90%;
  height: auto;
  border-radius: 16px;
  object-fit: cover;
  display: block;
  margin: 40px auto 20px auto;
}

.cardsContainer {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.card {
  background-color:#111;
  border-radius: 16px;
  padding: 12px;
  text-align: left;
  color: white;
  font-family: 'Arial', bold;
  transition: 0.3s ease;
  cursor: pointer;
}

.card:hover {
  background-color: purple;
  transform: translateY(-4px);
}

.cardimg {
  width: 100%;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
}

.card h2 {
  font-size: 20px;
  margin-top: 10px;
}

.card ul {
  list-style: none;
  padding: 0;
  margin-top: 8px;
  font-size: 14px;
  opacity: 0.8;
}

.card li {
  margin-bottom: 4px;
}
</style>
    