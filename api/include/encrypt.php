<?php

$key = "4L2UAZbK8aAuBM5UC97ChhvEAcBiw7ah";
$algo = "aes-256-ctr";

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

?>