<?php

require "../include/dbh.php";
require "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // return product info
  if (!isset($_GET["product_name"])) echoMissingData("product_name");
  $product_name = $conn->real_escape_string($_GET["product_name"]);

  if (isset($_GET["takeaway_id"])) {
    // only search in the given takeaway
    $takeaway = $conn->real_escape_string($_GET["takeaway"]);
    $sql = "SELECT p.product_id, p.takeaway_id, p.name, p.price, t.name AS takeaway_name FROM products p INNER JOIN takeaways t ON p.takeaway_id = t.takeaway_id  WHERE ( p.product_name LIKE '%$product_name%' AND p.takeaway_id = $takeaway_id);";
  } else {
    $sql = "SELECT p.product_id, p.takeaway_id, p.name, p.price, t.name AS takeaway_name FROM products p INNER JOIN takeaways t ON p.takeaway_id = t.takeaway_id  WHERE p.product_name LIKE '%$product_name%';";
  }
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  $res = array();

  // for each found product
  while ($r = $result->fetch_assoc()) {
    // store information in object array
    $product = array(
      "id" => $r["product_id"],
      "takeaway_id" => $r["takeaway_id"],
      "takeaway_name" => $r["takeaway_name"];
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