<?php

require_once "../include/dbh.php";
require_once "../include/echoResponse.php";
require_once "../include/jwt.php";

$method = $_SERVER["REQUEST_METHOD"];

// get the uid :) and verify JWT
// $uid = verifyJWT();

if ($method == "GET") {

} else if ($method == "POST") {

} else if ($method == "PUT") {
  // insert order here
  // php does not support body by default for a put request :(
  parse_str(file_get_contents("php://input"), $post_data);
  // temporarily set a uid for testing
  if (!$uid) $uid = 1;

  if (!isset($post_data["order"])) echeMissingData("order");

  $order = json_decode($post_data["order"], true);

  if (!$order) echoInvalidData("order");

  // get highest user_id
  $sql = "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);
  $largest_user_id = $result->fetch_assoc()["user_id"];

  // get highest product_id
  $sql = "SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);
  $largest_product_id = $result->fetch_assoc()["product_id"];

  // verify order array
  foreach ($order as $k => $v) {
    if (!is_numeric($k)) echoResponse($k . " is not a number", 400);
    if ($k > $largest_user_id) echoResponse($k . " is not a valid user_id");

    foreach ($v as $vv) {
      $pid = $vv["product_id"];
      $amount = $vv["amount"];
      if (!is_numeric($pid)) echoResponse($pid . " is not a number", 400);
      if (!is_numeric($amount)) echoResponse($amount . " is not a number", 400);

      if ($pid > $largest_product_id) echoResponse($pid . " is not a valid product_id");
      if ($amount < 1 || $amount > 99) echoResponse($amount . " is not a valid amount");
    }
    // to prevent errors, scopes in php are weird
    unset($vv);
  }
  // to prevent errors, scopes in php are weird
  unset($k, $v);

  // check if orders table exists if not create one
  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'orders' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE orders (order_id int(11) NOT NULL AUTO_INCREMENT, created_by int(11) NOT NULL, paid_by int(11) NOT NULL, paid_amount int(5) UNSIGNED NOT NULL, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (order_id));";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  // check if ordered_products table exists if not create one
  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'ordered_items' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE ordered_items (order_id int(11) NOT NULL, ordered_for int(11) NOT NULL, product_id int(11) NOT NULL, amount int(2) UNSIGNED NOT NULL, PRIMARY KEY (order_id, ordered_by, product_id));";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  // create initial order
  $sql = "INSERT INTO orders (ordered_by, paid_by) VALUES ($uid, $uid) RETURNING order_id;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  $order_id = $result->fetch_assoc()["order_id"];

  foreach ($order as $k => $v) {
    // $k == $ordered_by
    // $v == { product_id: amount }
    foreach($v as $k2 => $v2) {
      $sql = "INSERT INTO ordered_items (order_id, ordered_for, product_id, amount) VALUES ('$order_id', '$k', '$k2', '$v2');";
      if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
    }
    unset($k2, $v2);
  }

  echoResponse("craeted order");
  // verify required data
  // check table exists
  // json decode ordered products
  // create order
  // insert each ordered product

} else {
  echoInvalidMethod();
}

?>