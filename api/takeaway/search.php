<?php

require "../include/dbh.php";
require "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // return product info
  if (!isset($_GET["takeaway_name"])) echoMissingData("takeaway_name");
  $takeaway_name = $conn->real_escape_string($_GET["takeaway_name"]);

  $sql = "SELECT takeaway_id, name, address, city FROM takeaways  WHERE takeaway_name LIKE '%$takeaway_name%';";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  $res = array();

  // for each found product
  while ($r = $result->fetch_assoc()) {
    // store information in object array
    $product = array(
      "id" => $r["takeaway_id"],
      "name" => $r["name"],
      "address" => $r["address"],
      "city" => $r["city"]
    );

    // add to list of products
    array_push($res, $product);
  }

  echoResponse($res);
} else {
  echoInvalidMethod();
}

?>