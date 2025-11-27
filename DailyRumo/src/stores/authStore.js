import { defineStore } from "pinia"; 

export const useAuthStore = defineStore("auth", {
    state: () => ({user : null}),
    actions: {
        async login(email, password){
            const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
            const data = await res.json();
            if(data.length === 0){
                throw new Error("Dados inválidos");
            }
            this.user = data[0];
        },
        async registrar(nome, email, password){
            const novoUser = {nome, email, password, xp:0, level:1};

            const res = await fetch("http://localhost:3000/users",{method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(novoUser)});
            
            const userCriado = await res.json();
            this.user = userCriado;
        },
        logout(){
            this.user = null;
        }
    }
})