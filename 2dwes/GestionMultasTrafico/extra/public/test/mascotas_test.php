<?php
require "../../bootstrap.php";
use App\Models\Mascotas;
$id = 6;
$mascota = Mascotas::getInstancia();
echo "insertando mascota<br/>";
$mascota->setNombre('Firulais');
$mascota->setColor('Negro');
$mascota->setHabilidad('100');
$mascota->setSociabilidad('4');
$mascota->setIdPropietario('1');
$mascota->set();
echo "mascota insertada<br/>";
echo "recuperando mascota por id<br/>";
$mascota->get($id);
echo $mascota->getNombre();
echo $mascota->getColor();
echo $mascota->getHabilidad();
echo $mascota->getSociabilidad();
echo $mascota->getIdPropietario();
echo "modificando mascota<br/>";
$mascota->setId($id);
$mascota->setNombre('modificado');
$mascota->setColor('modificado');
$mascota->setHabilidad('0');
$mascota->setSociabilidad('0');
$mascota->setIdPropietario('1');
$mascota->edit();
echo "recuperando registro modificado<br/>";
$mascota->get($id);
echo $mascota->getNombre();
echo $mascota->getColor();
echo $mascota->getHabilidad();
echo $mascota->getSociabilidad();
echo $mascota->getIdPropietario();
echo "borrando registro<br/>";
$mascota->delete($id);
echo "recuperamos registro borrado";
$mascota->get($id);
echo $mascota->getNombre();
echo $mascota->getColor();
echo $mascota->getHabilidad();
echo $mascota->getSociabilidad();
echo $mascota->getIdPropietario();
?>