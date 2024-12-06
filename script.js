import { loadCard, saveData } from './functions.js';
import {geraFicha, fichaConfig} from './functions.js';

alert("Funcionando");

// FORM ----------------------------------------------------------

     // Salva o 'input' dos campos do formulário a cada alteração

    document.querySelectorAll('#ficcat input[type="text"]').forEach(campo => {
       campo.addEventListener("input", saveData);
       });
   
    
    document.addEventListener("DOMContentLoaded", function () {
         document.getElementById("btn").addEventListener("click", function () {
            alert("botão acionado");
            const tit = localStorage.getItem("titulo");
            const sub = localStorage.getItem("subtitulo");
            //const tit = "title2";
            //const sub = "subtitle2";
            const fic = `
            ${tit}${sub} 
        `;

            console.log(fic);
            //alert(fic);

                document.getElementById("ficha_aqui").textContent = fic;
                document.getElementById("fichaCatalografica").style.display = "block";


        });
  
         
    
    // CARD ----------------------------------------------------------
 

document.getElementById("btn_gf").addEventListener("click", function () {

geraFicha(fichaConfig);

})

    })

    // Carregar variáveis (TESTE)


    document.getElementById("btn_lc").addEventListener("click", function () {

        loadCard(fichaConfig);
        
        })
        
    
    








    

