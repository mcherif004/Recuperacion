<?php
include 'config.php';
$anyo_actual = date('Y');

// 1. Process POST request with validation
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $genero = $_POST['genero'] ?? null;
    if($genero && array_key_exists($genero, $peliculasPorGenero)) {
        $_SESSION['preferencias'] = [
            'genero_preferido' => $genero,
            'preferencias_set' => true
        ];
    } else {
        $_SESSION['preferencias']['preferencias_set'] = false;
    }
}

// 2. Determine movies to show (GET param > Session > Current year)
$genero_actual = null;
$peliculas = [];

// Check for valid GET parameter
if(isset($_GET['genero']) && array_key_exists($_GET['genero'], $peliculasPorGenero)) {
    $genero_actual = $_GET['genero'];
    $peliculas = $peliculasPorGenero[$genero_actual];
}
// Check valid session preferences
elseif($_SESSION['preferencias']['preferencias_set'] && 
        array_key_exists($_SESSION['preferencias']['genero_preferido'], $peliculasPorGenero)) {
    $genero_actual = $_SESSION['preferencias']['genero_preferido'];
    $peliculas = $peliculasPorGenero[$genero_actual];
}
// Show current year movies
else {
    foreach($peliculasPorGenero as $lista) {
        foreach($lista as $pelicula) {
            if($pelicula['año'] == $anyo_actual) {
                $peliculas[] = $pelicula;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Cine Tecnológico</title>
    <style>
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #3498db;
            --background-light: #f8f9fa;
            --text-dark: #2c3e50;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-dark);
            margin: 0;
            padding: 20px;
        }

        .menu {
            background: var(--primary-color);
            padding: 1rem;
            margin: -20px -20px 30px;
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
        }

        .menu a {
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border-radius: 4px;
            transition: all 0.3s ease;
            margin: 0 5px;
        }

        .menu a:hover {
            background: var(--secondary-color);
            transform: translateY(-2px);
        }

        h2 {
            color: var(--primary-color);
            border-bottom: 3px solid var(--secondary-color);
            padding-bottom: 0.5rem;
            margin-bottom: 2rem;
        }

        .pelicula {
            display: flex;
            gap: 2rem;
            align-items: flex-start;
            margin: 2rem 0;
            padding: 1.5rem;
            background: white;
            border-radius: 10px;
            box-shadow: var(--shadow);
            transition: transform 0.3s ease;
        }

        .pelicula:hover {
            transform: translateY(-5px);
        }

        .pelicula img {
            width: 150px;
            height: auto;
            border-radius: 8px;
            object-fit: cover;
            aspect-ratio: 2/3;
        }

        .preferencias {
            background: var(--background-light);
            padding: 2rem;
            border-radius: 10px;
            margin-top: 3rem;
            max-width: 600px;
        }

        form {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
        }

        select {
            padding: 0.8rem;
            border: 2px solid var(--primary-color);
            border-radius: 6px;
            background: white;
            font-size: 1rem;
            flex: 1;
            min-width: 250px;
        }

        button {
            padding: 1rem 2rem;
            background: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        button:hover {
            background: var(--primary-color);
        }
    </style>
</head>
<body>
    <nav class="menu">
        <?php foreach(array_keys($peliculasPorGenero) as $genero): ?>
            <a href="?genero=<?= urlencode($genero) ?>"><?= htmlspecialchars($genero) ?></a>
        <?php endforeach; ?>
    </nav>

    <?php if(!empty($peliculas)): ?>
        <h2>
            <?php if($genero_actual !== null): ?>
                Películas de <?= htmlspecialchars($genero_actual) ?>
            <?php elseif($_SESSION['preferencias']['preferencias_set']): ?>
                Películas de <?= htmlspecialchars($_SESSION['preferencias']['genero_preferido']) ?>
            <?php else: ?>
                Estrenos Tecnológicos de <?= $anyo_actual ?>
            <?php endif; ?>
        </h2>
        
        <?php foreach($peliculas as $pelicula): ?>
            <div class="pelicula">
                <img src="<?= htmlspecialchars($pelicula['imagen']) ?>" alt="Carátula de <?= htmlspecialchars($pelicula['titulo']) ?>">
                <div>
                    <h3><?= htmlspecialchars($pelicula['titulo']) ?></h3>
                    <p>Año de estreno: <?= htmlspecialchars($pelicula['año']) ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p>No hay películas disponibles en esta categoría</p>
    <?php endif; ?>

    <div class="preferencias">
        <h3>Selecciona tu género tecnológico favorito</h3>
        <form method="post">
            <select name="genero">
                <?php foreach(array_keys($peliculasPorGenero) as $genero): ?>
                    <option value="<?= htmlspecialchars($genero) ?>" <?= ($_SESSION['preferencias']['genero_preferido'] ?? null) === $genero ? 'selected' : '' ?>>
                        <?= htmlspecialchars($genero) ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <button type="submit">Guardar Preferencia</button>
        </form>
    </div>
</body>
</html>