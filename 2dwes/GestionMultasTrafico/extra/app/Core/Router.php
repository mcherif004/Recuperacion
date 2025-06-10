<?php
namespace App\Core;

class Router {
    private $routes = [];

    public function add($route) {
        $this->routes[] = $route;
    }

    public function match(string $request) {
        foreach ($this->routes as $route) {
            if (preg_match($route['path'], $request)) {
                return $route;
            }
        }
        return null;
    }
}
?>