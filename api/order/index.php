<?php

require_once "../include/dbh.php";
require_once "../include/echoResponse.php";
require_once "../include/jwt.php";

$method = $_SERVER["REQUEST_METHOD"];

$uid = verifyJWT();

if ($method == "GET") {
  if (!isset($_GET["order_id"])) echoMissingData("order_id");
  $order_id = $_GET["order_id"];
  if (!is_numeric($order_id)) echoInvalidData("order_id");

  $sql = "SELECT order_id, created_by, paid_by, paid_amount, date FROM orders WHERE order_id = $order_id;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 1) {
    $orderInfo = $result->fetch_assoc();

    $order_id = $orderInfo["order_id"];

    $res = array(
      "created_by" => $orderInfo["created_by"],
      "paid_by" => $orderInfo["paid_by"],
      "paid_amount" => $orderInfo["paid_amount"],
      "date" => $orderInfo["date"]
    );

    $sql = "SELECT i.amount, i.ordered_for, p.product_id, p.name AS product_name, p.price, t.name AS takeaway_name
            FROM ordered_items i
            INNER JOIN orders o
              ON i.order_id = o.order_id
            INNER JOIN products p
              ON i.product_id = p.product_id
            INNER JOIN takeaways t
              ON p.takeaway_id = t.takeaway_id
            WHERE i.order_id = $order_id;";
    if (!$products = $conn->query($sql)) echoSQLerror($sql, $conn->error);

    while ($p = $products->fetch_assoc()) {
      $res["order"][$p["ordered_for"]][$p["product_id"]] = array(
        "amount" => $p["amount"],
        // "product_id" => $p["product_id"],
        "price" => $p["price"],
        "product_name" => $p["product_name"],
        "takeaway_name" => $p["takeaway_name"],
      );
    }

    echoResponse($res);
  } else {
    echoResponse("could not find order", 400);
  }
} else if ($method == "POST") {

} else if ($method == "PUT") {
  // insert order here
  // php does not support body by default for a put request :(
  $order = json_decode(file_get_contents("php://input"));

  if (!$order) echoMissingData("order");

  // get highest user_id
  $sql = "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);
  $largest_user_id = $result->fetch_assoc()["user_id"];

  // get highest product_id
  $sql = "SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);
  $largest_product_id = $result->fetch_assoc()["product_id"];

  foreach ($order as $k => $v) {
    if (!is_numeric($k)) echoResponse("user_id " . $k . " is not a number", 400);
    if ($k > $largest_user_id) echoResponse($k . " is not a valid user_id");

    foreach($v as $k2 => $v2) {
      if (!is_numeric($k2)) echoResponse("product_id " . $k2 . " is not a number", 400);
      if (!is_numeric($v2)) echoResponse("amount " . $v2 . " is not a number", 400);

      if ($k2 > $largest_product_id) echoResponse($k2 . " is not a valid product_id");
      if ($v2 < 1 || $v2 > 99) echoResponse($v2 . " is not a valid amount");
    }
    // to prevent errors, scopes in php are weird
    unset($k2, $v2);
  }
  // to prevent errors, scopes in php are weird
  unset($k, $v);

  // check if orders table exists if not create one
  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'orders' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE orders
            (
              order_id int(11) NOT NULL AUTO_INCREMENT,
              created_by int(11) NOT NULL,
              paid_by int(11) NOT NULL,
              paid_amount int(5) UNSIGNED DEFAULT 0,
              date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              PRIMARY KEY (order_id),
              FOREIGN KEY (created_by) REFERENCES users(user_id),
              FOREIGN KEY (paid_by) REFERENCES users(user_id)
            );";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  // check if ordered_products table exists if not create one
  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'ordered_items' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE ordered_items
            (
              order_id int(11) NOT NULL,
              ordered_for int(11) NOT NULL,
              product_id int(11) NOT NULL,
              amount int(2) UNSIGNED NOT NULL,
              UNIQUE (order_id, ordered_for, product_id),
              FOREIGN KEY (order_id) REFERENCES orders(order_id),
              FOREIGN KEY (ordered_for) REFERENCES users(user_id),
              FOREIGN KEY (product_id) REFERENCES products(product_id)
            );";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  // create initial order
  $sql = "INSERT INTO orders (created_by, paid_by) VALUES ($uid, $uid) RETURNING order_id;";
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

  echoResponse(array("order_id" => $order_id));
  // verify required data
  // check table exists
  // json decode ordered products
  // create order
  // insert each ordered product

} else {
  echoInvalidMethod();
}

?>