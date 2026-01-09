<template>
  <div class="nav-container">
    <nav class="navBar">
      <div class="nav-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/contacto" class="nav-item">Contacto</router-link>
        </div>
      
      <div class="nav-auth">
        <router-link to="/login" class="auth-btn login">Login</router-link>
      </div>
    </nav>
  </div>
</template>

 
<style scoped>
  .nav-container {
    position: fixed;
    top: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1000;
  }
  
  .navBar {
    width: auto;
    min-width: 650px;
    height: 70px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 100px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  }
  
  .nav-links {
    display: flex;
    gap: 35px;
  }
  
  .nav-item {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    letter-spacing: 0.5px;
  }
  
  .nav-item:hover, .router-link-active {
    color: #c37eff;
  }
  
  /* Indicador de página ativa */
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
  
  .auth-btn.login {
    padding: 12px 28px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    background: linear-gradient(90deg, #9955ff, #c37eff);
    color: white;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(153, 85, 255, 0.3);
  }
  
  .auth-btn.login:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
  
  @media (max-width: 700px) {
    .navBar {
      min-width: 90%;
      height: 65px;
      padding: 0 20px;
    }
    .nav-links {
      gap: 20px;
    }
  }
  </style>
  