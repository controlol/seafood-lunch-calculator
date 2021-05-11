<?php


/*
{
  friend: [...user_id],
  outgoing: [...user_id],
  incoming: [...user_id]
}
*/
function fetchUserFriends(&$arr, $uid) {
  global $conn;

  $arr["friend"] = array();
  $arr["outgoing"] = array();
  $arr["incoming"] = array();

  // first get friends in one direction
  getOutgoingFriends($arr["outgoing"], $uid);
  getIncomingFriends($arr, $uid);
}

function getOutgoingFriends(&$arr, $uid) {
  global $conn;

  $sql = "SELECT u.user_id, u.avatar, u.username FROM friends f INNER JOIN users u ON f.user_id2 = u.user_id WHERE user_id1 = $uid;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);
  
  while ($r = $result->fetch_assoc()) {
    $user_id = $r["user_id"];

    $avatar = $r["avatar"];
    $username = $r["username"];
    $arr[$user_id] = array("username" => $username, "avatar" => base64_encode($avatar));
  }
}

function getIncomingFriends(&$arr, $uid) {
  global $conn;

  $sql = "SELECT u.user_id, u.avatar, u.username FROM friends f INNER JOIN users u ON f.user_id1 = u.user_id WHERE user_id2 = $uid;";
  if (!$result = $conn->query($sql)) echoSQLerror($sql, $conn->error);

  while ($r = $result->fetch_assoc()) {
    $user_id = $r["user_id"];

    if (isset($arr["outgoing"][$user_id])) {
      $arr["friend"][$user_id] = $arr["outgoing"][$user_id];
      unset($arr["outgoing"][$user_id]);
    } else {
      $avatar = $r["avatar"];
      $username = $r["username"];
      $arr["incoming"][$user_id] = array("username" => $username, "avatar" => base64_encode($avatar));
    }
  }
}

?>