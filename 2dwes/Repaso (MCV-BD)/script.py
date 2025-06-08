import os
import json
import subprocess

# Solicitar el nombre del proyecto
proyecto = input("Introduce el nombre del proyecto: ")
host_virtual = input("Introduce el nombre del host virtual (Sólo el nombre: [tunombre].local.conf): ")

# Crear la carpeta con permisos 777
try:
    os.makedirs(proyecto, exist_ok=True)
    os.chmod(proyecto, 0o777)
    print(f"Carpeta '{proyecto}' creada con éxito.")
except Exception as e:
    print(f"Error al crear la carpeta: {e}")
    exit(1)

# Ruta base del proyecto
ruta_base = os.path.join(os.getcwd(), proyecto)

# Archivos a crear
archivos = {
    ".env": """DBHOST="localhost"
DBNAME=""
DBUSER="root"
DBPASS="1234"
DBPORT="3306"
SMTP_SERVER=""
SMTP_USER=""
SMTP_PASS=""
""",
    ".gitignore": """vendor
.env
.htaccess
""",
    "bootstrap.php": """<?php 
    require 'vendor/autoload.php'; 
    use Dotenv\\Dotenv;
    
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    define('DBHOST', $_ENV['DBHOST']);
    define('DBNAME', $_ENV['DBNAME']);
    define('DBUSER', $_ENV['DBUSER']);
    define('DBPASS', $_ENV['DBPASS']);
    define('DBPORT', $_ENV['DBPORT']);
    define('SMTP_SERVER', $_ENV['SMTP_SERVER']);
    define('SMTP_USER', $_ENV['SMTP_USER']);
    define('SMTP_PASS', $_ENV['SMTP_PASS']);
?>
""",
    "composer.json": json.dumps({
        "autoload": {
            "psr-4": {
                "App\\": "app/"
            }
        },
        "require": {
            "vlucas/phpdotenv": "^5.6"
        }
    }, indent=4)
}

# Crear archivos en la carpeta del proyecto
try:
    for nombre, contenido in archivos.items():
        with open(os.path.join(ruta_base, nombre), "w") as archivo:
            archivo.write(contenido)
    print("Archivos creados con éxito.")
except Exception as e:
    print(f"Error al crear los archivos: {e}")
    exit(1)

# Crear carpetas adicionales
carpetas = [
    "app/Config",
    "app/Controllers",
    "app/Core",
    "app/Models",
    "app/views",
    "public/css",
    "public/uploads"
]

try:
    for carpeta in carpetas:
        os.makedirs(os.path.join(ruta_base, carpeta), exist_ok=True)
    print("Subdirectorios de app y archivos creados con éxito.")
except Exception as e:
    print(f"Error al crear subdirectorios: {e}")
    exit(1)

# Archivos específicos en subdirectorios
subarchivos = {
    "app/Controllers/BaseController.php": """<?php

namespace App\\Controllers;
use App\\Controllers\\DefaultController;

class BaseController{
    public function renderHTML($fileName, $data=[]){
        include($fileName);
    }
}

?>
""",
    "app/Core/Router.php": """<?php

namespace App\\Core;
class Router
{
    private $routes = array();

    public function add($route)
    {
        $this->routes[] = $route;
    }

    public function match(string $request)
    {
        $matches = array();
        foreach ($this->routes as $route) {
            $patron=$route['path'];
            if (preg_match($patron, $request)){
                $matches = $route;
            }
        }
        return $matches;
    }
}
""",
    "app/Models/DBAbstractModel.php": """<?php
namespace App\\Models;
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
            $this->conn = new \\PDO($dsn, self::$db_user, self::$db_pass, array(\\PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            return $this->conn;
        } catch (\\PDOException $e) {
            printf("Conexión fallida: %s\n", $e->getMessage());
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
            if (preg_match_all('/(:\\w+)/', $this->query, $_named, PREG_PATTERN_ORDER)) {
                $_named = array_pop($_named);
                foreach ($_named as $_param) {
                    $_stmt->bindValue($_param, $this->parametros[substr($_param, 1)]);
                }
            }
            try {
                if (!$_stmt->execute()) {
                    printf("Error de consulta: %s\n", $_stmt->errorInfo()[2]);
                }
                $this->rows = $_stmt->fetchAll(\\PDO::FETCH_ASSOC);
                $_stmt->closeCursor();
            } catch (\\PDOException $e) {
                printf("Error en consulta: %s\n", $e->getMessage());
            }
        }
    }
}
?>
""",
    "public/.htaccess": """RewriteEngine On

RewriteRule ^(css|script|imagenes|uploads)($|/) - [L]
RewriteRule ^(.*)$ index.php [L]

RewriteCond %{HTTP:Authorization} ^(.+)$
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
""",
    "public/index.php": """<?php
session_start();
require_once "../bootstrap.php";
require_once "../vendor/autoload.php";

use App\\Core\\Router;
use App\\Controllers\\DefaultController;

$router = new Router();

$router->add([  'name' => 'index',
                'path' => '/^\\/$/',
                'action' => [DefaultController::class, 'IndexAction']]);     

$request = $_SERVER['REQUEST_URI'];
$route = $router->match($request);

if($route){
    $controllerName = $route['action'][0];
    $actionName = $route['action'][1];
    $controller = new $controllerName;
    $controller->$actionName($request);
}else{
    echo "No route";
}
?>
""",
    "app/Controllers/DefaultController.php": """<?php

    namespace App\\Controllers;

class DefaultController extends BaseController
{
    public function IndexAction()
    {
        $data = [];

        $this->renderHTML('../app/views/index_view.php', $data);
    }
}
?>""",
    "app/views/index_view.php":"""<style>
        body {
            background-color:#1f1f1f;
            font-family: Arial, sans-serif;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>

    <?php

    echo "Hola Mundo";

    ?>"""
}

try:
    for ruta, contenido in subarchivos.items():
        with open(os.path.join(ruta_base, ruta), "w") as archivo:
            archivo.write(contenido)
    print("Carpeta public y sus archivos creados con éxito.")
except Exception as e:
    print(f"Error al crear los archivos específicos: {e}")
    exit(1)

# Ejecutar composer install
try:
    subprocess.run(["composer", "install"], cwd=ruta_base, check=True)
    print("Dependencias instaladas con Composer.")
except subprocess.CalledProcessError as e:
    print(f"Error al ejecutar 'composer install': {e}")

# Crear archivo del host virtual
vhost_content = f"""<VirtualHost *:80>
    ServerName {host_virtual}.local
    DocumentRoot {os.path.join(ruta_base, 'public')}

    <Directory {os.path.join(ruta_base, 'public')}>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${{APACHE_LOG_DIR}}/error.log
    CustomLog ${{APACHE_LOG_DIR}}/access.log combined
</VirtualHost>
"""

vhost_file = f"{host_virtual}.local.conf"
try:
    with open(vhost_file, "w") as archivo:
        archivo.write(vhost_content)
    print(f"Archivo del host virtual '{vhost_file}' creado con éxito.")
except Exception as e:
    print(f"Error al crear el archivo del host virtual: {e}")
    exit(1)

# Mover el archivo del host virtual a /etc/apache2/sites-available
try:
    subprocess.run(["sudo", "mv", vhost_file, "/etc/apache2/sites-available/"], check=True)
    print(f"Archivo '{vhost_file}' movido a /etc/apache2/sites-available con éxito.")
except subprocess.CalledProcessError as e:
    print(f"Error al mover el archivo del host virtual: {e}")
    exit(1)

# Habilitar el sitio y reiniciar Apache
try:
    subprocess.run(["sudo", "a2ensite", f"{host_virtual}.local.conf"], check=True)
    subprocess.run(["sudo", "systemctl", "reload", "apache2"], check=True)
    subprocess.run(["sudo", "systemctl", "restart", "apache2"], check=True)
    print("Host virtual habilitado y Apache reiniciado con éxito.")
except subprocess.CalledProcessError as e:
    print(f"Error al habilitar el sitio o reiniciar Apache: {e}")
    exit(1)

print("¡Configuración completada!")   