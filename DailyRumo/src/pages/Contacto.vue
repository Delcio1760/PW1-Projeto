<template>
  <div class="page-wrapper">
    <div class="contact-container">
      
      <header class="contact-header">
        <h1><span>👋</span> Contacta-nos</h1>
        <p class="subtitle">
          Tens sugestões ou queres acompanhar a evolução da DailyRumo? 
          Explora os nossos canais oficiais e redes sociais.
        </p>
      </header>

      <div class="main-grid">
        
        <section class="glass-card">
          <h2 class="small-title">Canais Diretos</h2>
  
          <div class="contact-method">
            <span class="method-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
              </svg>
            </span>
            <div class="method-text">
              <label>Email de suporte</label>
              <p>support@dailyrumo.app</p>
            </div>
          </div>

        <div class="contact-method">
          <span class="method-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </span>
          <div class="method-text">
            <label>Tipo de projeto</label>
            <p>Projeto pessoal / académico</p>
          </div>
        </div>

        <div class="contact-method">
          <span class="method-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon">
              <circle cx="12" cy="12" r="10"/>
              <path d="m16 8-8 8"/>
              <path d="m8 8 8 8"/>
            </svg>
          </span>
          <div class="method-text">
            <label>Foco</label>
            <p>Gestão de hábitos e bem-estar</p>
          </div>
        </div>
        </section>

        <section class="glass-card">
          <h2 class="small-title">Redes Sociais</h2>
          <p class="social-intro">Segue-nos para dicas de hábitos e atualizações da plataforma:</p>
          
          <div class="social-links">
           <a href="#" class="social-item instagram">
              <span class="soc-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </span>
              <div class="soc-info">
                <strong>Instagram</strong>
                <span>@dailyrumo</span>
              </div>
            </a>
             
            <a href="#" class="social-item tiktok">
              <span class="soc-icon">📱</span>
              <div class="soc-info">
                <strong>TikTok</strong>
                <span>@dailyrumo_app</span>
              </div>
            </a>

            <a href="#" class="social-item twitter">
            <span class="soc-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </span>
            <div class="soc-info">
              <strong>Twitter / X</strong>
              <span>@dailyrumo</span>
            </div>
            </a>
          </div>
        </section>

      </div>

      <section class="faq-section">
        <h2 class="center-title">❓ Perguntas Frequentes</h2>
        <div class="faq-grid">
          <div class="faq-card">
            <h4>Os meus dados estão seguros?</h4>
            <p>A DailyRumo utiliza um backend de teste apenas para fins educativos.</p>
          </div>
          <div class="faq-card">
            <h4>Posso usar em vários dispositivos?</h4>
            <p>Atualmente, a aplicação foi pensada para uso local como projeto web.</p>
          </div>
          <div class="faq-card">
            <h4>Privacidade</h4>
            <p>Os teus hábitos são privados e vinculados apenas à tua conta pessoal.</p>
          </div>
        </div>
      </section>

      <footer class="contact-footer">
        <p><strong>DailyRumo 2026</strong> — Criando consistência, passo a passo.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .page-wrapper {
    min-height: 100vh;
    padding: 140px 20px 60px;
    font-family: 'Inter', sans-serif;
    color: #fff;
  }
  
  .contact-container {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .contact-header {
    text-align: center;
    margin-bottom: 50px;
  }
  
  .contact-header h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 10px;
  }
  
  .subtitle {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
  }
  
  /* GRID DE 2 COLUNAS IGUAIS */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 60px;
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 28px;
    padding: 40px;
    backdrop-filter: blur(10px);
  }
  
  .small-title {
    font-size: 1.4rem;
    margin-bottom: 25px;
    color: #c37eff;
  }
  
  /* ESTILO DOS CONTACTOS */
  .contact-method {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .method-icon {
    font-size: 1.5rem;
    background: rgba(195, 126, 255, 0.1);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
  }
  
  .method-text label {
    display: block;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
  }
  
  .method-text p { font-weight: 600; font-size: 1.05rem; }
  
  /* ESTILO DAS REDES SOCIAIS */
  .social-intro {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.6);
    margin-bottom: 25px;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .social-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    text-decoration: none;
    color: inherit;
    transition: 0.3s;
    border: 1px solid transparent;
  }
  
  .social-item:hover {
    background: rgba(195, 126, 255, 0.1);
    border-color: rgba(195, 126, 255, 0.3);
    transform: translateX(5px);
  }
  
  .soc-icon { font-size: 1.4rem; }
  .soc-info strong { display: block; font-size: 1rem; }
  .soc-info span { font-size: 0.85rem; color: #c37eff; }

  .method-icon {
  width: 48px;
  height: 48px;
  background: rgba(195, 126, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Impede que o ícone "esmague" se o texto for grande */
}

.lucide-icon {
  width: 22px;
  height: 22px;
  stroke: #c37eff;
  stroke-width: 2;
  transition: all 0.3s ease;
}
  
  /* FAQ */
  .center-title { text-align: center; margin-bottom: 30px; font-size: 1.8rem; }
  .faq-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .faq-card {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .faq-card h4 { color: #c37eff; margin-bottom: 8px; font-size: 0.95rem; }
  .faq-card p { font-size: 0.85rem; color: rgba(255, 255, 255, 0.6); }
  
  .contact-footer { text-align: center; margin-top: 60px; opacity: 0.4; }
  
  @media (max-width: 800px) {
    .main-grid, .faq-grid { grid-template-columns: 1fr; }
    .contact-header h1 { font-size: 2.5rem; }
  }
  </style>