import { describe, it, expect } from 'vitest';

describe('Logica do Gráfico',()=>{
    it('Deve filtrar as conclusões corretamente por ID de utilizador',() =>{
        const mockCompletions = [
            {id:1, userId: 10, date:'2026-01-26'},
            {id:2, userId: 20, date: '2026-01-26'},
            {id:3, userId: 10, date: '2026-01-25'}
        ];

        const loggedUser = 10;
        
        const userCompletions = mockCompletions.filter(c => c.userId === loggedUser);

        expect(userCompletions.length).toBe(2);
        expect(userCompletions.every(c=> c.userId === 10)).toBe(true)
    });
});