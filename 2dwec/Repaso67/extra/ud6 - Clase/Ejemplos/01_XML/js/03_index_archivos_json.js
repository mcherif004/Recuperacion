document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cargaCatalogo").addEventListener("click", cargaCatalogo);

    // Función para la solicitud AJAX para obtener el JSON
    function cargaCatalogo() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("Estado cambiado", xhr.readyState);
            console.log("Status:", xhr.status);
            if (this.readyState == 4 && this.status == 200) {
                cargarJSON(JSON.parse(this.responseText));
            }
        };
        xhr.open("GET", "cd_catalog.json", true);
        xhr.send();
    }

    function cargarJSON(jsonData) {
        // Definimos la estructura de la tabla.
        let tabla = "<tr><th>Artista</th><th>Titulo</th></tr>"

        // Obtenemos todos los elementos del JSON dentro de  CATALOG
        let discos = jsonData.CATALOG;

        for(let i = 0; i < discos.length; i++) {
            tabla += "<tr><td>" + discos[i].ARTIST;
            tabla += "</td><td>" + discos[i].TITLE + "</td></tr>";
        }

        document.getElementById("demo").innerHTML = tabla;
    }
});