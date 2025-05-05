<?php
session_start();

// Array de películas
$peliculasPorGenero = [
    'drama' => [
        ['titulo' => 'Her', 'imagen' => 'img/her.jpg', 'año' => 2013],
        ['titulo' => 'The Social Network', 'imagen' => 'img/socialnetwork.jpg', 'año' => 2010],
        ['titulo' => 'Snowden', 'imagen' => 'img/snowden.jpg', 'año' => 2016]
    ],
    'comedia' => [
        ['titulo' => 'The Grand Budapest Hotel', 'imagen' => 'img/comedia1.jpg', 'año' => 2014],
        ['titulo' => 'Jumanji', 'imagen' => 'img/comedia2.jpg', 'año' => 2017],
        ['titulo' => 'Deadpool', 'imagen' => 'img/comedia3.jpg', 'año' => 2016]
    ],
    'ciencia ficción' => [
        ['titulo' => 'The Matrix', 'imagen' => 'img/matrix.jpg', 'año' => 1999],
        ['titulo' => 'Ex Machina', 'imagen' => 'img/exmachina.jpg', 'año' => 2014],
        ['titulo' => 'Ready Player One', 'imagen' => 'img/readyplayerone.jpg', 'año' => 2018]
    ],
    'fantasía' => [
        ['titulo' => 'Ready Player One', 'imagen' => 'img/readyplayerone.jpg', 'año' => 2018],
        ['titulo' => 'Tron: Legacy', 'imagen' => 'img/tron.jpg', 'año' => 2010],
        ['titulo' => 'The Lord of the Rings', 'imagen' => 'img/fantasia1.jpg', 'año' => 2001]
    ],
    'terror' => [
        ['titulo' => 'The Conjuring', 'imagen' => 'img/terror1.jpg', 'año' => 2013],
        ['titulo' => 'A Quiet Place', 'imagen' => 'img/terror2.jpg', 'año' => 2018],
        ['titulo' => 'Get Out', 'imagen' => 'img/terror3.jpg', 'año' => 2017]
    ],
    'thriller' => [
        ['titulo' => 'Ex Machina', 'imagen' => 'img/exmachina.jpg', 'año' => 2014],
        ['titulo' => 'Snowden', 'imagen' => 'img/snowden.jpg', 'año' => 2016],
        ['titulo' => 'Gone Girl', 'imagen' => 'img/thriller1.jpg', 'año' => 2014]
    ],
    'western' => [
        ['titulo' => 'Westworld (Serie)', 'imagen' => 'img/westworld.jpg', 'año' => 2016],
        ['titulo' => 'Django Unchained', 'imagen' => 'img/western1.jpg', 'año' => 2012],
        ['titulo' => 'The Revenant', 'imagen' => 'img/western2.jpg', 'año' => 2015]
    ],
    'musical' => [
        ['titulo' => 'La La Land', 'imagen' => 'img/musical1.jpg', 'año' => 2016],
        ['titulo' => 'The Greatest Showman', 'imagen' => 'img/musical2.jpg', 'año' => 2017],
        ['titulo' => 'Moulin Rouge!', 'imagen' => 'img/musical3.jpg', 'año' => 2001]
    ]
];

// Preferencias iniciales
if(!isset($_SESSION['preferencias'])) {
    $_SESSION['preferencias'] = [
        'genero_preferido' => null,
        'preferencias_set' => false
    ];
}
?>