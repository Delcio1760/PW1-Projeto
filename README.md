# PW1-Projeto
DailyRumo - Gestão de Hábitos Gamificada
O DailyRumo é uma aplicação web desenvolvida em Vue 3 que permite aos utilizadores gerir os seus hábitos diários de forma inteligente, adaptando as sugestões ao ambiente (Indoor/Outdoor) e recompensando o progresso através de um sistema de XP e Badges.

##  Sobre o Projeto
O foco principal deste projeto foi criar uma experiência de utilizador fluida e motivadora. A aplicação integra uma API de meteorologia para filtrar atividades e utiliza persistência de estado para garantir que o utilizador nunca perde o seu progresso.

## Principais Funcionalidades (Atualizado):
Criação de Hábitos Customizados: Interface intuitiva para criar hábitos, permitindo definir nomes, descrições e categorias específicas.

Segmentação Inteligente: Divisão entre hábitos Indoor (dentro de casa) e Outdoor (ar livre), facilitando a organização do dia a dia.

Gamificação: Sistema de XP, níveis e Ranks (Bronze, Ouro, Platina, Diamante, Mestre) que evoluem à medida que completas os teus hábitos.

Meteorologia em Tempo Real: Integração com a API OpenWeather para sugerir ou filtrar hábitos Outdoor com base no estado do tempo.

Dashboards de Progresso: Visualização de estatísticas através de gráficos semanais de check-ins e controlo de Streaks.

Persistência e Segurança: Estado da aplicação mantido via localStorage e rotas protegidas que exigem autenticação.

## Estrutura de Dados (Exemplo db.json):
A aplicação utiliza uma estrutura relacional simples para gerir os hábitos criados:

users: Armazena perfil, XP e credenciais.

habits: Lista de hábitos criados, vinculados ao ID do utilizador e à categoria (indoor/outdoor).

completions: Registo histórico de quando cada hábito foi realizado.

##  Tecnologias Utilizadas
Frontend: Vue.js 3 (Vite)

Gestão de Estado: Pinia com plugin de persistência.

Base de Dados (Simulada): JSON Server

Gráficos: Chart.js

Testes: Vitest

Estilo: CSS Moderno (Glassmorphism, Flexbox, Grid).

## Como Iniciar o Projeto
1. Clonar o repositório

git clone https://github.com/Delcio1760/PW1-Projeto.git
cd dailyrumo

2. Instalar dependências

npm install

3. Iniciar o Backend (JSON Server)
Certifica-te de que tens o ficheiro db.json na raiz e executa:

npx json-server --watch db.json --port 3000

4. Iniciar o Frontend
Num novo terminal, executa:

npm run dev

## Membros do Grupo

## Délcio Cunha - 40240378

## Marcio Tavares - 40240379

## Testes
Para correr os testes unitários e garantir que o sistema de XP está a funcionar:

npm run test