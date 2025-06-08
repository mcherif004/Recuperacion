<?php

// Configuración de la conexión a la base de datos en XAMPP con MySQL
$host = "localhost";
$dbname = "ejemploCrud_JQUERY";
$user = "root";
$password = "";

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    die("Can't connect to the database: {$exception->getMessage()}");
}

switch (strtolower($_SERVER['REQUEST_METHOD'])) {
    case 'get':
        $sql = 'SELECT * FROM contacts';

        try {
            $st = $db->query($sql);
            echo json_encode($st->fetchAll(PDO::FETCH_ASSOC));
        } catch (PDOException $exception) {
            http_response_code(500);
            die ("Can't execute query '$sql': '{$exception->getMessage()}'");
        }
        break;

    case 'post':
        $sql = "INSERT INTO contacts (firstname, lastname, email) VALUES (:firstname, :lastname, :email)";

        $st = $db->prepare($sql);
        try {
            $st->execute([
                'firstname' => $_POST['firstname'],
                'lastname' => $_POST['lastname'],
                'email' => $_POST['email'],
            ]);

            echo $db->lastInsertId();
        } catch (PDOException $exception) {
            http_response_code(500);
            die ($exception->getMessage());
        }
        break;

    case 'delete':
        if (empty($id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT))) {
            http_response_code(400);
            die;
        }

        $sql = "DELETE FROM contacts WHERE id = :id";
        $st = $db->prepare($sql);
        try {
            $st->execute(['id' => $id]);
            echo json_encode(["success" => true, "rowsAffected" => $st->rowCount()]);
        } catch (Exception $exception) {
            http_response_code(500);
            die($exception->getMessage());
        }
        break;

    case 'put':
        if (empty($id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT))) {
            http_response_code(400);
            die;
        }

        parse_str(file_get_contents('php://input'), $_POST);

        if (empty($_POST['firstname']) || empty($_POST['lastname']) || empty($_POST['email'])) {
            http_response_code(400);
            die;
        }

        $sql = 'UPDATE contacts SET firstname = :firstname, lastname = :lastname, email = :email WHERE id = :id';
        $st = $db->prepare($sql);

        try {
            $st->execute([
                'firstname' => $_POST['firstname'],
                'lastname' => $_POST['lastname'],
                'email' => $_POST['email'],
                'id' => $id,
            ]);
            echo json_encode(["success" => true, "rowsAffected" => $st->rowCount()]);
        } catch (PDOException $exception) {
            http_response_code(500);
            die ($exception->getMessage());
        }

        break;
}
?>
