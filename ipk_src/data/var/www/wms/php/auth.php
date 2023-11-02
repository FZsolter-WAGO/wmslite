<?php
function adminAuth($password) {
    $username = "admin";
    try {
        if ( isset($password) ) {
            $username = htmlspecialchars($username, ENT_QUOTES);
            $txt = "";
            if ( pam_auth( $username, $password, $txt, true) ) {
                return true;
            }
            $txt = "";
            if ( pam_auth( $username, $password, $txt, false) ) {
                return true;
            }
        }
    } catch (Throwable $e) {}
    return false;
}
?>