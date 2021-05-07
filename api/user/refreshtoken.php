<?php

require_once "../include/dbh.php";
require_once "../include/jwt.php";
require_once "../include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  if (!$newjwt = getRefreshedJWT()) echoResponse("invalid token", 401);
  echoResponse(array("token" => $newjwt));
} else {
  echoInvalidMethod();
}

?>