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
</script>

<template>
    <div class="background-container">
      
      <div class="profile-card">
  
        <h1 class="title">👤 Perfil de {{ user.nome }}</h1>
        <p class="subtitle">Bem-vindo(a)! Aqui estão os seus dados de conta e progresso.</p>
        
        <div class="main-content-grid">
          
          <div class="details-column">
            
            <h2 class="column-title">Detalhes do Utilizador</h2>

            <div class="detail-group">
              <span class="icon">📧</span>
              <div class="info">
                <label>Email</label>
                <p>{{ user.email }}</p>
              </div>
            </div>
            
            <div class="detail-group">
              <span class="icon">✨</span>
              <div class="info">
                <label>Nível</label>
                <p class="level-text">Nível {{ user.level }}</p>
              </div>
            </div>
    
            <div class="detail-group">
              <span class="icon">⭐</span>
              <div class="info">
                <label>Experiência (XP)</label>
                <p>{{ user.xp }} XP</p>
              </div>
            </div>

          </div> <div class="xp-column">
            
            <h2 class="column-title">Progresso</h2>

            <div class="xp-progress">
              <label>Próximo Nível</label>
              <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${xpPercent}%` }"></div>
              </div>
              <span class="xp-value">{{ user.xp % 100 }}/{{ xpMax }} XP</span>
            </div>

          </div> </div> <div class="password-section">
          <h2 class="section-title">🔐 Alterar Palavra-Passe</h2>
          
          <form @submit.prevent="updatePassword" class="password-form">
            <div class="input-group">
                <label for="new-pass">Nova Palavra-Passe</label>
                <input 
                    type="password" 
                    id="new-pass"
                    v-model="newPassword" 
                    placeholder="Introduza a nova palavra-passe"
                />
            </div>
            
            <div class="input-group">
                <label for="confirm-pass">Confirmar Palavra-Passe</label>
                <input 
                    type="password" 
                    id="confirm-pass"
                    v-model="confirmPassword" 
                    placeholder="Confirme a nova palavra-passe"
                />
            </div>
            
            <p v-if="passwordMsg" :class="passwordMsg.startsWith('✅') ? 'msg-success' : 'msg-error'">
                {{ passwordMsg }}
            </p>

            <button type="submit" class="update-pass-btn">Atualizar Palavra-Passe</button>
            
          </form>
        </div>
        
        <button @click="doLogout" class="logout-btn">
          <span class="icon">🔒</span> Terminar Sessão
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
    background-color: #2b2b2b;
    padding: 15px;
    border-radius: 10px;
    border-left: 4px solid #9955ff;
}

.icon {
    font-size: 24px;
    margin-right: 15px;
    color: #c37eff;
}

.info {
    flex-grow: 1; 
}

.info label {
    font-size: 12px;
    color: #aaa;
    display: block;
    margin-bottom: 2px;
}

.info p {
    font-size: 16px;
    margin: 0;
    font-weight: bold;
}

.level-text {
    color: #55ff99; 
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
</style>