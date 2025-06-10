<?php
namespace App\Models;

abstract class DBAbstracModel {
    private static $db_host = DBHOST;
    private static $db_user = DBUSER;
    private static $db_pass = DBPASS;
    private static $db_name = DBNAME;
    private static $db_port = DBPORT;

    protected $mensaje = "";
    protected $conn; // Manejador de la BD

    // Manejo básico para consultas
    protected $query; // Consulta
    protected $parametros = []; // Parámetros de entrada
    protected $rows = []; // Array con los datos de salida

    // Metodos abstractos para implementar en los diferentes módulos
    abstract protected function get();
    abstract protected function set();
    abstract protected function edit();
    abstract protected function delete();

    #Crear conexión a la base de datos
    protected function open_connection() {
        $dsn = "mysql:host=" . self::$db_host . ";" . "dbname=" . self::$db_name . ";" . "port=" . self::$db_port;
        try {
            $this->conn = new \PDO($dsn, self::$db_user, self::$db_pass, array(\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            return $this->conn;
        } catch (\PDOException $e) {
            printf("Conexión fallida: %s\n", $e->getMessage());
            exit();
        }
    }
    #Método que devuelve el último id introducido
    public function lastInsert() {
        return $this->conn->lastInsertId();
    }
    #Desconectar la base de datos
    protected function close_connection() {
        $this->conn = null;
    }
    #Ejecutar un query simple del tipo INSERT, DELETE, UPDATE
    #Consulta que no devuelve tuplas de la tabla
    protected function execute_single_query() {
        if ($_POST) {
            $this->open_connection();
            $this->query = $this->conn->prepare($this->query);
            self:$this->close_connection();
        } else {
            $this->mensaje = 'Metodo no permitido';
        }
    }
    #Traer los resultados de una consulta en un Array
    #Consulta que devuelve tuplas de la tabla
    protected function get_results_from_query() {
        $this->open_connection();
        if (($_stmt = $this->conn->prepare($this->query))) {
            #PREG_PATTERN_ORDER flag para especificar como se cargan los resultados en $named.
            if (preg_match_all('/:([A-Za-z0-9_]+)/', $this->query, $_named, PREG_PATTERN_ORDER)) {
                $_named = array_pop($_named);
                foreach ($_named as $_param) {
                    $_stmt->bindValue($_param, $this->parametros[$_param]);
                }
            }

            try {
                if (!$_stmt->execute()) {
                    printf("Error de consulta: %s\n", $_stmt->errorInfo()[2]);
                }
                $this->rows = $_stmt->fetchAll(\PDO::FETCH_ASSOC);
                $_stmt->closeCursor();
            } catch (\PDOException $e) {
                printf("Error de consulta: %s\n", $e->getMessage());
            }
        }
    }
}
?>