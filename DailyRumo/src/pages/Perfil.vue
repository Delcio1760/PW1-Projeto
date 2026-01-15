<script setup>
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

if (!auth.user) {
    router.push('/login');
}

const user = auth.user;

const newPassword = ref('');
const confirmPassword = ref('');
const passwordMsg = ref('');   // Mensagem de feedback para o utilizador, pode ser sucesso ou erro

// Função para fazer logout
const doLogout = () => {
    auth.logout();
    router.push('/login');
};

// Função para atualizar a palavra-passe

const updatePassword = async () => {
    passwordMsg.value = '';
    
    if(newPassword.value === ''){
        passwordMsg.value = '❌ A nova palavra-passe não pode estar vazia.';
        return;
    }
    if(newPassword.value !== confirmPassword.value){
        passwordMsg.value = '❌ As palavras-passe não coincidem.';
        return;
    }
    const updateUser = {
        password : newPassword.value
    };

    try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        });
        if(!response.ok){
            throw new Error('Erro ao atualizar a palavra-passe.');
        }
        newPassword.value = '';
        confirmPassword.value = '';
        passwordMsg.value = '✅ Palavra-passe atualizada com sucesso!';
    }catch(error){
        passwordMsg.value = `❌ ${error.message}`;
    }
};

const xpMax = user.level *100
const xpPercent = Math.min((user.xp/xpMax)*100, 100);
const badges = [
  {
    name:'Bronze',
    minXP: 0,
    icon: 'https://img.icons8.com/?size=100&id=23875&format=png&color=000000',
    class: 'badge-bronze'
  },
  {
    name:'Ouro',
    minXP: 300,
    icon: 'https://img.icons8.com/color/48/gold-medal.png',
    class: 'badge-ouro'
  },
  {
    name:'Platina',
    minXp: 700,
    icon: 'https://img.icons8.com/color/48/jewel.png',
    class:'badge-platina'
  },
  {
    name: 'Diamante',
    minXP: 1200,
    icon:'https://img.icons8.com/color/48/jewel.png',
    class: 'badge-diamante'
  },
  {
    name: 'Mestre',
    minXP: 2000,
    icon: 'https://img.icons8.com/?size=100&id=15283&format=png&color=000000',
    class: 'badge-mestre'

  }
];

const currentBadge = badges
  .slice()
  .reverse()
  .find(badge => user.xp >= badge.minXP);
</script>

<template>
    <div class="background-container">
      <div class="profile-card">
  
        <h1 class="title">👤 Perfil de {{ user.nome }}</h1>
        <p class="subtitle">
          Consulta os teus dados e a tua classificação atual.
        </p>
  
        <div class="main-content-grid">
          <div class="details-column">
            <h2 class="column-title">Detalhes do Utilizador</h2>
  
            <div class="detail-group">
              <div class="icon-wrapper">
                <img src="https://img.icons8.com/?size=100&id=3AYCSzCO85Qw&format=png&color=000000" alt="email" class="detail-icon-img" />
              </div>
              <div class="info">
                <label>Email</label>
                <p>{{ user.email }}</p>
              </div>
            </div>
  
            <div class="detail-group">
              <div class="icon-wrapper">
                <img src="https://img.icons8.com/color/48/star-trek-symbol.png" alt="nivel" class="detail-icon-img" />
              </div>
              <div class="info">
                <label>Nível</label>
                <p class="level-text">Nível {{ user.level }}</p>
              </div>
          </div>
  
          <div class="detail-group">
            <div class="icon-wrapper">
              <img src="https://img.icons8.com/color/48/flash-on.png" alt="xp" class="detail-icon-img" />
            </div>
            <div class="info">
              <label>XP Total</label>
              <p>{{ user.xp }} XP</p>
            </div>
            </div>
          </div>

          <div class="xp-column">
            <h2 class="column-title">🏆 Classificação</h2>
  

              <div class="badge-card" :class="currentBadge.class">
                <div class="badge-icon-container">
                  <img :src="currentBadge.icon" :alt="currentBadge.name" class="badge-img" />
                </div>
                <h3 class="badge-name">{{ currentBadge.name }}</h3>
                <p class="badge-xp">{{ user.xp }} XP Total</p>
              </div>
  
            <p class="badge-next" v-if="nextBadge">
              Próximo badge em
              <strong>{{ nextBadge.minXP - user.xp }} XP</strong>
            </p>
  
            <p class="badge-next" v-else>
              🔥 Classificação Máxima Atingida
            </p>
          </div>
  
        </div>
  
        <div class="password-section">
          <h2 class="section-title">🔐 Alterar Palavra-Passe</h2>
  
          <form @submit.prevent="updatePassword" class="password-form">
            <div class="input-group">
              <label>Nova Palavra-Passe</label>
              <input
                type="password"
                v-model="newPassword"
                placeholder="Introduza a nova palavra-passe"
              />
            </div>
  
            <div class="input-group">
              <label>Confirmar Palavra-Passe</label>
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="Confirme a nova palavra-passe"
              />
            </div>
  
            <p
              v-if="passwordMsg"
              :class="passwordMsg.startsWith('✅') ? 'msg-success' : 'msg-error'"
            >
              {{ passwordMsg }}
            </p>
  
            <button type="submit" class="update-pass-btn">
              Atualizar Palavra-Passe
            </button>
          </form>
        </div>
  
        <button @click="doLogout" class="logout-btn">
          🔒 Terminar Sessão
        </button>
  
      </div>
    </div>
  </template>
     
<style scoped>
/* 1. BACKGROUND E CENTRALIZAÇÃO */
.background-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1e0b3e);
  padding: 20px;
}

/* 2. CARTÃO PRINCIPAL */
.profile-card {
  width: 90%;
  max-width: 800px; /* Aumenta a largura máxima para acomodar duas colunas */
  background-color: #1a1a1a;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 
              0 0 0 4px rgba(70, 0, 100, 0.5); 
  color: white;
  text-align: left;
  display: flex; 
  flex-direction: column;
}

.title {
  font-size: 32px;
  margin-bottom: 5px;
  color: #c37eff; 
}

.subtitle {
  color: #ccc;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

/* 3. LAYOUT DE DUAS COLUNAS */
.main-content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Duas colunas iguais */
    gap: 40px;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #333;
}

@media (max-width: 768px) {
    .main-content-grid {
        grid-template-columns: 1fr; /* Volta para uma coluna em telas menores */
    }
}

.column-title {
    font-size: 18px;
    color: #c37eff;
    margin-bottom: 15px;
    border-bottom: 1px solid #5a1e8e;
    padding-bottom: 5px;
}

/* 4. DETALHES DO UTILIZADOR */
.details-column, .xp-column {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.detail-group {
   display: flex;
   align-items: center;
   gap: 15px;
   margin-bottom: 20px;
   background: rba(255,255,255, 0.03);
   padding: 12px 16px;
   border-radius: 16px;
   border: 1px solid rgba(255, 255, 255, 0.05)
}

/* Container do ícone */
.icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(195, 126, 255, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

/* Estilo da imagem do ícone */
.detail-icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.1));
}

.info {
    flex-grow: 1; 
}

.info label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.info p {
  margin: 0;
  font-weight: 600;
  color: #fff;
}

.level-text {
  color: #c37eff !important; /* Destaque para o nível */
}

/* 5. BARRA DE PROGRESSO (RE-ESTILIZADA E POSICIONADA) */
.xp-progress {
    margin-top: 15px;
    background-color: #2b2b2b;
    padding: 15px;
    border-radius: 10px;
}

.xp-progress label {
    display: block;
    margin-bottom: 8px;
    color: #ccc;
    font-size: 14px;
}

.progress-bar {
    background-color: #333;
    border-radius: 5px;
    height: 15px; /* Altura aumentada */
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #9955ff, #c37eff);
    transition: width 0.5s ease;
}

.xp-value {
    display: block;
    text-align: right;
    margin-top: 5px;
    font-size: 14px;
    color: #c37eff;
    font-weight: bold;
}

/* 6. SECÇÃO DE ALTERAÇÃO DE PALAVRA-PASSE */
.password-section {
    margin-top: 30px;
    margin-bottom: 30px;
    padding-top: 15px;
    border-top: 1px dashed #3a0e63;
    flex-grow: 1; 
}

.section-title {
    font-size: 24px;
    color: #c37eff;
    margin-bottom: 20px;
}

.password-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.password-form input {
  background-color: #2b2b2b; 
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  transition: border-color 0.3s;
}

.password-form input:focus {
  border-color: #9955ff;
  outline: none;
}

/* ESTILIZAÇÃO DO BOTÃO DE ATUALIZAR PASSWORD (CORRIGIDO) */
.update-pass-btn {
    background: linear-gradient(90deg, #9955ff, #c37eff);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    box-shadow: 0 4px 10px rgba(153, 85, 255, 0.4);
    transition: opacity 0.2s;
}

.update-pass-btn:hover {
    opacity: 0.85;
}

.msg-error {
    color: #ff8888;
    background-color: #4a0505;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
}

.msg-success {
    color: #88ff88;
    background-color: #054a05;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
}

/* 7. BOTÃO DE LOGOUT */
.logout-btn {
    width: 100%;
    background-color: #4a0505; 
    color: white;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 20px; /* Garante espaçamento extra */
}

.logout-btn:hover {
    background-color: #6e0808;
}

/* 8. Estelizacao dos Badjes*/
.badge-card {
  padding: 32px 24px; /* Mais espaço interno */
  border-radius: 24px;
  text-align: center;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 200px; 
}

/* Container do Ícone */
.badge-icon-container {
  width: 80px;  
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.05); /* Um círculo subtil atrás da medalha */
  border-radius: 50%;
}

.badge-img {
  width: 60px;   
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
}

/* Tipografia dentro do Card */
.badge-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0;
  color: #fff;
}

.badge-xp {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
  font-weight: 500;
}
.badge-bronze { 
  border: 1px solid rgba(205, 127, 50, 0.5); 
  background: linear-gradient(180deg, rgba(205, 127, 50, 0.1) 0%, transparent 100%);
}

.badge-platina { border: 2px solid #8ee4d1; box-shadow: 0 0 15px rgba(142, 228, 209, 0.1); }

.badge-ouro { 
  border: 1px solid rgba(255, 215, 0, 0.5); 
  background: linear-gradient(180deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
}

.badge-diamante { 
  border: 1px solid rgba(79, 195, 247, 0.5); 
  background: linear-gradient(180deg, rgba(79, 195, 247, 0.1) 0%, transparent 100%);
}
.badge-mestre { border: 2px solid #c084fc; box-shadow: 0 0 15px rgba(192, 132, 252, 0.1); }


</style>