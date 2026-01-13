<template>
    <div class="popup-overlay" @click="close">
      <div class="popup" @click.stop>
        <p>{{ message }}</p>
        <button @click="close">OK</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: String
  });
  
  const emits = defineEmits(["close"]);
  
  const close = () => emits("close");
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  
  .popup {
    background: #1b0326;
    padding: 25px;
    border-radius: 12px;
    width: 280px;
    text-align: center;

    border: 2px solid 
    
  }
  
  button {
    margin-top: 15px;
    padding: 8px 18px;
    border-radius: 6px;
    border: none;
    background: #2a0433;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  