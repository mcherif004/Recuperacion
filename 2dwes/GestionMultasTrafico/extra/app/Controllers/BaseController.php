<?php
namespace App\Controllers;

class BaseController{
    public function renderHTML($filename, $data=[]) {
        include($filename);
    }
}
?>