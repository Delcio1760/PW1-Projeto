const indoorSuggestions = [
    "Arruma apenas uma gaveta ou uma pequena zona da casa.",
    "Lê 10 páginas de um livro ou artigo que gostes.",
    "Bebe um copo de água antes de começares a próxima tarefa.",
    "Faz 5 minutos de alongamentos ou mobilidade.",
    "Desliga notificações durante 20 minutos e foca-te numa tarefa.",
    "Organiza a tua lista de tarefas para o resto do dia.",
    "Faz uma pausa consciente: respira fundo 5 vezes.",
    "Revê os teus objetivos da semana por 5 minutos.",
    "Escreve uma ideia ou pensamento num bloco de notas.",
    "Arruma a secretária para trabalhar com mais clareza."
  ];

  const motivationalQuotes = [
    // Disciplina / Trabalho duro
    "Trabalha em silêncio. Os resultados falam por ti.",
    "Não é talento, é consistência.",
    "Faz hoje o que os outros adiam.",
    "Quando cansas, é aí que começas a crescer.",
    "A disciplina constrói o que a motivação não aguenta.",
  
    // Honra / Caminho / Mentalidade guerreira
    "Segue o caminho, mesmo quando ninguém está a ver.",
    "O esforço honesto nunca é desperdiçado.",
    "A tua força vem do que superas, não do que evitas.",
    "Treina a mente como treinas o corpo.",
    "Crescer também é aprender a controlar-se.",
  
    // Confiança leve / energia positiva
    "Confia no processo.",
    "Um passo firme vale mais que mil intenções.",
    "Hoje é mais uma oportunidade para melhorar.",
    "Mantém o foco, mas não percas o prazer.",
    "Estás exatamente onde precisas para evoluir.",
  
    // Resiliência / Anti-desistência (Goggins vibes)
    "Ninguém vem salvar-te. Faz o trabalho.",
    "Se fosse fácil, não te faria mais forte.",
    "A dor passa, o progresso fica.",
    "Levanta-te mais uma vez do que caíste.",
    "A mente desiste antes do corpo.",
  
    // Paz / Maturidade (Thorfinn / Musashi)
    "Nem toda luta precisa ser travada.",
    "A verdadeira força é continuar sem ódio.",
    "Calma também é poder.",
    "Melhorar em silêncio é uma forma de respeito.",
    "Segue em frente, mesmo devagar.",
  
    // Energia confiante / divertida
    "Hoje é dia de dar o teu melhor.",
    "Foca-te. Respira. Continua.",
    "Ainda há muito caminho — e isso é bom.",
    "Consistência ganha corridas."
  ];

export const getIndoorSugestion = () =>{
    const all = [...indoorSuggestions, ...motivationalQuotes];
    const randomIndex = Math.floor(Math.random() *all.length);
    return all[randomIndex]
}