    
//export let title = localStorage.getItem("title"); 

//const subt = localStorage.getItem("subtitle");
//export let subtitle = subt? `: ${subt}` : "";

//export let title_ = document.getElementById("title_").value;

//const subt = document.getElementById("subtitle_").value;
//export let subtitle_ = subt? ': ${subt}' : "";
    
export function getTitle() {
    return document.getElementById("title_").value;
}

export function getSubtitle() {
    const subt = document.getElementById("subtitle_").value;
    const subtitle_ = subt? ': ' + subt : "";
    return subtitle_
}
