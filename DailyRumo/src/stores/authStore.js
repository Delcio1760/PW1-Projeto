import { defineStore } from "pinia";

const API_URL = "https://my-json-server.typicode.com/Delcio1760/PW1-Projeto";

export const useAuthStore = defineStore("auth", {
    state: () => ({ 
        user: null,
        authError: null // Adicionamos isto para a UI ler o erro
    }),
    persist: true,

    actions: {
        async login(email, password) {
            try {
                this.authError = null;
                
                // 1. Pedimos todos os utilizadores (Evita erros de filtro na URL)
                const res = await fetch(`${API_URL}/users`);
                if (!res.ok) throw new Error("Servidor não responde");
        
                // 2. Lemos o JSON APENAS UMA VEZ
                const allUsers = await res.json();
        
                // 3. Procuramos o utilizador na lista recebida
                const foundUser = allUsers.find(u => 
                    u.email.toLowerCase() === email.toLowerCase().trim()
                );
        
                // 4. Verificamos se existe e se a password coincide
                if (foundUser) {
                    if (foundUser.password === password) {
                        this.user = foundUser;
                        return true;
                    } else {
                        throw new Error("Password incorreta.");
                    }
                } else {
                    throw new Error("Utilizador não encontrado.");
                }
        
            } catch (error) {
                this.authError = error.message;
                console.error("Erro no login:", error.message);
                throw error;
            }
        },

        logout() {
            this.user = null;
            this.authError = null;
        },

        async addXP(amount) {
            if (!this.user) return;
            this.user.xp += amount;
            
            // Nota: No My JSON Server o PUT não salva permanentemente no GitHub
            try {
                await fetch(`${API_URL}/users/${this.user.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.user)
                });
            } catch (error) {
                console.error("Erro ao atualizar XP (Apenas local):", error);
            }
        }
    }
});