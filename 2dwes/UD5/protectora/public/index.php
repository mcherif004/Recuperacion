<?php
// require_once 'app/models/Perro.php';
// require_once 'app/models/Persona.php';

require_once '../vendor/autoload.php';

use App\Models\Perro;
use App\Models\Persona;

// Desde PHP 7 es posible usar: use app\models\{Perro, Persona};

$perro = new Perro('tana', 'negro');
echo "Dame la pata";
$perro->darPata();
$perro->entrenar();
$perro->entrenar();
$perro->entrenar();
$perro->entrenar();
$perro->entrenar();
$perro->entrenar();
$perro->darPata();
$perro->darPata();