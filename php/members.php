<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$connection = new mysqli("localhost", "zapcuser", ")EDa&Wd>~5L-,s<S", "zapc");

$result = $connection->query("SELECT * FROM Members");

$outp = "";
while ($rs = $result->fetch_array(MYSQLI_ASSOC))
{
    if ($outp != "")
    {
    	$outp .= ",";
    }

    $outp .= '{"djname":"'  . $rs["djname"] . '",';
    $outp .= '"bild":"'  . $rs["bild"] . '",';
    $outp .= '"description":"'  . $rs["description"] . '",';
    $outp .= '"genre":"'  . $rs["genre"] . '",';
    $outp .= '"facebook":"'  . $rs["facebook"] . '",';
    $outp .= '"twitter":"'  . $rs["twitter"] . '",';
    $outp .= '"soundcloud":"'  . $rs["soundcloud"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$connection->close();

echo($outp);
?>
