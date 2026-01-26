import { describe, expect, it } from "vitest";
import { getIndoorSugestion } from "@/services/sugestionService";

describe('SugestionService',()=>{
    it('deve retornar uma sugestão/frase motivaciona valida',()=>{
        const suggestion = getIndoorSugestion();
        expect(typeof suggestion).toBe('string');

    });
});