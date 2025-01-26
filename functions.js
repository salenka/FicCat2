
import * as card from './cardScript.js';

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

    console.log("botão Gerar Ficha acionado");

    //chamada de funções de cada área em Card.js

    const dimensoes = card.getDescricaoFisica().dimensoes;
    const materialAdicional = card.getDescricaoFisica().materialAdicional;

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
    const codigos = `\n${cdd} ${cdu} ${cutter} ${pha}`

    //Configuração da ficha catalográfica

    let ficha = `

   ${dimensoes}${materialAdicional}

   `
    // Ajustes finais
    ficha = ficha.replace('.. -- ', ' . -- ') // Elimina ponto final que é seguido de marcador de nova seção
    ficha = ficha.replace('il..', 'il.') // Elimina ponto final da área de série após abreviação il.
    ficha = ficha.replace('p..', 'p.') // Elimina ponto final da área de série após abreviação p.
    ficha = ficha.replace('color..', 'color.') // Elimina de ponto final da área de série após abreviação color.

    // Salva ficha no localStorage (para recuperação por a4.js)

    localStorage.setItem('ficha', JSON.stringify(ficha));
    console.log("ficha salva no localStorage:");
    console.log(JSON.parse(localStorage.getItem('ficha')));

    // Salva códigos no localStorage (para recuperação por a4.js)
    localStorage.setItem('codigos', JSON.stringify(codigos));

    // Identificação do bibliotecário
    const bibliotecario = document.getElementById("bibliotecario-nome").value.trim();
    const crb = document.getElementById("crb").value.trim();

    const identificacao = `${bibliotecario} (bibliotecário responsável) - CRB: ${crb}`;
    // Exibição da identificação do bibliotecário
    document.getElementById("bibliotecario-aqui").textContent = identificacao;

    // Renderização da ficha

    document.getElementById("ficha-aqui").textContent = ficha;
    document.getElementById("codigos-aqui").textContent = codigos;
    

    document.getElementById("cataloging-card").style.display = "block";
    document.getElementById("btn-pdf").style.display = "block";
    //document.getElementById("font-controls").style.display = "block";

    console.log("Exibiu a ficha em index.html")

    // Verificações

    console.log('ficha gerada no HTML (textContent)');
    console.log(document.getElementById("ficha-aqui").textContent)


    return { codigos, ficha };
}

// GERAR PDF

export function generatePDF() {

    // Oculta todas as divs de licença previamente habilitadas
    document.querySelectorAll('#licenca>div').forEach(div => {
        div.style.display = 'none';
    });

    // Exibe a div da licença salva no localStorage
    const licenca = localStorage.getItem("licenca");
    
    switch (licenca) {
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
    
    const ficha = JSON.parse(localStorage.getItem('ficha'));
    const codigos = JSON.parse(localStorage.getItem('codigos'));
    const bibliotecario = document.getElementById("bibliotecario-nome").value.trim();
    const crb = document.getElementById("crb").value.trim();
    const identificacao = `${bibliotecario} (bibliotecário responsável) - CRB: ${crb}`;
   
    
    document.getElementById("card-form").style.display = "none";
    document.getElementById("page").style.display = "block";
    document.getElementById("ficha-aqui-pdf").textContent = ficha;
    document.getElementById("codigos-aqui-pdf").textContent = codigos;
    document.getElementById("bibliotecario-aqui-pdf").textContent = identificacao;

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
            }
        },

    }

    html2pdf().set(options).from(content).outputPdf('blob').then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url);
    });

    //SetTimeout é necessário para funcionar (ou PDF em branco)

    setTimeout(function () {
        document.getElementById("page").style.display = "none";
        document.getElementById("card-form").style.display = "block";
    }, 2000);

}

