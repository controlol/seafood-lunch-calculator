<?php

require_once "../include/dbh.php";
require_once "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // return products
  $sql = "SELECT p.product_id, p.takeaway_id, p.name, p.price, t.name AS takeaway_name FROM products p INNER JOIN takeaways t ON p.takeaway_id = t.takeaway_id ORDER BY p.product_id DESC;"; // add paging, maybe using name > $_GET["lastProductName"]
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  $res = array();

  // for each found product
  while ($r = $result->fetch_assoc()) {
    // store information in object array
    $product = array(
      "id" => $r["product_id"],
      "takeaway_id" => $r["takeaway_id"],
      "takeaway_name" => $r["takeaway_name"],
      "name" => $r["name"],
      "price" => $r["price"]
    );

    // add to list of products
    array_push($res, $product);
  }

  echoResponse($res);
} else {
  echoInvalidMethod();
}

?>