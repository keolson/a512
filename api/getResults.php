<?php

$items =  array(
				array( 'num' => 1, 'title' => 'Infomercial King Billy Mays Found Dead in his home', 'views' => 745, 'shares' => 185, 'services' => 'facebook,email,friendfeed' ),
				array( 'num' => 2, 'title' => 'Critics Cringe at Ad for Burger King\'s Latest Sandwich', 'views' => 10, 'shares' => 50, 'services' => 'email,reddit,facebook' ),
				array( 'num' => 3, 'title' => 'Court Rules for White Firefighters in Discrimination Case', 'views' => 5, 'shares' => 200, 'services' => 'facebook,digg,reddit' ),
				array( 'num' => 4, 'title' => 'Obama Proposes More Training For The Unemployed', 'views' => 800, 'shares' => 1000, 'services' => 'email,digg,reddit' ),
				array( 'num' => 5, 'title' => 'Infomercial King Billy Mays Found Dead in his home', 'views' => 745, 'shares' => 185, 'services' => 'facebook,email,friendfeed' ),
				array( 'num' => 6, 'title' => 'Critics Cringe at Ad for Burger King\'s Latest Sandwich', 'views' => 10, 'shares' => 50, 'services' => 'email,reddit,facebook' ),
				array( 'num' => 7, 'title' => 'Court Rules for White Firefighters in Discrimination Case', 'views' => 5, 'shares' => 200, 'services' => 'facebook,digg,reddit' ),
				array( 'num' => 8, 'title' => 'Obama Proposes More Training For The Unemployed', 'views' => 800, 'shares' => 1000, 'services' => 'email,digg,reddit' ),
				);


$results = array( 'count' => count($items),
				  'items' => $items,
				 );

echo json_encode($results);
?>