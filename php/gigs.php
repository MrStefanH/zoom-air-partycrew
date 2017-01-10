<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$db_creds = unserialize(getenv('ZAPC_DB_Credentials'));

$connection = new mysqli($db_creds['host'], $db_creds['username'], $db_creds['password'], $db_creds['database']);

$result = $connection->query("SELECT * FROM Gigs WHERE date >= NOW()");

$outp = "";
while ($rs = $result->fetch_array(MYSQLI_ASSOC))
{
    if ($outp != "")
    {
    	$outp .= ",";
    }

    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"title":"'  . $rs["title"] . '",';
    $outp .= '"date":"'  . $rs["date"] . '",';
    $outp .= '"location":"'  . $rs["location"] . '",';
    $outp .= '"alternative_text":"'  . $rs["alternative_text"] . '",';
    $outp .= '"dj":"'  . $rs["dj"] . '",';
    $outp .= '"description":"'  . $rs["description"] . '",';
    $outp .= '"gig_type":"'  . $rs["gig_type"] . '",';
    $outp .= '"gig_image":"'  . $rs["gig_image"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$connection->close();

echo($outp);
?>
