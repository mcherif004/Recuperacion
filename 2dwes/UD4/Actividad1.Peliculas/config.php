<?php
session_start();

// Array de películas de tecnología por género
$peliculasPorGenero = [
    'Inteligencia Artificial' => [
        [
            'titulo' => 'Ex Machina',
            'imagen' => 'img/exmachina.jpg',
            'año' => 2014
        ],
        [
            'titulo' => 'Her',
            'imagen' => 'img/her.jpg',
            'año' => 2013
        ],
        [
            'titulo' => 'The Matrix',
            'imagen' => 'img/matrix.jpg',
            'año' => 1999
        ]
    ],
    'Ciberseguridad' => [
        [
            'titulo' => 'Snowden',
            'imagen' => 'img/snowden.jpg',
            'año' => 2016
        ],
        [
            'titulo' => 'The Social Network',
            'imagen' => 'img/socialnetwork.jpg',
            'año' => 2010
        ]
    ],
    'Realidad Virtual' => [
        [
            'titulo' => 'Ready Player One',
            'imagen' => 'img/readyplayerone.jpg',
            'año' => 2018
        ],
        [
            'titulo' => 'Tron: Legacy',
            'imagen' => 'img/tron.jpg',
            'año' => 2010
        ]
    ],
    'Robótica' => [
        [
            'titulo' => 'I, Robot',
            'imagen' => 'img/irobot.jpg',
            'año' => 2004
        ],
        [
            'titulo' => 'Westworld (Serie)',
            'imagen' => 'img/westworld.jpg',
            'año' => 2016
        ],
        [
            'titulo' => 'Ghost in the Shell',
            'imagen' => 'img/ghostintheshell.jpg',
            'año' => 2017
        ]
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