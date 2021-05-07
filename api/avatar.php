<?php

require "include/dbh.php";
require "include/echoResponse.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
  if (isset($_GET["user_id"])) {
    // return user avatar
  } else {
    // error, only retrieve one image per request
    echoMissingData("user_id");
  }
} else if ($method == "POST") {
  // set avatar image
  if (!isset($_POST["image"])) echoMissingData("image");
  if (!isset($_POST["user_id"])) echoMissingData("user_id");

  $user_id = $_POST["user_id"];
  $base64data =  $_POST["image"];
  $blobData = base64_decode($base64data);

  if (!is_int($user_id)) echoInvalidData("user_id");

  // create webp data
  $img = new Imagick();

  $img->readimageblob($blobData);
  $img->thumbnailImage(128,128,true);
  $img->setImageFormat('webp');
  $img->setImageCompressionQuality(80);
  $img->setOption('webp:lossless', 'true');
  $resizedBlobData = $img->getImageBlob();

  $escapedBlobdata = mysql_escape_string($resizedBlobData);

  // store resizedBlobData to db
  $sql = "UPDATE users SET avatar='$escapedBlobData' WHERE user_id = $user_id;";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("set avatar");
} else if ($method == "DELETE") {
  // php does not support body by default for a delete request :(
  parse_str(file_get_contents("php://input"), $post_data);

  // delete avatar
  if (!isset($post_data["user_id"])) echoMissingData("user_id");
  $user_id = $post_data["user_id"];
  if (!is_int($user_id)) echoInvalidData("user_id");

  $sql = "UPDATE users SET avatar=NULL WHERE user_id = $user_id;";
  if (!$conn->query($sql)) echoSQLerror($sql, $conn->error);
  echoResponse("deleted avatar");
} else {
  echoInvalidMethod();
}

?>