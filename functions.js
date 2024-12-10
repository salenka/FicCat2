import { title_, subtitle_ } from './card.js';

/*
export function saveData(event) {
    const field = event.target; // Campo que disparou o evento
    const fieldValue = field.value; // Valor do campo
    const fieldName = field.name; // Nome do campo (usado como chave no localStorage)

    // Salva no localStorage
    localStorage.setItem(fieldName, fieldValue); 
    console.log(`Saving to localStorage: ${fieldName} = ${fieldValue}`);
}

*/
export function generateCard() {
        console.log("generateCard executed");
        window.postMessage({ action: "importingModule" }, "*");        
    ;
}


function importModule() {
    return new Promise((resolve) => {
        window.addEventListener("message", (event) => {
                    if (event.data.action === "importingModule") {
                console.log("Message received: importing module...");
        
                import('./card.js');
                console.log("Module imported");
                resolve()
                    }
        }
    )})
}

function cardConfig() { 
    console.log ("cardConfig executed");
        
    const card = `
        ${title_}${subtitle_} 

    `;

    console.log("card: " + card);
    
    // Exibir a ficha no HTML
    document.getElementById("card-here").textContent = card;
    document.getElementById("catalog-card").style.display = "block";
}

importModule().then(() => {
    cardConfig();
}).catch((error) => {
    console.error("Error on importing module", error);
    });
