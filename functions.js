import * as card from '/cardScript.js' 
//UNCHECK OPTION
//from radio or checkbox - parameter:input[name]

export function uncheckOption(inputName) {
    const target = document.querySelector(`input[name="${inputName}"]:checked`);

    // desmarca a seleção (rádio ou checkbox) que estiver marcada
    if (target) {
        target.checked = false;
    }
    // dispara o evento 'change' nas opções com inputName
    const changeEvent = new Event('change');

    document.querySelectorAll(`input[name="${inputName}"]`).forEach(option => {
        if (option) {
            option.dispatchEvent(changeEvent);
        } else {
            console.error(`Elemento ${inputName} não foi encontrado.`);
        }
    })
}

//ERASE CHILD TEXT
// erases text input - parameter: div-mother's id

export function eraseChildText(motherDivId) {
    const divMae = document.getElementById(`${motherDivId}`);
    const inputsText = divMae.querySelectorAll('input[type="text"]');

    inputsText.forEach(inputText => {
        inputText.value = '';
    })
}

// SAVE DATA
// Saves form's text input in localStorage
export function saveData(event) {
    const campo = event.target; // Campo que disparou o evento
    const valor = campo.value; // Valor do campo
    const nome = campo.name; // Nome do campo (usado como chave no localStorage)

    console.log("salvando" + nome + ": " + valor);

    // Salva no localStorage
    localStorage.setItem(nome, valor);
}


// CARD -----------------------------------------------------------------

export function generateCard() {

    console.log("botão Gera card acionado");

    //chamada de funções de cada área em Card.js

    const cdd = card.getCodigo().cdd;
    const cdu = card.getCodigo().cdu;
    const cutter = card.getCodigo().cutter;
    const pha = card.getCodigo().pha;

    const classificacao = `
    ${cdd}
    ${cdu}
    `
    const notacao = `
    ${cutter}
    ${pha}
    `
    const codes = `\n${cdd} ${cdu} ${cutter} ${pha}`



    // Salva card no localStorage (para recuperação por a4.js)
    localStorage.setItem('codes', JSON.stringify(codes));

    // Renderização da card

  
    document.getElementById("codes-here").textContent = codes;

    document.getElementById("cataloging-card").style.display = "block";
    document.getElementById("btn-pdf").style.display = "block";
    document.getElementById("font-controls").style.display = "block";

    console.log("Exibiu a card em index.html")

    return { codes };
}


    export function generatePDF() {

        const codes = JSON.parse(localStorage.getItem('codes'));
        const license = localStorage.getItem("license");

        switch (license) {
            case "by": 
                document.getElementById("by").style.display = 'block';
                break;
            case "by-sa": 
                document.getElementById("by-sa").style.display = 'block';
                break;
            case "by-nd": 
                document.getElementById("by-nd").style.display = 'block';
                break;
            case "by-nc": 
                document.getElementById("by-nc").style.display = 'block';
                break;
            case "by-nc-sa": 
                document.getElementById("by-nc-sa").style.display = 'block';
                break;
            case "by-nc-nd": 
                document.getElementById("by-nc-nd").style.display = 'block';
                break;
            case "cc-0": 
                document.getElementById("cc-0").style.display = 'block';
                break;
            default:
                console.log("Licença não selecionada")
        
        }

        document.getElementById("page").style.display="block";
        document.getElementById("codes-here-pdf").textContent = codes;
        
        //const content = document.body;
        const content = document.getElementById("page");

        const options = {
            filename: "ficha-catalografica",
            jsPDF: {
                unit: "mm", 
                orientation: "portrait",
                layout: "portrait",
                format: [298, 210],
                content: {
                align: "center",
                valign: "middle",
              }},

        }

        html2pdf().set(options).from(content).outputPdf('blob').then((blob) => {
            const url = URL.createObjectURL(blob);
            window.open(url);
        });

        //SetTimeout é necessário para funcionar (ou PDF em branco)

        setTimeout(function() {
            document.getElementById("page").style.display = "none";
        }, 2000);   

    }

