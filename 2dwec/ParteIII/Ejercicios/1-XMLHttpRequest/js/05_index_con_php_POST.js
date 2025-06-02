document.addEventListener("DOMContentLoaded",()=>{
    //Agregar un event listener al campo nombre
    document.getElementById("nombre").addEventListener("keyup",mostrarNombres);

    function mostrarNombres(e){
        //Obtengo el valor actual del campo
        var cadena = e.target.value;

        //Si la cadena está vacía, limpio la sugerencia que ya tenía
        if (cadena.length == 0){
            document.getElementById("sugerencia").innerHTML = "";
            return;//Salgo de la función
        }else{
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (){
                if(this.readyState == 4 && this.status == 200){
                    //Inserte la respuesta del servidor en Sugerencia
                    document.getElementById("sugerencia").innerHTML = this.responseText;
                }
            };
        
            xhr.open("POST","arraynombres.php",true);
            //Establecemos la cabecera para enviar datos
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//Pasamos los datos como formulario HTML tradicional, es decir, clave=valor&clave=valor....
            //enviamos los datos
            xhr.send("nombre=" + cadena);
        }
    }

});