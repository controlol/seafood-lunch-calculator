<?php

require_once "../include/dbh.php";
require_once "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // return user info
  if (!isset($_GET["username"])) echoMissingData("username");
  $username = $conn->real_escape_string($_GET["username"]);

  $sql = "SELECT * FROM users WHERE username LIKE '%$username%';";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  $res = array();

  while ($r = $result->fetch_assoc()) {
    // store info in object array
    $user = array(
      "username" => $r["username"],
      "avatar" => $r["avatar"],
      "fullname" => $r["fullname"],
      "id" => $r["user_id"]
    );

    // add to list of users
    array_push($res, $user);
  }

  echoResponse($res);
} else {
  echoInvalidMethod();
}

?>