<?php

require_once "../include/dbh.php";
require_once "../include/encrypt.php";
require_once "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // return user info
  require_once "../friend.php";

  if (!isset($_GET["user_id"])) echoMissingData("user_id");
  $user_id = $_GET["user_id"];
  if (!is_numeric($user_id)) echoInvalidData("user_id");

  $sql = "SELECT username, avatar, fullname FROM users WHERE user_id = $user_id;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 1) {
    $r = $result->fetch_assoc();
    $username = $r["username"];
    $avatar = $r["avatar"];
    $fullname = $r["fullname"];

    $friendArr = array();
    fetchUserFriends($friendArr, $user_id);

    $res = array(
      "username" => $username,
      "avatar" => $avatar,
      "fullname" => $fullname,
      "friends" => $friendArr
    );

    echoResponse($res);
  } else {
    echoResponse("did not find user", 400);
  }
} else if ($method == "POST") {
  // update user info
  if (!isset($_POST["fullname"])) echoMissingData("fullname");
  if (!isset($_POST["user_id"])) echoMissingData("user_id");
  $fullname = $conn->real_escape_string($_POST["fullname"]);
  $user_id = $_POST["user_id"];
  if (!is_numeric($user_id)) echoInvalidData("user_id");

  $sql = "UPDATE users SET fullname='$fullname' WHERE user_id = $user_id;";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("updated fullname");
} else if ($method == "PUT") {
  // php does not support body by default for a put request :(
  parse_str(file_get_contents("php://input"), $post_data);

  // verify all parameters have been set
  if (!isset($post_data["username"])) echoMissingData("username");
  if (!isset($post_data["fullname"])) echoMissingData("fullname");
  if (!isset($post_data["password"])) echoMissingData("password");

  // get data
  $username = $conn->real_escape_string($post_data["username"]);
  $fullname = $conn->real_escape_string($post_data["fullname"]);
  $password = $conn->real_escape_string($post_data["password"]);

  $password = encryptPassword($password);

  // add a new user
  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'users' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE users (user_id int(11) NOT NULL AUTO_INCREMENT, username varchar(20) NOT NULL, fullname varchar(30) NOT NULL, password varchar(60) NOT NULL, avatar BLOB, PRIMARY KEY (user_id));";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  $sql = "INSERT INTO users (username, fullname, password) VALUES ('$username', '$fullname', '$password');";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("created user");
} else {
  echoInvalidMethod();
}

?>