<?php
    $aggiornamento = "ordiniJSON = '" . addslashes($_POST['content']) . "'";
    echo $aggiornamento;
    file_put_contents("../database/ordiniJSON.json", $aggiornamento);
?>