import { describe, it, expect } from 'vitest'

describe('Validação da password',()=>{
    const validate = (p1, p2) =>{
        if(!p1 || !p2) return 'vazio'
        if(p1 !== p2) return 'erro'
        return 'ok'
    }
    it('deve dar erro se as passwords forem diferentes', () => {
        const resultado = validate('123', '456')
        expect(resultado).toBe('erro')
      });

    it('deve dar erro se os campos estiverem vazios', () => {
        const resultado = validate('', '')
        expect(resultado).toBe('vazio')
      });

    it('deve validar se forem iguais', () => {
        const resultado = validate('minhaSenha', 'minhaSenha')
        expect(resultado).toBe('ok')
      })
      
})