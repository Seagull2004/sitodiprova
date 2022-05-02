<?php
    $aggiornamento = "magazzinoJSON = '" . addslashes($_POST['content']) . "'";
    echo $aggiornamento;
    file_put_contents("../database/magazzinoJSON.json", $aggiornamento);
?>