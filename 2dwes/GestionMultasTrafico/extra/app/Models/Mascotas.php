<?php
namespace App\Models;

class Mascotas extends DBAbstracModel {
    // Modelo singleton
    private static $instancia;

    public static function getInstancia() {
        if (!isset(self::$instancia)) {
            $miClase = __CLASS__;
            self::$instancia = new $miClase;
        }
        return self::$instancia;
    }

    public function __clone() {
        trigger_error("Clonación no permitida", E_USER_ERROR);
    }

    private $id;
    private $nombre;
    private $color;
    private $habilidad;
    private $sociabilidad;
    private $propietario_id;
    // setters
    public function setId($id) {
        $this->id = $id;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function setColor($color) {
        $this->color = $color;
    }
    public function setHabilidad($habilidad) {
        $this->habilidad = $habilidad;
    }
    public function setSociabilidad($sociabilidad) {
        $this->sociabilidad = $sociabilidad;
    }
    public function setIdPropietario($propietario_id) {
        $this->propietario_id = $propietario_id;
    }
    // getters
    public function getId() {
        return $this->id;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function getColor() {
        return $this->color;
    }
    public function getHabilidad() {
        return $this->habilidad;
    }
    public function getSociabilidad() {
        return $this->sociabilidad;
    }
    public function getIdPropietario() {
        return $this->propietario_id;
    }

    public function set() {
        $this->query = "INSERT INTO mascotas (nombre, color, habilidad, sociabilidad, propietario_id) 
                        VALUES (:nombre, :color, :habilidad, :sociabilidad, :propietario_id)";
        $this->parametros['nombre'] = $this->nombre;
        $this->parametros['color'] = $this->color;
        $this->parametros['habilidad'] = $this->habilidad;
        $this->parametros['sociabilidad'] = $this->sociabilidad;
        $this->parametros['propietario_id'] = $this->propietario_id;
        $this->get_results_from_query();
        $this->mensaje = "Mascota agregada";
    }

    public function get($id = '') {
        $this->query = "SELECT * FROM mascotas WHERE id = :id";
        $this->parametros['id'] = $id;
        $this->get_results_from_query();
        $this->mensaje = "Mascota encontrada";
    }

    public function edit() {
        $this->query = "UPDATE mascotas SET nombre = :nombre,
                                            color = :color,
                                            habilidad = :habilidad,
                                            sociabilidad = :sociabilidad,
                                            propietario_id = :propietario_id";
        $this->parametros['nombre'] = $this->nombre;
        $this->parametros['color'] = $this->color;
        $this->parametros['habilidad'] = $this->habilidad;
        $this->parametros['sociabilidad'] = $this->sociabilidad;
        $this->parametros['propietario_id'] = $this->propietario_id;
        $this->get_results_from_query();
        $this->mensaje = "Mascota actualizada";
    }

    public function delete($id = '') {
        $this->query = "DELETE FROM mascotas WHERE id = :id";
        $this->parametros['id'] = $id;
        $this->get_results_from_query();
        $this->mensaje = "Mascota borrada";
    }

    public function getMascotaByIdPropietario($propietario_id) {
        $this->query = "SELECT * FROM mascotas WHERE propietario_id = :propietario_id";
        $this->parametros['propietario_id'] = $propietario_id;
        $this->get_results_from_query();
        $this->mensaje = "Mascota por propietario";
        return $this->rows;
    }

    // Cuidado con este metodo
    public function getAllMascotas() {
        $this->query = "SELECT * FROM mascotas";
        $this->get_results_from_query();
        $this->mensaje = "Todas las mascotas";
        return $this->rows;
    }

    public function getFilterMascotas($filter) {
        $this->query = "SELECT * FROM mascotas WHERE nombre LIKE :nombre OR color LIKE :color";
        $this->parametros['nombre'] = "%$filter%";
        $this->parametros['color'] = "%$filter%";
        $this->get_results_from_query();
        $this->mensaje = "Casi todas las mascotas";
        return $this->rows;
    }
}
?>