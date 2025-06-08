document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cargaCatalogo").addEventListener("click", cargaCatalogo);

    // Función para la solicitud AJAX para obtener el XML
    function cargaCatalogo() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                cargarXML(this);
            }
        }
        xhr.open("GET", "cd_catalog.xml", true);
        xhr.send();
    }

    // Función que procesa el XML recibido y lo muestra por pantalla
    function cargarXML(xml) {
        let docXML = xml.responseXML;
        // Definimos la estructura de la tabla
        let tabla = "<tr><th>Artista</th><th>Título</th></tr>";

        // Obtenemos todos los elementos <CD> del XML en un array
        let discos = docXML.getElementsByTagName("CD");

        // Recorremos todos los cds y extremos artista y titulo
        for (let i=0; i<discos.length; i++) {
            // Creo una fila nueva 
            tabla += "<tr><td>";
            tabla += discos[i].getElementsByTagName("ARTIST")[0].textContent;
            tabla += "</td><td>";
            tabla += discos[i].getElementsByTagName("TITLE")[0].textContent;
            tabla += "</td></tr>";
        }

        // Inserto la tabla en el documento
        document.getElementById("demo").innerHTML = tabla;
    }
});