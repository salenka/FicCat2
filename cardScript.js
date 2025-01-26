// CÓDICOS OPCIONAIS

export function getCodigo() {

    let cdd = document.getElementById("cdd").value.trim();
    cdd = cdd ? `CDD ${cdd}` : '';

    let cdu = document.getElementById("cdu").value.trim();
    cdu = cdu ? `CDU ${cdu}` : '';

    let cutter = document.getElementById("cutter").value.trim();
    cutter = cutter ? `Cutter ${cutter}` : '';

    let pha = document.getElementById("pha").value.trim();
    pha = pha ? `PHA ${pha}` : '';

    return { cdd, cdu, cutter, pha }
}

/* Licensa Section */

export function getLicenca() {

    //document.querySelectorAll('input[name="cc_radio"]').forEach(radio => {
    //radio.addEventListener('change', function () {
    let licenca = document.querySelector('input[name="cc-radio"]:checked')?.value;
    licenca = licenca ? licenca : '';
    localStorage.setItem("licenca", licenca);
    console.log(`licenca salva em localStorage: ${localStorage.getItem(licenca)}`);

    return { licenca }
}

// Material adicional

export function getDescricaoFisica() {

    // Dimensões

    //formato digital

    let ext = document.getElementById("extensao").value.trim();
    const extensao = ext ? ` ; ${ext}` : "";

    //formato físico / dimensões

    const formatoFisico = document.querySelector('input[name="formato"]:checked')?.value; //tradicional ou nao

    let altura = "";
    let largura = "";
    let alt = document.getElementById("altura").value.trim();
    let larg = document.getElementById("largura").value.trim();

    if (formatoFisico === "tradicional") {
        altura = alt ? ` ; ${alt} cm` : "";
    } else if (formatoFisico === "nao-tradicional") {
        altura = alt ? ` ; ${alt} cm` : "";
        largura = larg ? ` x ${larg} cm` : "";
    }

    const dimensoes = `${altura}${largura}${extensao}`;

    // Material adicional

    let matAdic = document.getElementById("material-adicional-tipo").value.trim();
    let qtdMatAdic = document.getElementById("material-adicional-qtd").value.trim();

    const materialAdicional = matAdic ? ` + ${qtdMatAdic} ${matAdic}` : "";

    // Saída da área de descrição física

    return { materialAdicional, dimensoes, extensao }
}