<?php
  header('Content-Type: application/json');

  $url = $_POST['url'];

  $json = file_get_contents('https://na.api.pvp.net/'.$url.'api_key=43cfb514-7731-42ba-82ea-2fa49348bd17');

  $obj = json_decode($json);
  echo json_encode($obj, JSON_PRETTY_PRINT);
?>
