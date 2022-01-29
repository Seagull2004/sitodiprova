<?php
    $aggiornamento =  $_POST["content"];
    echo $aggiornamento;
    file_put_contents("../database/utentiJSON.json", $aggiornamento);
?>