<template>
<div class="nav-container">
    <nav class="navBar">
      <div class="nav-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/dashboard" class="nav-item">Dashboard</router-link>
        <router-link to="/contacto" class="nav-item">Contacto</router-link>
        <router-link to="/perfil" class="nav-item">Perfil</router-link>
      </div>
      
      <div class="nav-auth">
        <div class="create-habit">
          <button class="btn-create" @click="goToCreateHabit">
            <img src="https://img.icons8.com/?size=100&id=14092&format=png&color=c37eff" alt="Criar Hábito" />
          </button>
        </div>

        <div class="chat-bot">
          <button class="chatBot-btn" @click="$emit('toggle-chat')">
            <img src="https://img.icons8.com/?size=100&id=IuR8B5VlsFxh&format=png&color=FFFFFF" alt="botão de chat-bot" />
          </button>
        </div>

        <button v-if="auth.user" @click="logout" class="auth-btn logout">Sair</button>
        <router-link v-else to="/login" class="auth-btn login">Login</router-link>

      </div>

    </nav>
</div>
</template>

<script setup>
import router from "@/router";
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();

const logout = () => {
  auth.logout();
};

const goToCreateHabit = () => {
  router.push({ 
    name: 'CreateHabit', 
    params: { category: 'indoor' }
  });
};

defineEmits(['toggle-chat']);

</script>
  
<style scoped>
  /* Container flutuante */
  .nav-container {
    position: fixed;
    top: 25px; /* Desce um pouco mais do topo */
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1000;
  }
  
  .navBar {
    width: auto;
    min-width: 750px; /* Aumentado para dar mais "ar" aos elementos */
    height: 70px; /* Aumentado de 55px para 70px para melhor presença */
    
    background: rgba(255, 255, 255, 0.08); /* Ligeiramente mais visível */
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    padding: 0 40px; /* Mais espaço nas extremidades */
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  }
  
  .nav-links {
    display: flex;
    gap: 35px; /* Aumentado o espaço entre links */
  }
  
  /* Estilização dos Links mais legíveis */
  .nav-item {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-size: 18px; /* Aumentado de 15px para 18px */
    font-weight: 600; /* Peso da fonte aumentado para melhor leitura */
    transition: all 0.3s ease;
    position: relative;
    letter-spacing: 0.5px;
  }
  
  .nav-item:hover, .router-link-active {
    color: #c37eff;
    transform: translateY(-1px);
  }
  
  /* Indicador de página ativa mais visível */
  .router-link-active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: #c37eff;
    border-radius: 50%;
    box-shadow: 0 0 10px #c37eff;
  }
  
  /* Botões de Auth maiores */
  .auth-btn {
    padding: 12px 25px; /* Aumentado o preenchimento */
    border-radius: 50px;
    font-size: 16px; /* Fonte maior */
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    border: none;
    text-decoration: none;
  }
  
  .login {
    background: linear-gradient(90deg, #9955ff, #c37eff);
    color: white;
    box-shadow: 0 4px 15px rgba(153, 85, 255, 0.3);
  }
  
  .logout {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  /* Container de Auth agora organiza os dois botões */
.nav-auth {
  display: flex;
  align-items: center;
  gap: 13px; /* Espaço entre o botão de criar e o de sair */
}

.create-habit {
  display: flex;
  align-items: center;
}

.btn-create {
  width: 42px; /* Ligeiramente menor para não competir com o botão principal */
  height: 42px;
  border-radius: 50%;
  background: rgba(195, 126, 255, 0.1);
  border: 1px solid rgba(195, 126, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-create img {
  width: 22px;
  height: 22px;
}

.btn-create:hover {
  background: rgba(195, 126, 255, 0.2);
  transform: scale(1.1) rotate(90deg);
  border-color: #c37eff;
}

/* Efeito ao clicar */
.btn-create:active {
  transform: scale(0.95);
}

/* Botão do ChatBot */
.chat-bot {
  display: flex;
  align-items: center;
}

.chatBot-btn {
  width: 45px;
  height: 45px;
  border-radius: 12px; /* Formato quadrado arredondado para diferenciar do círculo */
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.chatBot-btn img {
  width: 28px;
  height: 28px;
  /* Se o ícone for preto, isto torna-o branco para combinar com o tema escuro */
  filter: invert(100%) sepia(0%) substitute(0,0,0); 
}

.chatBot-btn:hover {
  background: rgba(0, 200, 255, 0.2); /* Um azul ciano suave para o bot */
  border-color: #00c8ff;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 200, 255, 0.4);
}

.chatBot-btn:active {
  transform: scale(0.9);
}
  
/* Responsividade */
@media screen and (max-width: 768px) {
  .navBar {
    width: 92%;
    margin: 10px auto;   
    display: flex;
    justify-content: center; 
    gap: 15px;
    padding: 8px 15px;
    height: auto;
    border-radius: 50px;  
  }

 
  .nav-links {
    display: flex;
    gap: 10px;
    margin: 0;
  }

  .nav-item {
    font-size: 11px;
    letter-spacing: -0.2px;
  }

  /* 3. Agrupamento dos botões da direita */
  .nav-auth {
    display: flex;
    gap: 8px;            
    width: auto;          

  .btn-create img, .chatBot-btn img {
    width: 22px;
    height: 22px;
  }

  .auth-btn.logout {
    padding: 4px 8px;
    font-size: 10px;
  }
  }
}
  </style>