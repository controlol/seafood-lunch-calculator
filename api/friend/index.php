<?php

require_once "include/dbh.php";
require_once "include/echoResponse.php";
require_once "function.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  // if (!isset($_GET["user_id"])) echoMissingData("user_id");
  // $user_id = $_GET["user_id"];
  // temporary userid will become the jwt later
  $user_id = 2;
  if (!is_numeric($user_id));
  $friend_arr = array();

  // return friends from user
  fetchUserFriends($friend_arr, $user_id);

  echoResponse($friend_arr);
} else if ($method == "PUT") {
  // php does not support body by default for a put request :(
  parse_str(file_get_contents("php://input"), $post_data);

  // add friend
  // verify all params were set
  if (!isset($post_data["user_id1"])) echoMissingData("user_id1");
  if (!isset($post_data["user_id2"])) echoMissingData("user_id2");

  // get data
  $user_id1 = $post_data["user_id1"]; // this should always be the user adding the other user
  $user_id2 = $post_data["user_id2"];

  // validate data
  if (!is_numeric($user_id1)) echoInvalidData("user_id1");
  if (!is_numeric($user_id2)) echoInvalidData("user_id2");

  $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME = 'friends' AND TABLE_SCHEMA LIKE '$mysqldb');";
  $result = $conn->query($sql);
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);

  if ($result->num_rows == 0) {
    $sql = "CREATE TABLE friends
            (
              user_id1 int(11) NOT NULL,
              user_id2 int(11) NOT NULL,
              UNIQUE (user_id1, user_id2),
              FOREIGN KEY (user_id1) REFERENCES users(user_id),
              FOREIGN KEY (user_id2) REFERENCES users(user_id)
            );";
    if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  }

  $sql = "INSERT INTO friends (user_id1, user_id2) VALUES ('$user_id1', '$user_id2');";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("added friend");
} else if ($method == "DELETE") {
  // php does not support body by default for a delete request :(
  parse_str(file_get_contents("php://input"), $post_data);

  if (!isset($post_data["user_id1"])) echoMissingData("user_id1");
  if (!isset($post_data["user_id2"])) echoMissingData("user_id2");

  // delete friend
  $user_id1 = $post_data["user_id1"];
  $user_id2 = $post_data["user_id2"];

  if (!is_numeric($user_id1)) echoInvalidData("user_id1");
  if (!is_numeric($user_id2)) echoInvalidData("user_id2");

  $sql =
  "DELETE FROM friends WHERE ".
  "( ".
    "( ".
      "user_id1 = $user_id1 AND ".
      "user_id2 = $user_id2 ".
    ") OR ( ".
      "user_id1 = $user_id2 AND ".
      "user_id2 = $user_id1 ".
    ") ".
  ")";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("deleted friend");
} else {
  echoInvalidMethod();
}

?>