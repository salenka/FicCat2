import { uncheckOption, eraseChildText, saveData, generateCard, generatePDF } from './functions.js';

alert("Funcionando");

     // SALVA DADOS - seleciona e salva o 'input' de todos os campos do formulário
     document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll('#card-form input[type="text"]').forEach(campo => {
           campo.addEventListener("input", saveData);
           });   
        })

// Materialidade

document.querySelectorAll('input[name="materia"]').forEach(radio => {
    radio.addEventListener('change', function () {


        if (document.getElementById('fisico').checked) {
            eraseChildText('materialidade');

            document.getElementById('formato-fisico').style.display = 'block';
            document.getElementById('formato-digital').style.display = 'none';
            document.getElementById('material-adicional-sn').style.display = 'block';

        } else if (document.getElementById('digital').checked) {
            uncheckOption('formato');
            uncheckOption('material-adicional-sn');
            eraseChildText('material-adicional-sn');
            document.getElementById('formato-fisico').style.display = 'none';
            document.getElementById('material-adicional-sn').style.display = 'none';
            document.getElementById('formato-digital').style.display = 'block';
        } else {
            document.getElementById('formato-fisico').style.display = 'none';
            document.getElementById('formato-digital').style.display = 'none';
        }
    })
})

// Códigos opcionais    
document.querySelectorAll('input[name="codigos-ckbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {

        if (document.getElementById('cdd-ckbox').checked) {
            document.getElementById('codigo-cdd').style.display = 'block'
        } else {
            document.getElementById('codigo-cdd').style.display = 'none'
        }

        if (document.getElementById('cdu-ckbox').checked) {
            document.getElementById('codigo-cdu').style.display = 'block'
        } else {
            document.getElementById('codigo-cdu').style.display = 'none'
        }

        if (document.getElementById('cutter-ckbox').checked) {
            document.getElementById('codigo-cutter').style.display = 'block'
        } else {
            document.getElementById('codigo-cutter').style.display = 'none'
        }

        if (document.getElementById('pha-ckbox').checked) {
            document.getElementById('codigo-pha').style.display = 'block'
        } else {
            document.getElementById('codigo-pha').style.display = 'none'
        }
    })
})

// Licença

document.querySelectorAll('input[name="cc-radio"]').forEach(radio => {
    radio.addEventListener('change', function () {

        localStorage.setItem("licenca", document.querySelector('input[name="cc-radio"]:checked')?.value);
    })
})

// MATERIAL Adicional

document.querySelectorAll('input[name="material-adicional-sn"]').forEach(radio => {
    radio.addEventListener('change', function () {

        eraseChildText('material-adicional');

        if (document.getElementById('material-adicional-sim').checked) {
            document.getElementById('material-adicional').style.display = 'block';
        } else {
            document.getElementById('material-adicional').style.display = 'none';
        }
    });
});


// Botão Gerar Ficha

document.getElementById("btn-card").addEventListener("click", function () {
    generateCard();
})

// Botão Gerar PDF

document.getElementById("btn-pdf").addEventListener("click", function () {
    generatePDF();
});

// OPÇOES DIV FORMATO-FÍSICO (name:FORMATO)
document.querySelectorAll('input[name="formato"]').forEach(radio => {
    radio.addEventListener('change', function () {

        eraseChildText('formato-fisico');

        if (document.getElementById('formato-trad').checked) {
            document.getElementById('formato-tradicional').style.display = 'block';
            document.getElementById('formato-nao-tradicional').style.display = 'none';
        } else if (document.getElementById('formato-nao-trad').checked) {
            document.getElementById('formato-tradicional').style.display = 'block';
            document.getElementById('formato-nao-tradicional').style.display = 'block';
        } else {
            document.getElementById('formato-tradicional').style.display = 'none';
            document.getElementById('formato-nao-tradicional').style.display = 'none';
        }
    });
})



