<?php

require "../include/dbh.php";
require "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // return user info
  if (!isset($_GET["takeaway_id"])) echoMissingData("takeaway_id");
  $takeaway_id = $conn->real_escape_string($_GET["takeaway_id"]);

  $sql = "SELECT name, address, city, postalcode, website, telephone  FROM takeaways WHERE takeaway_id = $takeaway_id;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 1) {
    $r = $result->fetch_assoc();

    $res = array(
      "name" => $r["name"],
      "address" => $r["address"],
      "city" => $r["city"],
      "postalcode" => $r["postalcode"],
      "website" => $r["website"],
      "telephone" => $r["telephone"]
    );

    echoResponse($res);
  } else {
    echoResponse("did not find takeaway", 400);
  }
} else if ($method == "POST") {
  // update user info
  if (!isset($_POST["takeaway_id"])) echoMissingData("takeaway_id");
  $takeaway_id = $_POST["takeaway_id"];
  if (!is_int($takeaway_id)) echoInvalidData("takeaway_id");

  $sql = "SELECT * FROM takeaways WHERE takeaway_id = $takeaway_id;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 1) {
    $r = $result->fetch_assoc();

    $name = "";
    $address = "";
    $city = "";
    $postalcode = "";
    $website = "";
    $telephone = "";

    if (isset($_POST["name"])) $name = $conn->real_escape_string($_POST["name"]);
    else $name = $r["name"];

    if (isset($_POST["address"])) $address = $conn->real_escape_string($_POST["address"]);
    else $address = $r["address"];

    if (isset($_POST["city"])) $city = $conn->real_escape_string($_POST["city"]);
    else $city = $r["city"];

    if (isset($_POST["postalcode"])) $postalcode = $conn->real_escape_string($_POST["postalcode"]);
    else $postalcode = $r["postalcode"];

    if (isset($_POST["website"])) $website = $conn->real_escape_string($_POST["website"]);
    else $website = $r["website"];

    if (isset($_POST["telephone"])) $telephone = $conn->real_escape_string($_POST["telephone"]);
    else $telephone = $r["telephone"];

    verifyAndFormatTakeawayData($name, $address, $city, $postalcode, $website, $telephone);

    $sql = "UPDATE takeaways SET name='$name', address='$address', city='$city', postalcode='$postalcode' WHERE takeaway_id = $takeaway_id;";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
    echoResponse("updated takeaway details");
  } else {
    echoResponse("could not find product", 400);
  }
} else if ($method == "PUT") {
  // php does not support body by default for a put request :(
  parse_str(file_get_contents("php://input"), $post_data);

  // verify all parameters have been set
  if (!isset($post_data["name"])) echoMissingData("name");
  if (!isset($post_data["address"])) echoMissingData("address");
  if (!isset($post_data["city"])) echoMissingData("city");
  if (!isset($post_data["postalcode"])) echoMissingData("postalcode");
  if (!isset($post_data["website"])) echoMissingData("website");
  if (!isset($post_data["telephone"])) echoMissingData("telephone");

  // get data
  $name = $conn->real_escape_string($post_data["name"]);
  $address = $conn->real_escape_string($post_data["address"]);
  $city = $conn->real_escape_string($post_data["city"]);
  $postalcode = $conn->real_escape_string($post_data["postalcode"]);
  $website = $conn->real_escape_string($post_data["website"]);
  $telephone = $post_data["telephone"];

  verifyAndFormatTakeawayData($name, $address, $city, $postalcode, $website, $telephone);

  // add a new product
  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'takeaways' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE takeaways (takeaway_id int(11) NOT NULL AUTO_INCREMENT, name varchar(64) NOT NULL, address varchar(64) NOT NULL, city varchar(32) NOT NULL, postalcode varchar(6) NOT NULL, website varchar(128) NOT NULL, telephone varchar(11) NOT NULL, PRIMARY KEY (takeaway_id));";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  $sql = "INSERT INTO takeaways (name, address, city, postalcode, website, telephone) VALUES ('$name', '$address', '$city', '$postalcode', '$website', '$telephone');";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("created product");
} else {
  echoInvalidMethod();
}

/**
 * modify data to correct format and verify the data has correct regex
 */
function verifyAndFormatTakeawayData($name, $address, $city, $postalcode, $website, $telephone) {
  // lower case variables
  $name = strtolower($name);
  $address = strtolower($address);
  $city = strtolower($city);
  $website = strtolower($website);

  // upper case letters postalcode
  $postalcode = strtoupper($postalcode);
  // remove space(s) from postalcode
  if (strlen($postalcode) > 6) preg_replace(' ', '', $postalcode);

  // verify valid regex
  if (!preg_match('/^[a-z ]+$/', $name)) echoInvalidData("name");
  if (!preg_match('/^[a-z ]+ [0-9]+$/', $address)) echoInvalidData("address");
  if (!preg_match('/^[a-z ]+$/', $city)) echoInvalidData("city");
  if (!preg_match('/^[0-9]{4}[A-Z]{2}$/', $postalcode)) echoInvalidData("postalcode");
  if (!preg_match('/^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)*[a-z0-9|-]{2,62}\.[a-z]{2,8}$/', $website)) echoInvalidData("website");

  if (!is_int($telephone)) echoInvalidData("telephone");

  // uppercase first letter of each word
  $name = ucwords($name);
  $address = ucwords($address);
  $city = ucwords($city);
}

?>