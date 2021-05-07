<?php

$key = "4L2UAZbK8aAuBM5UC97ChhvEAcBiw7ah";
$algo = "aes-256-ctr";

$jwtKey = '7Q9$W4A!r4EhRmsdf8AQk!MP2Fm2qnBu';

function encryptPassword($pass) {
  return password_hash($pass, PASSWORD_BCRYPT);
}

function testPassword($pass, $hash) {
  return password_verify($pass, $hash);
}

function encryptData($data, $iv = "") {
  if (strlen($iv) == 0) $iv = bin2hex(random_bytes(8));
  global $algo;
  global $key;

  $encrypted = openssl_encrypt($data, $algo, $key, OPENSSL_RAW_DATA, $iv);

  return $iv . base64_encode($encrypted);
}

function decryptData($hash) {
  $iv = substr($hash, 0, 16);
  $data = base64_decode(substr($hash, 16));
  global $algo;
  global $key;

  return openssl_decrypt($data, $algo, $key, OPENSSL_RAW_DATA, $iv);
}

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

function verifyJWT($jwt) {
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

function getRefreshedJWT($jwt) {
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

?>