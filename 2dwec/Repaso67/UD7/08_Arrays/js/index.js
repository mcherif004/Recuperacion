
//$.each == jQuery.each
$(inicio);//Esperar a que Cargue todo el documento 
function inicio(){
   //RECORRER Y MANIPULAR ELEMENTOS DE UN ARRAY
   //$.each: iterar sobrearray sin modificar el contenido original. Devuelve el array u objeto original
    //RECORRER UN OBJETO
//    var obj = {
//     "nombre": "María",
//     "apellido": "Ojeda"
//    };

//    $.each(obj,function(clave,valor){
//     alert(clave + " : "+ valor); //Muestra cada par clave:valor
//    })
//    //RECORRER UN ARRAY
    // var array = [1,3,5,7];
//    $.each(array, function (indice,valor){
//     alert(indice + " : "+ valor);
//    });
//    alert("Número de elementos del array: " + array.length);

//    //BUSCAR UN VALOR EN UN ARRAY
//     if($.inArray(6,array) != -1){//Devuelve el índice del valor en el array o -1 si no lo encuentra
//         alert("Valor encontrado en el array, en la posición "+ $.inArray(3,array));
//     }else{
//         alert("Valor NO encontrado en el array");
//     }
//UNIR DOS ARRAYS
// var nuevoArray = $.merge([1,2,3],[4,5,6]);
//---ARRAYS DE ELEMENTOS DE JQUERY---//
//RECORRER UN ARRAY DE ELEMENTOS DE UN SELECTOR
// $("#recorrer").click(function(){
//     $("li").each(function(){
//         alert($(this).text()); //Mostramos el texto de cada LI
//     });
// });
// //CONTAR LOS ELEMENTOS 
// alert("Nº de LI: "+ $("li").length);
// //OBTENER UN ELEMENTO ESPECÍFICO DE UNA ARRAY DE JQUERY
// var elemento = $("li").get(2);
// alert("El tercer elemento de tipo " + elemento.nodeName + " es " + elemento.innerHTML);

//OBTENER EL ÍNDICE DE UN ELEMENTO RESPECTO A SUS HERMANOS
// $("li").click(()=>{ //PROBAR!!!!! OJO
//     alert("Has pulsado sobre el elemento " + $(this).index());
// });
// $("li").click(function () {
//     alert("Has pulsado el elemento " + $(this).index());
// });

//FILTRAR ELEMENTOS SEGÚN UNA CONDICIÓN
//$.grep(array, function(elem, indice){ return condición;}) 
// var filtrado = $.grep($("li"),function(element, indice){
//     return indice > 1;
// });
// $.each(filtrado, function (i, e){
//     alert(i + "-" +e.innerHTML);
// });

//CNOVERTIR UN ARRAY JQUERY A UN ARRAY JS
// var arrayJS = $.makeArray($("li"));
// arrayJS.reverse();//Invertir el orden del array
// //Recorremos el array de JS
// for (i = 0; i <arrayJS.length;i++){
//     alert(arrayJS[i].innerHTML);
// }
}