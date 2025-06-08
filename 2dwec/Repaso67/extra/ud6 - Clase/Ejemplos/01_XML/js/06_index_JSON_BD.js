window.addEventListener("DOMContentLoaded", inicio);

function inicio(){
    document.getElementById("mostrar").addEventListener("click", mostrar);
}

function mostrar(){
    // Quedarnos con el valor que ha puesto el usuario
    let puntos = document.getElementById("puntuacion").value;

    // Crear un objeto JSON con los datos para enviarlos al servidor
    let objeto = {
        "tabla": "alumnos",
        "valor": parseInt(puntos)
    };

    // Creamos la instancia de XMLHttpRequest
    let xhr = new XMLHttpRequest();
    let txt = "";

    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            
            let array = JSON.parse(this.responseText);
            // Recorremos el resultado
            for (a in array){
                txt += array[a].alumno + " : " + array[a].puntuacion + "<br/>";
            }

            document.getElementById("texto").innerHTML = txt;
        }
    }
    let parametros = JSON.stringify(objeto);

    // Opcion1 -> GET
    xhr.open("GET", "Ajax_JSON_bbdd.php?objeto=" + parametros, true);
    xhr.send();
}