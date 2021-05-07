<?php

require_once "../include/dbh.php";
require_once "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // return product info
  $sql = "SELECT takeaway_id, name, address, city FROM takeaways ORDER BY takeaway_id DESC;";
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