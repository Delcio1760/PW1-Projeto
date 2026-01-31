<template>
    <Transition name="fade">
      <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
          <span>
            <img src="https://img.icons8.com/?size=100&id=1RueIplXPGd2&format=png&color=ffffff" />
          </span>
          <button @click="$emit('close')" class="close-btn">&times;</button>
        </div>
        
        <div class="chat-messages" ref="messageContainer">
          <div v-for="(msg, index) in messages" :key="index" :class="['msg', msg.role]">
            {{ msg.content }}
          </div>
          <div v-if="isLoading" class="msg assistant">...</div>
        </div>
  
        <div class="chat-input">
          <input 
            v-model="userInput" 
            @keyup.enter="sendMessage" 
            placeholder="Dúvidas sobre rotinas?" 
          />
          <button @click="sendMessage" :disabled="isLoading">➤</button>
        </div>
      </div>
    </Transition>
  </template>

<script setup>
import { ref, nextTick } from 'vue';
import Groq from 'groq-sdk';

defineProps(['isOpen']);
defineEmits(['close']);

const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY, 
  dangerouslyAllowBrowser: true 
});

const userInput = ref('');
const messages = ref([
  { role: 'assistant', content: 'Olá! Sou o teu mentor de hábitos. Como te posso ajudar hoje?' }
]);
const isLoading = ref(false);
const messageContainer = ref(null);

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  const userText = userInput.value;
  messages.value.push({ role: 'user', content: userText });
  userInput.value = '';
  isLoading.value = true;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "És um mentor de hábitos motivador. Ajuda o utilizador com rotinas e produtividade em Português." },
        ...messages.value
      ],
      model: "llama-3.1-8b-instant", // Modelo com limite de 30 pedidos por minuto
    });

    messages.value.push({ 
      role: 'assistant', 
      content: chatCompletion.choices[0]?.message?.content || "Desculpa, tive um erro." 
    });
  } catch (e) { 
  console.error(e); 
  messages.value.push({ role: 'assistant', content: "Erro de ligação. Tenta novamente." });
  
} finally {
    isLoading.value = false;
    await nextTick();
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};
</script>

<style scoped>
.chat-window {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px; 
  height: 500px;
  background: rgba(25, 25, 25, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(195, 126, 255, 0.4);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  overflow: hidden; 
}

.chat-header {
  padding: 15px 20px;
  background: linear-gradient(90deg, rgba(153, 85, 255, 0.3), rgba(195, 126, 255, 0.3));
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header img {
  width: 35px;
  height: 35px;
  vertical-align: middle; 
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.close-btn:hover {
  background: rgba(255, 77, 77, 0.5);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  scrollbar-width: thin;
  scrollbar-color: #c37eff transparent;
}

/* Estilo para navegadores Chrome/Safari */
.chat-messages::-webkit-scrollbar { width: 6px; }
.chat-messages::-webkit-scrollbar-thumb { background: #c37eff; border-radius: 10px; }

.msg { 
  padding: 12px 16px; 
  border-radius: 18px; 
  max-width: 85%; 
  font-size: 14px; 
  line-height: 1.5;
  white-space: pre-wrap; 
}

.user { 
  align-self: flex-end; 
  background: #c37eff; 
  color: white; 
  border-bottom-right-radius: 4px; 
}

.assistant { 
  align-self: flex-start; 
  background: rgba(255, 255, 255, 0.08); 
  color: #e0e0e0; 
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 4px;
}

.chat-input { 
  padding: 20px; 
  background: rgba(0, 0, 0, 0.2);
  display: flex; 
  gap: 10px; 
}

.chat-input input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 15px;
  border-radius: 12px;
  color: white;
  outline: none;
}

.chat-input input:focus { border-color: #c37eff; }

.chat-input button {
  background: #c37eff;
  border: none;
  width: 45px;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}
.chat-input button:hover:not(:disabled) { transform: scale(1.05); background: #b066ff; }

/* Responsividade para Telemóveis */
@media (max-width: 480px) {
  .chat-window {
    width: 90%;      
    right: 5%;
    left: 5%;
    bottom: 80px;    
    height: 70vh;    
  }
}
</style>