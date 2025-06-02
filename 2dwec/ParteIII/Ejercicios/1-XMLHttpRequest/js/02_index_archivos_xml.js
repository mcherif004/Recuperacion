document.addEventListener("DOMContentLoaded",() =>{
    document.getElementById("cargaCatalogo").addEventListener("click",cargaCatalogo);

    //Función para la solicitud AJAX para obtener el XML
    function cargaCatalogo() {  
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            console.log("Estado cambiado: ", xhr.readyState);
            console.log("Status: ", xhr.status);
            if(this.readyState == 4 && this.status == 200){
                cargarXML(this);
            }
        };
        xhr.open("GET","cd_catalog.xml",true);
        xhr.send();
    }

    //Función que procesa el XML recibido y lo muestra por pantalla
    function cargarXML(xml){
        var docXML = xml.responseXML;
        //Definimos la estructura de la tabla
        var tabla = "<tr><th>Artista</th><th>Título</th></tr>";
        //Obtenemos todos los elementos <CD> dentro del XML en un array
        var discos = docXML.getElementsByTagName("CD");

        //Recorremos todos los CDs y extraemos artista y título
        for(var i=0 ; i < discos.length ; i++){
            //Creo una fila nueva
            tabla += "<tr><td>";
            tabla += discos[i].getElementsByTagName("ARTIST")[0].textContent;//es el 0 pq se que solo hay uno
            tabla += "</td><td>";
            tabla += discos[i].getElementsByTagName("TITLE")[0].textContent;
            tabla += "</td></tr>";
        }
        //Inserto la tabla dentro del mi HTML
        document.getElementById("demo").innerHTML = tabla;
    }

});