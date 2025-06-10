<?php
require "../../bootstrap.php";
use App\Models\Mascotas;
$mascota = Mascotas::getInstancia();
echo "insertando mascota<br/>";
$mascota->setNombre('Firulais');
$mascota->setColor('Negro');
$mascota->setHabilidad('100');
$mascota->setSociabilidad('4');
$mascota->setIdPropietario('1');
$mascota->set();

$mascota->setNombre('Rufus');
$mascota->setColor('Blanco');
$mascota->setHabilidad('100');
$mascota->setSociabilidad('4');
$mascota->setIdPropietario('1');
$mascota->set();

$mascota->setNombre('Xuxo');
$mascota->setColor('Marrón');
$mascota->setHabilidad('100');
$mascota->setSociabilidad('4');
$mascota->setIdPropietario('2');
$mascota->set();

$mascotas = $mascota->getAllMascotas();
echo "Listado de mascotas:<br/>";
foreach ($mascotas as $m) {
    echo "Nombre:" . $m['nombre'] . "Color:" . $m['color'] . ", Habilidad:" . $m['habilidad'] . ", Sociabilidad:" . $m['sociabilidad'] . "<br/>";
}

echo "Listado de mascotas del propietario 2:";
$mascotas = $mascota->getMascotaByIdPropietario(2);
foreach ($mascotas as $m) {
    echo "Nombre:" . $m['nombre'] . "Color:" . $m['color'] . ", Habilidad:" . $m['habilidad'] . ", Sociabilidad:" . $m['sociabilidad'] . "<br/>";
}

echo "Listado de mascotas por filtro: Rufus";
$mascotas = $mascota->getFilterMascotas('Rufus');
foreach ($mascotas as $m) {
    echo "Nombre:" . $m['nombre'] . "Color:" . $m['color'] . ", Habilidad:" . $m['habilidad'] . ", Sociabilidad:" . $m['sociabilidad'] . "<br/>";
}
?>