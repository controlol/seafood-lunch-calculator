<?php

require_once "encrypt.php";
require_once "echoResponse.php";

$jwtKey = '7Q9$W4A!r4EhRmsdf8AQk!MP2Fm2qnBu';

/**
 * @param uid id of the user
 * @param validTime valid time in seconds, 15 minutes by default
 * @param refreshable boolean
 */
function createJWT($uid, $validTime = 60 * 15, $refreshable = false) {
  $datenow = time();
  global $jwtKey;

  $data = array(
    "date" => $datenow,
    "validTime" => $validTime,
    "user_id" => $uid,
    "jwtKey" => $jwtKey,
    "refreshable" => $refreshable
  );

  return encryptData(json_encode($data));
}

function verifyJWT() {
  $jwt = getJWTfromHeader();
  $d = json_decode(decryptData($jwt), true);
  global $jwtKey;

  if (!$d) return false;

  $date = $d["date"];
  $validTime = $d["validTime"];
  $uid = $d["user_id"];
  $dJwtKey = $d["jwtKey"];

  if ($dJwtKey !== $jwtKey) return false;
  if ($date + $validTime < time()) return false;
  return $uid;
}

function getRefreshedJWT() {
  $jwt = getJWTfromHeader();
  $d = json_decode(decryptData($jwt), true);
  global $jwtKey;

  if (!$d) return false;

  $date = $d["date"];
  $validTime = $d["validTime"];
  $uid = $d["user_id"];
  $dJwtKey = $d["jwtKey"];
  $refreshable = $d["refreshable"];

  if ($dJwtKey !== $jwtKey) return false;
  if ($date + $validTime < time()) return false;

  if (!$refreshable) return false;
  return createJWT($uid);
}

function getJWTfromHeader() {
  if (!isset($_SERVER["HTTP_AUTHORIZATION"])) echoMissingHeader("Authorization");
  $recjwt = $_SERVER["HTTP_AUTHORIZATION"];

  if (!preg_match('/^Bearer /', $recjwt)) echoResponse("Authorization is not bearer", 400);

  return explode(" ", $recjwt)[1];
}

?>