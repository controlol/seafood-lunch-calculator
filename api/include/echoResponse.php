<?php

function echoResponse($data, $http_status = 200) {
  global $conn;
  $conn->close();

  http_response_code($http_status);

  if (is_array($data)) echo json_encode($data);
  else if ($http_status >= 200 && $http_status < 300) echo json_encode(array("success" => $data));
  else echo json_encode(array("error" => $data));

  die();
}

function echoInvalidMethod() {
  global $conn;
  $conn->close();

  http_response_code(400);

  echo json_encode(array("error" => "invalid request method"));
  die();
}

function echoMissingData($dataname) {
  global $conn;
  $conn->close();

  http_response_code(400);

  echo json_encode(array("error" => "missing " . $dataname));
  die();
}

function echoMissingHeader($dataname) {
  global $conn;
  $conn->close();

  http_response_code(400);

  echo json_encode(array("error" => "missing header " . $dataname));
  die();
}

function echoInvalidData($dataname) {
  global $conn;
  $conn->close();

  http_response_code(400);

  echo json_encode(array("error" => "invalid " . $dataname));
  die();
}

function echoSQLerror($sql, $error) {
  global $conn;
  $conn->close();

  http_response_code(500);

  echo json_encode(array("statement" => $sql, "error" => $error));
  die();
}

function echoNoResult($table) {
  global $conn;
  $conn->close();

  http_response_code(404);

  echo json_encode(array("error" => "no result in " . $table));
}

?>