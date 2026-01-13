<script setup>
</script>

<template>
  <div class="page-container">
    <header class="about-header">
      <h1>Sobre o <span>DailyRumo</span></h1>
      <p class="subtitle">
        O DailyRumo ajuda-te a criar hábitos alinhados com o teu ambiente,
        promovendo consistência e progresso diário.
      </p>
    </header>

    <div class="content-grid">
      
      <section class="info-card wide">
        <div class="card-content">
          <div class="title-group">
            <span class="icon">📖</span>
            <h2>Sobre o DailyRumo</h2>
          </div>
          <p>O DailyRumo nasceu da necessidade de criar uma relação mais consciente entre as pessoas, os seus hábitos diários e o ambiente onde esses hábitos acontecem. Acreditamos que a consistência não vem apenas da motivação, mas também do contexto certo no momento certo.</p>
          <p>Vivemos num mundo onde o ritmo acelerado muitas vezes nos afasta dos nossos objetivos pessoais. O DailyRumo surge como uma ferramenta simples, intuitiva e inteligente para ajudar cada utilizador a organizar, acompanhar e manter hábitos saudáveis — dentro e fora de casa.</p>
        </div>
      </section>

      <section class="info-card">
        <div class="title-group">
          <span class="icon">🎯</span>
          <h2>A Nossa Missão</h2>
        </div>
        <p>A nossa missão é ajudar as pessoas a criarem rotinas sustentáveis, adaptadas ao seu estilo de vida e ao ambiente que as rodeia.</p>
        <p>Ao separar hábitos indoor e outdoor, o DailyRumo incentiva:</p>
        <ul class="clean-list">
          <li>✨ Maior consciência do espaço</li>
          <li>✨ Melhor aproveitamento do tempo</li>
          <li>✨ Equilíbrio entre foco e atividade</li>
        </ul>
      </section>

      <section class="info-card">
        <div class="title-group">
          <span class="icon">🌎</span>
          <h2>Porque Indoor & Outdoor?</h2>
        </div>
        <p>Nem todos os hábitos funcionam da mesma forma em todos os contextos.</p>
        <div class="mini-grid">
          <div class="mini-item">
            <strong>📚 Indoor</strong>
            <span>Espaço do foco e introspeção.</span>
          </div>
          <div class="mini-item">
            <strong>🌳 Outdoor</strong>
            <span>Espaço da energia e ligação.</span>
          </div>
        </div>
        <p class="small-text">O DailyRumo torna o acompanhamento mais natural e alinhado com a vida real.</p>
      </section>

      <section class="info-card">
        <div class="title-group">
          <span class="icon">📊</span>
          <h2>Progresso que Motiva</h2>
        </div>
        <p>Acreditamos que ver o progresso é essencial. Por isso, oferecemos:</p>
        <ul class="feature-tags">
          <li>Níveis e XP</li>
          <li>Streaks diários</li>
          <li>Estatísticas</li>
          <li>Evolução temporal</li>
        </ul>
      </section>

      <section class="info-card">
        <div class="title-group">
          <span class="icon">🔒</span>
          <h2>Foco e Privacidade</h2>
        </div>
        <p>Desenvolvido com foco em interface limpa, experiência fluida e controle total dos dados pelo utilizador. Sem complexidade desnecessária.</p>
      </section>

      <section class="info-card wide">
        <div class="title-group">
          <span class="icon">🚀</span>
          <h2>O Futuro do DailyRumo</h2>
        </div>
        <p>Este projeto continua a evoluir. No futuro, pretendemos explorar integração profunda com meteorologia, recomendações inteligentes, personalização do dashboard e desafios sociais.</p>
      </section>

    </div>

    <footer class="about-footer">
      <div class="conclusion-box">
        <p>DailyRumo é sobre equilíbrio, consistência e progresso real. Um pequeno passo todos os dias pode mudar completamente o rumo.</p>
        <h3>Define o teu ritmo. Escolhe o teu ambiente. Mantém o teu rumo.</h3>
        <div class="heart">💜</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>

.page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 140px 20px 80px;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.about-header {
  text-align: center;
  margin-bottom: 60px;
}

.about-header h1 {
  font-size: 3.5rem;
  font-weight: 800;
}

.about-header h1 span { color: #c37eff; }

.subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 15px auto 0;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 25px;
}

.info-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.info-card.wide {
  grid-column: span 2; 
}

.title-group {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.title-group h2 {
  font-size: 1.4rem;
  margin: 0;
  color: #c37eff;
}

.icon { font-size: 1.8rem; }

p {
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
}

.clean-list { list-style: none; padding: 0; }
.clean-list li { margin-bottom: 10px; font-weight: 500; }

.mini-grid {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  background: rgba(0,0,0,0.2);
  padding: 15px;
  border-radius: 15px;
}

.mini-item strong { display: block; color: #fff; }
.mini-item span { font-size: 0.9rem; color: rgba(255,255,255,0.6); }

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.feature-tags li {
  background: rgba(195, 126, 255, 0.15);
  padding: 6px 15px;
  border-radius: 50px;
  font-size: 0.9rem;
  border: 1px solid rgba(195, 126, 255, 0.3);
}

/* Footer */
.about-footer {
  margin-top: 60px;
  text-align: center;
}

.conclusion-box {
  background: linear-gradient(135deg, rgba(153, 85, 255, 0.1), rgba(0,0,0,0.4));
  padding: 40px;
  border-radius: 30px;
  border: 1px solid rgba(153, 85, 255, 0.2);
}

.conclusion-box h3 {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #c37eff;
}

/* Mobile */
@media (max-width: 768px) {
  .content-grid { grid-template-columns: 1fr; }
  .info-card.wide { grid-column: span 1; }
  .about-header h1 { font-size: 2.5rem; }
}
</style>
