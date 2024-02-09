<?php
include_once 'auth.php';

$entityBody = json_decode(file_get_contents('php://input'), true);
if ( adminAuth($entityBody['password']) ) {
    try {
        $configFile = fopen('../config/wms.config.json', 'w');
        fwrite($configFile, json_encode($entityBody["json"]));
        fclose($configFile);
        $configFile = fopen('/home/codesys_root/PlcLogic/wms.config.csv', 'w');
        fwrite($configFile, $entityBody["csv"]);
        fclose($configFile);
        exec('sudo /home/codesys_root/PlcLogic/codesys_restart.sh');
        echo 'Success!';
    } catch (Throwable $e) {
        echo 'Internal error!';
    }
} else {
    echo 'Invalid password!';
}
?>