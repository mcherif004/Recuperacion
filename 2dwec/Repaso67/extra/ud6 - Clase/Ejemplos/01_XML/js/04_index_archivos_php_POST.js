document.addEventListener("DOMContentLoaded", () => {
    // Agregar un event listener al campo nombre
    document.getElementById("nombre").addEventListener("keyup", mostrarNombres);

    function mostrarNombres(e){
        // Obtengo el valor actual del campo
        let cadena = e.target.value;

        // Si la cadena está vacía, limpio l sugerencia que ya tenía
        if(cadena.length === 0){
            document.getElementById("sugerencia").innerHTML = "";
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                // Inserta la respuesta del servidor en sugerencia
                document.getElementById("sugerencia").innerHTML = this.responseText;
            }
        }
        // Configuramos la solicitud al servidor
        // - "GET" es el método de solicitud
        // - "nombre.php?nombre=" + cadena
        // - true or false
        xhr.open("POST", "arraynombres.php", true);
        // Establecemos la cabecera de la solicitud
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // pasamos los datos como formulario HTML tradicional, es decir, clave=valor&clave=valor
        // Enviamos los datos
        xhr.send("nombre=" + cadena);
    }
});