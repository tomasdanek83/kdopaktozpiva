<?php

function callAPI($method, $url, $data){
   $curl = curl_init();
   switch ($method){
      case "POST":
         curl_setopt($curl, CURLOPT_POST, 1);
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
         break;
      case "PUT":
         curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
         if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);			 					
         break;
      default:
         if ($data)
            $url = sprintf("%s?%s", $url, http_build_query($data));
   }
   // OPTIONS:
   curl_setopt($curl, CURLOPT_URL, $url);
   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
      'APIKEY: 111111111111111111111',
      'Content-Type: application/json',
   ));
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
   // EXECUTE:
   $result = curl_exec($curl);
   if(!$result){die("Connection Failure");}
   curl_close($curl);
   return $result;
}

switch($_SERVER['REQUEST_METHOD']){
    case("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("GET"): //Post data;
        header("Access-Control-Allow-Origin: *");

        $name = str_replace(" ", "+", $_GET["name"]);
        $type = $_GET["type"];
        $page = $_GET["page"];

        $query = "$name";
        //$query = "$name+area:europe";

        if($type && $type != "all") {
          $query = $query."+type:$type";
        } 

        $url = "https://www.xeno-canto.org/api/2/recordings?query=$query&page=$page";

        $get_data = callAPI('GET', $url, false);

        echo $get_data;

        break;
    default: //Reject any non GET or OPTIONS requests.
        header("Allow: GET", true, 405);
        exit;
}

?>