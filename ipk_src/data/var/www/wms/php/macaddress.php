<?php
$orderNumber = shell_exec("cat /sys/class/net/br0/address | tr -d '\n'");
echo $orderNumber
?>