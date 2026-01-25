import {describe, it, expect} from 'vitest';

const calculateNewXP = (currentXP, amountToAdd) => {
    return currentXP + amountToAdd;
};

describe('Testes de Progressão de XP', ()=>{
    
    it('deve somar 20 pontos XP quando o utilizador faz um check-in',()=>{
       // Simulação: Utilizador tem 100XP e ganha 20(valor do HabitDetail.vue)
       const xpAtual = 100;
       const ganho = 20;

       const resultado = calculateNewXP(xpAtual, ganho);

       expect(resultado).toBe(120);
    });

    it('deve acumular corretamente apos varios dias de habito',()=>{
        let xpTotal = 0;
        const ganhoDiario = 20;

        // Simulação de 3 dias de check-ins
        xpTotal = calculateNewXP(xpTotal, ganhoDiario);
        xpTotal = calculateNewXP(xpTotal, ganhoDiario);
        xpTotal = calculateNewXP(xpTotal, ganhoDiario);

        expect(xpTotal).toBe(60);
    });
});