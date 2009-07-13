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

	$results =  json_decode($return_str,true);

	foreach ( $results['urls'] as $key => $url ) {
		$results['urls'][$key]['services'] = convertServices( $url['dest_bits'] );
	}

	print_r($results['urls']);
}
catch( Exception $e ) {
	throw $e;
}

function convertServices($bitstr) {
	$dests = array (
					'email' => 0,
					'facebook' => 1,
					'twitter' => 2,
					'myspace' => 3,
					'digg' => 4,
					'live' => 5,
					'delicious' => 6,
					'reddit' => 7,
					'stumbleupon' => 8,
					'google' => 9,
					'sms' => 10,
					'linkedin' => 11,
					'buzz' => 12,
					'yahoo' => 13,
					);

	$services = "";
	foreach( $dests as $key => $value ){
		$bit_pos = $value;
		$mask = 1 << $bit_pos;
		if( $bitstr & $mask ){
			if( $services == "" ){
				$services = $key;
			} else {
				$services .= ',' . $key;
			}
			
		}
	}
	
	return $services;
}



?>
