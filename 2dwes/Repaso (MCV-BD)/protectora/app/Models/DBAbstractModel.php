<?php
namespace App\Models;
abstract class DBAbstractModel
{
    private static $db_host = DBHOST;
    private static $db_user = DBUSER;
    private static $db_pass = DBPASS;
    private static $db_name = DBNAME;
    private static $db_port = DBPORT;
    protected $mensaje = '';
    protected $conn;
    protected $query;
    protected $parametros = array();
    protected $rows = array();

    abstract protected function get();
    abstract protected function set();
    abstract protected function edit();
    abstract protected function delete();

    protected function open_connection()
    {
        $dsn = 'mysql:host=' . self::$db_host . ';' . 'dbname=' . self::$db_name . ';' . 'port=' . self::$db_port;
        try {
            $this->conn = new \PDO($dsn, self::$db_user, self::$db_pass, array(\PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            return $this->conn;
        } catch (\PDOException $e) {
            printf("Conexión fallida: %s
", $e->getMessage());
            exit();
        }
    }

    public function lastInsert()
    {
        return $this->conn->lastInsertId();
    }

    private function close_connection()
    {
        $this->conn = null;
    }

    protected function execute_single_query()
    {
        if ($_POST) {
            $this->open_connection();
            $this->conn->query($this->query);
            $this->close_connection();
        } else {
            $this->mensaje = 'Metodo no permitido';
        }
    }

    protected function get_results_from_query()
    {
        $this->open_connection();
        if (($_stmt = $this->conn->prepare($this->query))) {
            if (preg_match_all('/(:\w+)/', $this->query, $_named, PREG_PATTERN_ORDER)) {
                $_named = array_pop($_named);
                foreach ($_named as $_param) {
                    $_stmt->bindValue($_param, $this->parametros[substr($_param, 1)]);
                }
            }
            try {
                if (!$_stmt->execute()) {
                    printf("Error de consulta: %s
", $_stmt->errorInfo()[2]);
                }
                $this->rows = $_stmt->fetchAll(\PDO::FETCH_ASSOC);
                $_stmt->closeCursor();
            } catch (\PDOException $e) {
                printf("Error en consulta: %s
", $e->getMessage());
            }
        }
    }
}
?>
