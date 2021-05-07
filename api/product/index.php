<?php

require_once "../include/dbh.php";
require_once "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

// to reindex the table
// SET @newid=0;
// UPDATE products SET product_id=(@newid:=@newid+1) ORDER BY product_id;

if ($method == "GET") {
  // return user info
  if (!isset($_GET["product_id"])) echoMissingData("product_id");
  $product_id = $conn->real_escape_string($_GET["product_id"]);

  $sql = "SELECT p.takeaway_id, p.name, p.price, t.name AS takeaway_name FROM products p INNER JOIN takeaways t ON p.takeaway_id = t.takeaway_id WHERE product_id = $product_id;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 1) {
    $r = $result->fetch_assoc();

    $res = array(
      "name" => $r["name"],
      "price" => $r["price"],
      "takeaway_id" => $r["takeaway_id"],
      "takeaway_name" => $r["takeaway_name"]
    );

    echoResponse($res);
  } else {
    echoResponse("did not find product", 400);
  }
} else if ($method == "POST") {
  // update user info
  if (!isset($_POST["product_id"])) echoMissingData("product_id");
  $product_id = $_POST["product_id"];
  if (!is_numeric($product_id)) echoInvalidData("product_id");

  $sql = "SELECT * FROM products WHERE product_id = $product_id;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 1) {
    $r = $result->fetch_assoc();

    $name = "";
    $takeaway_id = "";
    $price = "";

    if (isset($_POST["name"])) $name = $conn->real_escape_string($_POST["name"]);
    else $name = $r["name"];

    if (isset($_POST["takeaway_id"])) $takeaway_id = $_POST["takeaway_id"];
    else $takeaway_id = $r["takeaway_id"];

    if (isset($_POST["price"])) $price = $_POST["price"];
    else $price = $r["price"];

    verifyAndFormatProductData($takeaway_id, $name, $price);

    $sql = "UPDATE products SET name='$name', takeaway_id=$takeaway_id, price=$price WHERE product_id = $product_id;";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
    echoResponse("updated product details");
  } else {
    echoResponse("could not find product", 400);
  }

} else if ($method == "PUT") {
  // php does not support body by default for a put request :(
  parse_str(file_get_contents("php://input"), $post_data);

  // verify all parameters have been set
  if (!isset($post_data["takeaway_id"])) echoMissingData("takeaway_id");
  if (!isset($post_data["name"])) echoMissingData("name");
  if (!isset($post_data["price"])) echoMissingData("price");

  // get data
  $takeaway_id = $post_data["takeaway_id"];
  $name = $conn->real_escape_string($post_data["name"]);
  $price = $post_data["price"];

  $price = preg_replace('/\D/', '', $price);

  verifyAndFormatProductData($takeaway_id, $name, $price);

  // add a new product
  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'products' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE products (product_id int(11) NOT NULL AUTO_INCREMENT, takeaway_id int(11) NOT NULL, name varchar(64) NOT NULL, price int(4) UNSIGNED NOT NULL, avatar BLOB, PRIMARY KEY (product_id));";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  $sql = "INSERT INTO products (takeaway_id, name, price) VALUES ($takeaway_id, '$name', $price);";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("created product");
} else {
  echoInvalidMethod();
}

function verifyAndFormatProductData(&$takeaway_id, &$name, &$price) {
  $name = strtolower($name);

  // if (!preg_match('/^[a-z/ ]+$/', $name)) echoInvalidData("name"); ? ^[a-z/\-\\&() ]+$

  if (!is_numeric($takeaway_id)) echoInvalidData("takeaway_id");
  if (!is_numeric($price)) echoInvalidData("price");

  $name = ucwords($name);
}

?>