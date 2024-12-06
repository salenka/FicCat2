//import { titulo, subtitulo } from './card.js';

// Função para salvar automaticamente os dados no localStorage
export function saveData(event) {
    const campo = event.target; // Campo que disparou o evento
    const valor = campo.value; // Valor do campo
    const nome = campo.name; // Nome do campo (usado como chave no localStorage)

    // Salva no localStorage
    localStorage.setItem(nome, valor); 
    console.log("ok");
    console.log("saving" + nome + " " + valor)
    console.log(`Saving to localStorage: ${nome} = ${valor}`);
}

export function carregaScript(callback) {
   
    alert("Botão Gera Ficha acionado");
    window.postMessage({ action: "importarModulo" }, "*");
    callback();
    
}

export function geraFicha() {
   
    fichaConfig();
    
}

export function loadCard(callback) {
    alert("função loadCard acionada");
    importarModulo();
    console.log("função importar módulo acionada");
    callback();
}

export function fichaConfig() { 
    
    const ficha = `
        ${titulo}${subtitulo} 

    `;

    console.log("ficha: " + ficha);
    
    // Exibir a ficha no HTML
    document.getElementById("ficha_aqui").textContent = ficha;
    document.getElementById("fichaCatalografica").style.display = "block";

}


function importarModulo() {
    console.log("Importando o módulo...");

    import('./card.js') 
        .then((module) => {
            console.log("Módulo importado com sucesso!");
            // O módulo foi carregado, mas nada está sendo chamado ainda.
        })
        .catch((error) => {
            console.error("Erro ao importar o módulo:", error);
        });
}



window.addEventListener("message", (event) => {
    if (event.data.action === "importarModulo") {
        console.log("Mensagem recebida: importando módulo...");
        import('./card.js')
            .then((module) => {
                console.log("Módulo importado com sucesso!", module);
                // Você pode agora usar o módulo conforme necessário
            })
            .catch((error) => {
                console.error("Erro ao importar o módulo:", error);
            });
    }
});
