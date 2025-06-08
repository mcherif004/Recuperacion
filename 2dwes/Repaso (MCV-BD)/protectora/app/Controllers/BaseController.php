<?php

namespace App\Controllers;
use App\Controllers\DefaultController;

class BaseController{
    public function renderHTML($fileName, $data=[]){
        include($fileName);
    }
}

?>
