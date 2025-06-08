<?php

    namespace App\Controllers;

class DefaultController extends BaseController
{
    public function IndexAction()
    {
        $data = [];

        $this->renderHTML('../app/views/index_view.php', $data);
    }
}
?>