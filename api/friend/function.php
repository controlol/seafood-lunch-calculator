<?php

function fetchUserFriends(&$arr, $uid) {
  global $conn;
  // first get friends in one direction
  $sql = "SELECT u.user_id, u.avatar, u.username FROM friends f INNER JOIN users u ON f.user_id2 = u.user_id WHERE user_id1 = $uid;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  appendUserInfo($arr, $result, $uid);
}

function appendUserInfo(&$arr, $rows, $uid) {
  while ($r = $rows->fetch_assoc()) {
    global $conn;
    $user_id = $r["user_id"];

    // check if both users added each other
    $sql = "SELECT user_id1 FROM friends WHERE ( user_id1 = $user_id AND user_id2 = $uid );";
    if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);
    $pending = $result->num_rows == 1 ? false : true;

    $avatar = $r["avatar"];
    $username = $r["username"];
    array_push($arr, array("id" => $user_id, "avatar" => base64_encode($avatar), "username" => $username, "pending" => $pending));
  }
}

?>