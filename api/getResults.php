<?php

$items =  array(
				array( 'url' => 'foo', 'title' => 'Infomercial King Billy Mays Found Dead in his home', 'views' => 745, 'shares' => 185, 'services' => 'facebook,email,friendfeed' ),
				array( 'url' => 'foo', 'title' => 'Critics Cringe at Ad for Burger King\'s Latest Sandwich', 'views' => 10, 'shares' => 50, 'services' => 'email,reddit,facebook' ),
				array( 'url' => 'foo', 'title' => 'Court Rules for White Firefighters in Discrimination Case', 'views' => 5, 'shares' => 200, 'services' => 'facebook,digg,reddit' ),
				array( 'url' => 'foo', 'title' => 'Obama Proposes More Training For The Unemployed', 'views' => 800, 'shares' => 1000, 'services' => 'email,digg,reddit' ),
				array( 'url' => 'foo', 'title' => 'Muslims perform Friday prayer across Xinjiang', 'views' => 745, 'shares' => 185, 'services' => 'facebook,email,friendfeed' ),
				array( 'url' => 'foo', 'title' => 'Obama on first sub-Saharan trip', 'views' => 10, 'shares' => 50, 'services' => 'email,reddit,facebook' ),
				array( 'url' => 'foo', 'title' => 'G-8 pledges $20 billion to fight world hunger after appeal from Obama', 'views' => 5, 'shares' => 200, 'services' => 'facebook,digg,reddit' ),
				array( 'url' => 'foo', 'title' => 'Redwood City falls in Juniors championship', 'views' => 800, 'shares' => 1000, 'services' => 'email,digg,reddit' ),
				array( 'url' => 'foo', 'title' => 'Court Rules for White Firefighters in Discrimination Case', 'views' => 5, 'shares' => 200, 'services' => 'facebook,digg,reddit' ),
				array( 'url' => 'foo', 'title' => 'Obama Proposes More Training For The Unemployed', 'views' => 800, 'shares' => 1000, 'services' => 'email,digg,reddit' ),
				
				);


$results = array( 'url_count' => count($items),
				  'urls' => $items,
				 );

echo json_encode($results);
?>