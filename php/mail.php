<?php

include 'functions.php';

$data['success'] = false;

if (!empty($_POST))
{
    $data['success'] = true;
    $_POST           = multiDimensionalArrayMap('cleanEvilTags', $_POST);
    $_POST           = multiDimensionalArrayMap('cleanData', $_POST);

    //your email adress
    $emailTo = 'info@zoom-air-partycrew.de'; //"yourmail@yoursite.com";

    //from email adress
    $emailFrom = 'kontakt@zoom-air-partycrew.de'; //"contact@yoursite.com";

    //email subject
    $emailSubject = 'Kontaktnachricht für Zoom Air Partycrew';

    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $comment = $_POST['nachricht'];
    $captcha = $_POST['g-recaptcha-response'];

    if (!$captcha)
    {
        $data['success'] = false;
    }

    if ('' == $name)
    {
        $data['success'] = false;
    }

    if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email))
    {
        $data['success'] = false;
    }

    if ('' == $comment)
    {
        $data['success'] = false;
    }

    $secretKey    = "6Ld1zSgTAAAAAHsYkvL4duO9JSvBLhOJMM97AGV0";
    $ip           = $_SERVER['REMOTE_ADDR'];
    $response     = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1)
    {
        $data['success'] = false;
    }

    if (true == $data['success'])
    {
        $message = "Folgende Nachricht wurde über das Kontaktformular von Zoom Air Partycrew gesendet:<br />\r\n";
        $message .= "Von: $name<br />\r\n";
        $message .= "EMAIL: $email<br />\r\n";
        $message .= "NACHRICHT: $comment";

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type:text/html; charset=utf-8' . "\r\n";
        $headers .= "From: Zoom Air Partycrew Kontakt <$emailFrom>" . "\r\n";

        if (!mail($emailTo, $emailSubject, $message, $headers))
        {
            $data['success'] = false;
        }
    }
}

echo json_encode(utf8ize($data));
