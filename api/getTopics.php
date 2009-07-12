<?php
// Include required external sources

$search_server = 'http://sq.sharethis.com/';

$errors     = FALSE;
$response   = array("status"=>"FAILURE", "statusMessage" => "GET_SEARCH_RESULTS_SERVICE_FAILED");

$domain     = isset($_REQUEST["domain"]) ? $_REQUEST["domain"] : "";
$period     = isset($_REQUEST["period"]) ? $_REQUEST["period"] : "";
$topic     = isset($_REQUEST["topic"]) ? $_REQUEST["topic"] : "";
$return     = isset($_REQUEST["return"]) ? strtolower($_REQUEST["return"]) : "json";
$callback   = isset($_REQUEST["callback"]) ? $_REQUEST["callback"] : "";

try {
	$search_url = $search_server . '?domain=' . $domain . '&period=' . $period . '&topic=' . $topic;

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $search_url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 2);
	$return_str = curl_exec($curl);
	$info = curl_getinfo($curl);
	curl_close($curl);

	echo $return_str;

}
catch( Exception $e ) {
	throw $e;
}




?>
