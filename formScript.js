import { uncheckOption, eraseChildText, generateCard, generatePDF} from './functions.js';

alert("Funcionando");

// Materialidade

    document.querySelectorAll('input[name="materia"]').forEach(radio => {
        radio.addEventListener('change', function () {

     
            if (document.getElementById('fisico').checked) {
                eraseChildText('materialidade');
                
                //document.getElementById('formato-fisico').style.display = 'block';
                document.getElementById('formato-digital').style.display = 'none';
                //document.getElementById('material-adicional-section').style.display = 'block';

            } else if (document.getElementById('digital').checked) {
                uncheckOption('formato');
                //uncheckOption('material-adicional-sn');  
                //eraseChildText('material-adicional-section');
                //document.getElementById('formato-fisico').style.display = 'none';
                //document.getElementById('material-adicional-section').style.display = 'none';
                document.getElementById('formato-digital').style.display = 'block';
            } else  {
                //document.getElementById('formato-fisico').style.display = 'none';
                document.getElementById('formato-digital').style.display = 'none';
            }      
        })   
    })

// Códigos opcionais    
document.querySelectorAll('input[name="codes-ckbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {

        if (document.getElementById('cdd-ckbox').checked) {
            document.getElementById('code-cdd').style.display = 'block' 
        } else {
            document.getElementById('code-cdd').style.display = 'none'
        }

        if (document.getElementById('cdu-ckbox').checked) {
            document.getElementById('code-cdu').style.display = 'block'
        } else {
            document.getElementById('code-cdu').style.display = 'none'
        }

        if (document.getElementById('cutter-ckbox').checked) {
            document.getElementById('code-cutter').style.display = 'block' 
        } else {
            document.getElementById('code-cutter').style.display = 'none'
        }

        if (document.getElementById('pha-ckbox').checked) {
            document.getElementById('code-pha').style.display = 'block' 
        } else {
            document.getElementById('code-pha').style.display = 'none'
        }
    })
})

    document.querySelectorAll('input[name="cc-radio"]').forEach(radio => {
        radio.addEventListener('change', function () {
    
        localStorage.setItem("license", document.querySelector('input[name="cc-radio"]:checked')?.value); 
        })
})

document.getElementById("btn-card").addEventListener("click", function () {
generateCard(); 
})

document.getElementById("btn-pdf").addEventListener("click", function () {
generatePDF();    
});



