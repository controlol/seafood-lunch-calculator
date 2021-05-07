<?php

$driver = new mysqli_driver();
$driver->report_mode = MYSQLI_REPORT_ERROR;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$mysqlserver = "SQL_fbcs_nl";
$mysqluser = "fbcs_nl";
$mysqlpass = "763c1a02122f";
$mysqldb = "seafood_PHP";

$conn = new mysqli($mysqlserver, $mysqluser, $mysqlpass, $mysqldb);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    http_response_code(500);
}
?>