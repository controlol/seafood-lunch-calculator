<?php

require_once "../include/dbh.php";
require_once "../include/echoResponse.php";
require_once "../include/jwt.php";

$method = $_SERVER["REQUEST_METHOD"];

$uid = verifyJWT();

if ($method == "GET") {
  $sql = "SELECT o.order_id, o.created_by, o.paid_by, o.paid_amount, o.date
          FROM orders o
          INNER JOIN ordered_items i
            ON o.order_id = i.order_id
          WHERE (
            i.ordered_for = $uid OR
            o.created_by = $uid OR
            o.paid_by = $uid
          )
          ORDER BY o.date DESC;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  $res = array();

  while ($r = $result->fetch_assoc()) {
    $order_id = $r["order_id"];

    $res[$order_id] = array(
      "created_by" => $r["created_by"],
      "paid_by" => $r["paid_by"],
      "paid_amount" => $r["paid_amount"],
      "date" => $r["date"],
      "items" => array()
    );

    $sql = "SELECT i.amount, i.ordered_for, p.product_id
            FROM ordered_items i
            INNER JOIN products p
              ON i.product_id = p.product_id
            WHERE i.order_id = $order_id;";
    if (!$products = $conn->query($sql)) echoSQLerror($sql, $conn->error);

    while ($p = $products->fetch_assoc()) {
      $res[$order_id]["items"][$p["ordered_for"]][$p["product_id"]] = $p["amount"];
    }
  }

  echoResponse($res);
} else {
  echoInvalidMethod();
}

?>