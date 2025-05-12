<?php
session_start();

$valid_colors = ['A', 'R', 'M', 'B', 'N', 'V'];
$max_attempts = 9;

// Manejar reinicio del juego
if (isset($_GET['restart'])) {
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

// Inicializar variables de sesión
if (!isset($_SESSION['secret'])) {
    $_SESSION['secret'] = '';
    for ($i = 0; $i < 4; $i++) {
        $_SESSION['secret'] .= $valid_colors[array_rand($valid_colors)];
    }
    $_SESSION['attempts'] = [];
}

$secret = $_SESSION['secret'];
$attempts = $_SESSION['attempts'];
$error = [];
$game_over = false;
$victory = false;
$guess = [];

// Procesar intento
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $guess = array_map('strtoupper', $_POST['guess'] ?? []);
    $valid = true;

    // Validar campos
    for ($i = 0; $i < 4; $i++) {
        if (empty($guess[$i]) || !in_array($guess[$i], $valid_colors)) {
            $error[$i] = true;
            $valid = false;
        }
    }

    if ($valid) {
        // Calcular exactos y presentes
        list($exact, $near) = compare_guess($secret, implode('', $guess));
        
        // Guardar intento
        $_SESSION['attempts'][] = [
            'guess' => $guess,
            'exact' => $exact,
            'near' => $near
        ];

        // Verificar victoria
        if ($exact === 4) {
            $victory = true;
            $game_over = true;
        } elseif (count($_SESSION['attempts']) >= $max_attempts) {
            $game_over = true;
        }
    }
}

function compare_guess($secret, $guess) {
    $exact = 0;
    $secret_remaining = [];
    $guess_remaining = [];
    
    $secret_arr = str_split($secret);
    $guess_arr = str_split($guess);

    // Calcular coincidencias exactas
    for ($i = 0; $i < 4; $i++) {
        if ($secret_arr[$i] === $guess_arr[$i]) {
            $exact++;
        } else {
            $secret_remaining[] = $secret_arr[$i];
            $guess_remaining[] = $guess_arr[$i];
        }
    }

    // Calcular colores presentes
    $near = 0;
    $counts = array_count_values($secret_remaining);
    foreach ($guess_remaining as $color) {
        if (!empty($counts[$color])) {
            $near++;
            $counts[$color]--;
        }
    }
    
    return [$exact, $near];
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Colordle</title>
    <style>
        .error { border: 2px solid red; }
        table { border-collapse: collapse; margin: 20px 0; }
        td, th { border: 1px solid #ddd; padding: 10px; text-align: center; }
        input { width: 30px; text-align: center; text-transform: uppercase; }
    </style>
</head>
<body>
    <h1>Colordle</h1>
    
    <?php if ($game_over): ?>
        <?php if ($victory): ?>
            <p style="color: green;">¡Felicidades! ¡Has ganado!</p>
        <?php else: ?>
            <p style="color: red;">¡Agotaste tus intentos! El patrón era: <?= $secret ?></p>
        <?php endif; ?>
        <a href="?restart=1">Nuevo juego</a>
    <?php else: ?>
        <form method="POST">
            <?php for ($i = 0; $i < 4; $i++): ?>
                <input type="text" name="guess[]" maxlength="1" 
                       class="<?= isset($error[$i]) ? 'error' : '' ?>" 
                       value="<?= htmlspecialchars($guess[$i] ?? '') ?>">
            <?php endfor; ?>
            <button type="submit">Comprobar</button>
        </form>
        
        <?php if (!empty($error)): ?>
            <p style="color: red;">Ingresa 4 letras válidas (A, R, M, B, N, V)</p>
        <?php endif; ?>
    <?php endif; ?>

    <?php if (!empty($attempts)): ?>
        <table>
            <tr>
                <th colspan="4">Intento</th>
                <th>Exactos</th>
                <th>Presentes</th>
            </tr>
            <?php foreach ($attempts as $att): ?>
            <tr>
                <?php foreach ($att['guess'] as $color): ?>
                    <td><?= $color ?></td>
                <?php endforeach; ?>
                <td><?= $att['exact'] ?></td>
                <td><?= $att['near'] ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
    <?php endif; ?>

    <p>Colores válidos: 
        A (Azul), R (Rojo), M (Morado), 
        B (Blanco), N (Negro), V (Verde)
    </p>
</body>
</html>