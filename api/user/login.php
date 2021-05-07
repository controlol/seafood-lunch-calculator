<?php

require_once "../include/dbh.php";
require_once "../include/jwt.php";
require_once "../include/encrypt.php";
require_once "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") {
  if (!isset($_POST["username"])) echoMissingData("username");
  if (!isset($_POST["password"])) echoMissingData("password");

  $username = $conn->real_escape_string($_POST["username"]);
  $password = $conn->real_escape_string($_POST["password"]);

  $sql = "SELECT password, user_id FROM users WHERE username LIKE '$username'";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 1) {
    $r = $result->fetch_assoc();
    $hash = $r["password"];

    if (testPassword($password, $hash)) {
      $uid = $r["user_id"];

      $token = createJWT($uid);
      $refreshToken = createJWT($uid, 60 * 60 * 24 * 30, true); // valid 30 days and refreshable

      $tokens = array(
        "token" => $token,
        "refreshToken" => $refreshToken
      );

      echoResponse($tokens);
    } else {
      echoResponse("invalid password", 401);
    }
  } else {
    echoResponse("could not find user", 400);
  }
} else {
  echoInvalidMethod();
}

?>