//import { saveData } from './functions.js';
import { generateCard } from './functions.js';

alert("Working");

// FORM ----------------------------------------------------------

/*

     // Saving inputs
    document.querySelectorAll('#catcard input[type="text"]').forEach(field => {
       field.addEventListener("input", saveData);
       });
 */  

    
    // Botão Gera Ficha
document.getElementById("btn_gc").addEventListener("click", function () {
    generateCard();
    
})



