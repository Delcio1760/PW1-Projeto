import {describe, it, expect} from 'vitest';


function getCurrentBadge(xp){
    if(xp >= 2000) return 'Mestre';
    if(xp >= 1200) return 'Diamante';
    if(xp >= 700) return 'Platina';
    if(xp >= 300) return 'Ouro';
    return 'Bronze';
}

describe('Sistema de Badges',()=>{
    it('atribui Bronze quando o XP é baixo',()=>{
        expect(getCurrentBadge(0)).toBe('Bronze');
        expect(getCurrentBadge(150)).toBe('Bronze');
    });

    it('atribui Ouro quando XP >= 300',()=>{
        expect(getCurrentBadge(300)).toBe('Ouro');
    });

    it('atribui Platina quando XP >= 700',()=>{
        expect(getCurrentBadge(700)).toBe('Platina');
    });

    it('atribui Diamante quando XP >= 1200',()=>{
        expect(getCurrentBadge(1200)).toBe('Diamante');
    });

    it('atribui Mestre quando XP >= 2000',()=>{
        expect(getCurrentBadge(2000)).toBe('Mestre');
    });
       
});