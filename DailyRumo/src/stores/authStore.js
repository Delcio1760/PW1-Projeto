import { defineStore } from "pinia"; // Importa a função defineStore da biblioteca Pinia

export const useAuthStore = defineStore("auth", {  // Aqui definimos a store chamada "auth"
    state: () => ({user : null}),                  // Estado inicial da store, com a propriedade "user" definida como null
    actions: {
        async login(email, password){ // Aqui definimos a ação de login como uma função assíncrona que recebe email e password
            const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`); // Faz uma requisição para o servidor para autenticar o usuário , await fetch espera a resposta da promessa
            const data = await res.json();  // Converte a resposta em JSON, await é usado para esperar a resolução da promessa
            if(data.length === 0){
                throw new Error("Dados inválidos");  
            }
            this.user = data[0];  // Se a autenticação for bem-sucedida, define o usuário na store
        },


        async registrar(nome, email, password){ 
            const novoUser = {nome, email, password, xp:0, level:1};

            const res = await fetch("http://localhost:3000/users",{
                method:"POST",
                headers:{"Content-Type": "application/json"}, // "Content-Type" define o tipo de dado que estamos enviando, "application/json" indica que é um JSON
                body: JSON.stringify(novoUser)});  // Aqui fazemos uma requisição POST para registrar um novo usuário
            
            const userCriado = await res.json();  // Converte a resposta em JSON
            this.user = userCriado;
        },

        logout(){
            this.user = null;
        },

       async addXP(amount){
            if(!this.user) return;

            this.user.xp += amount
            const xpNeeded = this.user.level * 100;
            if(this.user.xp >= xpNeeded){
                this.user.level += 1;
                this.user.xp -= xpNeeded 
            }

            // Guarda no backend
        fetch(`http://localhost:3000/users/${this.user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.user)
          });
        }
        

    }
})