<?php

require "../include/dbh.php";
require "../include/encrypt.php";
require "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  if (!isset($_SERVER["HTTP_AUTHORIZATION"])) echoMissingHeader("Authorization");
  $recjwt = $_SERVER["HTTP_AUTHORIZATION"];

  if (!preg_match('/^Bearer /', $recjwt)) echoResponse("Authorization is not bearer", 400);

  $recjwt = explode(" ", $recjwt)[1];

  if (!verifyJWT($recjwt)) echoResponse("invalid token", 401);
  echoResponse("valid token");
} else {
  echoInvalidMethod();
}

?>