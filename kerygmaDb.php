<?php

	//require 'startSession.php';
	
	$server = 'localhost'; //Server name
	$user = 'root'; //User
	$password = ''; //Pass
	$db = 'kerygma'; //Database

	$conn = new mysqli($server, $user, $password, $db); //Connect
//utf8_encode() // Don't forget this one... :)

if ( isset( $_POST['checkConn'] ) &&  $conn -> connect_errno ) { 
	echo true;
}
else {

	$conn -> set_charset('utf8'); //Allow spanish accents in query and other utf8 characters

	/* Get table names */
	$getTablesSql = ' SELECT table_name FROM information_schema.tables WHERE table_schema = "kerygma" '; 
	$getTablesQuery = $conn -> query($getTablesSql);
	$tables = array();

		if ( $getTablesQuery )  {

			while( $row = $getTablesQuery -> fetch_assoc() ) {
				array_push( $tables , $row['table_name'] );
			}

		}

	/* Get table names which Primary Key is : CI */
	$ciTables = array();

	foreach ($tables as $key => $table) {
		$getTablesSql = ' SELECT COUNT(*) FROM information_schema.columns WHERE table_name = "' . $table . '" AND COLUMN_NAME = "CI" '; 
		$getTablesQuery = $conn -> query($getTablesSql);

			if ( $getTablesQuery )  {

			while( $row = $getTablesQuery -> fetch_assoc() ) {
				if ( $row['COUNT(*)'] == 1 ) {
					array_push($ciTables , $table);
				}
			}

		}

	}	

	/* Get table names which Primary Key is : Código */
	$codeTables = array();

	foreach ($tables as $key => $table) {
		$getTablesSql = ' SELECT COUNT(*) FROM information_schema.columns WHERE table_name = "' . $table . '" AND COLUMN_NAME = "Código" '; 
		$getTablesQuery = $conn -> query($getTablesSql);

			if ( $getTablesQuery )  {

			while( $row = $getTablesQuery -> fetch_assoc() ) {
				if ( $row['COUNT(*)'] == 1 ) {
					array_push($codeTables , $table);
				}
			}

		}

	}	



/* SELECT (SELECT COUNT(*) FROM tabla_samuel) AS 'Total',  (SELECT COUNT(*) FROM tabla_samuel WHERE Sexo = 'Masculino') AS 'Men', (SELECT COUNT(*) FROM tabla_samuel WHERE Sexo = 'Femenino') AS 'Women' */

/* Start of dedicated functions space */

function getTableKeys( $table , $conn ) {
	$getKeysSql = 'SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = ' . '"' . $table . '"';

	$clubKeys = array();

		$keyRequest = $conn -> query($getKeysSql);

			if ($keyRequest) {

				while( $row = $keyRequest -> fetch_assoc() ) {
					array_push($clubKeys , $row['COLUMN_NAME']);
				}

				return $clubKeys;
				//return $getKeysSql;
			}
			else {
				return 'Fail getting table keys...';
			}
}

function checkRepeatedId ($id , $conn ) {
	$sql = 'SELECT SUM( ( SELECT COUNT(*) FROM tabla_david WHERE Código = ' . $id . ' ) + ( SELECT COUNT(*) FROM tabla_juan WHERE CI = ' . $id . ' ) + (SELECT COUNT(*) FROM tabla_josué WHERE CI = ' . $id . ') + (SELECT COUNT(*) FROM tabla_job WHERE CI = ' . $id . ') + (SELECT COUNT(*) FROM tabla_daniel WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_timoteo WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_noé WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_directiva WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_mentores WHERE CI = ' . $id . ') ) AS "Count" ';
	$query = $conn -> query($sql);

		if ($query) {
			while ( $row = $query -> fetch_assoc() ) {
				return $row['Count']; // Return count
			}
		}
		else {
			return 'Error checking id , Query failed.'; // Return string response if query fails
		}
}

/* End of dedicated functions space */

/* Output Stuff */

	if ( isset( $_POST['clubName'] ) ) {
		if (  $_POST['clubName'] === 'Moises' ||  $_POST['clubName'] === 'Samuel' || $_POST['clubName'] === 'David' || $_POST['clubName'] === 'José') {
						// //
			$club = 'tabla_' . mb_strtolower($_POST['clubName'], 'UTF-8');
			$sql = 'SELECT Nombres, Apellidos, Edad, Representante, Código FROM ' . $club . ' ORDER BY Nombres';
			$result = $conn -> query($sql);
			$preObj = array('Nombres' => 'Sin datos', 'Apellidos' => 'Sin datos', 'Edad' => 'Sin datos', 'Representante' => 'Sin datos', 'Código' => 'Sin datos');
			$resultArray = array();
				if ($result) {
					while( $row = $result -> fetch_assoc() ) {
						forEach( $preObj as $key => $value ) {
							$preObj[$key] = $row[$key];
						}
						array_push($resultArray, $preObj);
					}
				}
				echo json_encode($resultArray, JSON_HEX_APOS);
				$conn -> close();
		}
		else if ($_POST['clubName'] === 'Juan' ||  $_POST['clubName'] === 'Gamaliel' || $_POST['clubName'] === 'Josué' || $_POST['clubName'] === 'Job' || $_POST['clubName'] === 'Daniel' ||  $_POST['clubName'] === 'Timoteo' || $_POST['clubName'] === 'Noé') {
						// //
			$club = 'tabla_' . mb_strtolower($_POST['clubName'], 'UTF-8');
			$sql = 'SELECT Nombres, Apellidos, Edad, CI FROM ' . $club . ' ORDER BY Nombres';
			$result = $conn -> query($sql);
			$preObj = array('Nombres' => 'Sin datos', 'Apellidos' => 'Sin datos', 'Edad' => 'Sin datos', 'CI' => 'Sin datos');
			$resultArray = array();
				if ($result) {
					while( $row = $result -> fetch_assoc() ) {
						forEach( $preObj as $key => $value ) {
							$preObj[$key] = $row[$key];
						}
						array_push($resultArray, $preObj);
					}
				}

				echo json_encode($resultArray, JSON_HEX_APOS);
				$conn -> close();
		}
	}
	else if ( isset($_POST['personalTable']) ){
		if ($_POST['personalTable'] == 'Teachers') {
			$table = 'tabla_mentores';
			$sql = 'SELECT Nombres , Apellidos , Edad , Club , CI FROM tabla_mentores';
			//
			$preObj = array('Nombres' => 'Sin datos', 'Apellidos' => 'Sin datos', 'Edad' => 'Sin datos', 'Club' => 'Sin datos' , 'CI' => 'Sin datos');
		}
		else if ($_POST['personalTable'] == 'Personal') {
			$table = 'tabla_directiva';
			$sql = 'SELECT Nombres , Apellidos , Edad , Ocupación, CI FROM tabla_directiva';
			//
			$preObj = array('Nombres' => 'Sin datos', 'Apellidos' => 'Sin datos', 'Edad' => 'Sin datos', 'Ocupación' => 'Sin datos' , 'CI' => 'Sin datos');
		}
			// 
			$result = $conn -> query($sql);
			//
			$resultArray = array();

				if ($result) {
					while( $row = $result -> fetch_assoc() ) {
						forEach( $preObj as $key => $value ) {
							$preObj[$key] = $row[$key];
						}
						array_push($resultArray, $preObj);
					}
					//
					echo json_encode($resultArray, JSON_HEX_APOS);
							$conn -> close();
				}
				else {
					echo false;
						$conn -> close();
				}
				
	}
	else if ( isset($_POST['getItemData']) ) {

			if ( $_POST['itemTable'] == 'Teachers' ) {
				$_POST['itemTable'] = 'Mentores';
			}
			else if ( $_POST['itemTable'] == 'Personal' ) {
				$_POST['itemTable'] = 'Directiva';
			}

			if ( !is_numeric( $_POST['itemId'] ) ) {
				$_POST['itemId'] = '"' . $_POST['itemId'] . '"'; 
			}

		$table = 'tabla_'. mb_strtolower( $_POST['itemTable'] , 'UTF-8');

			//$tableKeys = getTableKeys( $table , $conn );

			$dataObj = null;

				$getItemDataSql = 'SELECT * FROM ' . $table . ' WHERE ' . str_replace("'", ' ', $_POST['idType'] ) . ' = ' . $_POST['itemId'];

				$getItemData = $conn -> query($getItemDataSql);

					if ( $getItemData ) {
						while( $row = $getItemData -> fetch_assoc() ) {
							$dataObj = $row;
							$dataObj['Club'] =  $_POST['itemTable'];
							$dataObj['ItemIsAlso'] = array();
		
							if ( is_numeric($_POST['itemId']) ) {
								foreach ($ciTables as $key => $value) {
									$checkIfItemIsRep = 'SELECT COUNT(*) AS "Count" FROM ' . $value . ' WHERE CI = ' . $_POST['itemId'];

									$checkRepItem = $conn -> query($checkIfItemIsRep);

										if ( $checkRepItem ) {
											while ( $row = $checkRepItem -> fetch_assoc() ) {
												if ( $row['Count'] >= 1 ) {

													if ( $value == 'tabla_mentores' ) {
														array_push($dataObj['ItemIsAlso']  , 'Mentor');
													}
													else if ( $value == 'tabla_directiva') {
														if ( $_POST['itemTable'] !== 'Directiva' ) {
															array_push($dataObj['ItemIsAlso']  , 'Personal');
														}
													}
													else {
														array_push($dataObj['ItemIsAlso']  , 'Estudiante');
													}
													
												}
											}	
										}
								}
							}	
						}
					}

			echo json_encode($dataObj , JSON_HEX_APOS );



	}
/* End of 'Output Stufff' */

/* Add Stuff */

if ( isset($_POST['addSt']) ) {
	/*
			$club = 'tabla_' . mb_strtolower($_POST['clubName'], 'UTF-8');
			$sql = 'SELECT Nombres, Apellidos, Edad, Representante, Código FROM ' . $club . ' ORDER BY Nombres';
			$result = $conn -> query($sql);
			$preObj = array('Nombres' => 'Sin datos', 'Apellidos' => 'Sin datos', 'Edad' => 'Sin datos', 'Representante' => 'Sin datos', 'Código' => 'Sin datos');
			$resultArray = array();
				if ($result) {
					while( $row = $result -> fetch_assoc() ) {
						forEach( $preObj as $key => $value ) {
							$preObj[$key] = $row[$key];
						}
						array_push($resultArray, $preObj);
					}
				}
				echo json_encode($resultArray, JSON_HEX_APOS);
				$conn -> close(); */
			$club = 'tabla_' . mb_strtolower($_POST['dataSet']['Club'], 'UTF-8');
			$keepConn = true;
			$response = array(); // Final Response

			if ( $_POST['addSt'] == 'M' || $_POST['addSt'] == 'S' || $_POST['addSt'] == 'J' || $_POST['addSt'] == 'D' ) {

				if ( $_POST['addSt'] == 'M' || $_POST['addSt'] == 'S' || $_POST['addSt'] == 'J' ) {
					$_POST['dataSet']['Código'] = 'x'; // Replace false by 'x' to allow code creation;
				}

				if ( array_key_exists('Código', $_POST['dataSet']) && $_POST['dataSet']['Código'] == 'x' ) { /* Create and check code if there's no CI (For clubs Moses, Samuel, Josh)*/
					$stCode = $_POST['dataSet']['ClubIni'] . $_POST['dataSet']['Nombres'][0] . $_POST['dataSet']['Apellidos'][0];
				//
					$clubsToCheck = array('tabla_moises' , 'tabla_samuel' , 'tabla_josé', 'tabla_david');
					$checkCodeSt = '';

						$i = 0;
						foreach ($clubsToCheck as $key => $value) { // Create SQL statement to match repeated codes trought tables.
							$i ++;

							if ( $i < count($clubsToCheck) ) {
								$checkCodeSt .= 'SELECT COUNT(*) AS "Count" FROM ' . $value .  ' WHERE Código LIKE ' . '"%' . $stCode . '%" UNION ';
							}
							else {
								$checkCodeSt .= 'SELECT COUNT(*) FROM ' . $value .  ' WHERE Código LIKE ' . '"%' . $stCode . '%"';
							}
							
						}



					$checkCodeQ = $conn -> query($checkCodeSt);
					//
					$codeCounter = 0;
					$checkCodeR = '';

					if ($checkCodeQ) {
						while($row = $checkCodeQ -> fetch_assoc()) {
							$codeCounter += $row['Count'];
							//$checkCodeR = sprintf( "%'.03d\n", $row['COUNT(*)'] + 1); 
						}
						$checkCodeR = sprintf( "%'.03d\n", $codeCounter + 1); 
					}

					$_POST['dataSet']['Código'] = trim($stCode . $checkCodeR); // Strip the extra space , this is VERY important for the David club table... Believe Me :) ...

				}
				/* End of check Code */

			}
			else if ( $_POST['addSt'] == 'JS' || $_POST['addSt'] == 'JN' || $_POST['addSt'] == 'G' || $_POST['addSt'] == 'JB' || $_POST['addSt'] == 'DN' || $_POST['addSt'] == 'T' || $_POST['addSt'] == 'N') { /* Checks repeated CI's in database */
				$stCI = $_POST['dataSet']['CI'];

				$preSql = 'SELECT SUM( ( SELECT COUNT(*) FROM tabla_david WHERE Código = ' . $stCI . ' ) + ( SELECT COUNT(*) FROM tabla_juan WHERE CI = ' . $stCI . ' ) + (SELECT COUNT(*) FROM tabla_josué WHERE CI = ' . $stCI . ') + (SELECT COUNT(*) FROM tabla_job WHERE CI = ' . $stCI . ') + (SELECT COUNT(*) FROM tabla_daniel WHERE CI = ' . $stCI . ') + ( SELECT COUNT(*) FROM tabla_timoteo WHERE CI = ' . $stCI . ') + ( SELECT COUNT(*) FROM tabla_josué WHERE CI = ' . $stCI . ') + ( SELECT COUNT(*) FROM tabla_noé WHERE CI = ' . $stCI . ') + ( SELECT COUNT(*) FROM tabla_directiva WHERE CI = ' . $stCI . ') ) AS "Count" ';

				$result = $conn -> query($preSql);
		
				if ($result) {
					while ( $row = $result -> fetch_assoc() ) {
						if ($row["Count"] >= 1) {
							array_push($response, '', '¡Ups!, parece ser que la cédula que escribiste, ya se encuentra asignada en la base de datos... Intenta de nuevo con la correcta.');

							//
							
							echo json_encode($response, JSON_HEX_APOS);
							$keepConn = false;
							$conn -> close(); // Stop connection 
						}
					}
				}

			}
				
				
			if ($keepConn) {
				/* Get keys and values of SQL statement*/
				$keys = '(';
				$values = '(';
				$i = 0;
					forEach( $_POST['dataSet']  AS $key => $value ) {
						$i ++;

						if ( $key !== 'Club' && $key !== 'ClubIni' ) {
								if ( $i == count( $_POST['dataSet'] ) ) {
									$keys = $keys . $key . ')';
									$values = $values . '"' . $value . '")';
								}
								else {
									$keys = $keys . $key . ', ';
									$values = $values . '"' . $value . '", ';
								}
						} 
						else {
							$pi = 3.149;
						}
					}

				/* End of  SQL keys and values statement creation */

				/* Add to database */
				$sql = 'INSERT INTO ' . $club . $keys . ' VALUES' . $values;
				$query = $conn -> query($sql);
			
					if ($query) {
						array_push($response, $_POST['dataSet'], 'Done');
					}
					else {
						$fb = 'Error añadiendo estudiante a la base de datos , intenta de nuevo o recarga la página.';
						array_push($response, $fb, $sql, 'Done');
					}
			

				$conn -> close();

				echo json_encode($response , JSON_HEX_APOS);
			}
}
else if ( isset($_POST['addTeacher']) ) {
	$keepConn = true;

	$preSql = "SELECT COUNT(*) AS 'Count' FROM tabla_mentores WHERE CI = " . $_POST['dataSet']['CI'];
	$checkCI = $conn -> query($preSql);
	$response = array(); // Container of sent data and flag

		if ($checkCI) {
			while($row = $checkCI -> fetch_assoc()) {
				if ( $row['Count'] >= 1 ) {
					array_push($response, '', '¡Ups!, parece ser que la cédula que escribiste, ya se encuentra asignada en la base de datos... Intenta de nuevo con la correcta.');
					//
						echo json_encode($response , JSON_HEX_APOS);
						$conn -> close();
						$keepConn = false;
				}
			}
		}

	if ($keepConn) {
				/* Create keys and values of SQL statement*/
			$keys = '(';
			$values = '(';
			$i = 0;
				forEach( $_POST['dataSet']  AS $key => $value ) {
					$i ++;

					if ( $i == count( $_POST['dataSet'] ) ) {
						$keys .= $key . ')';
						$values .= '"' . $value . '")';
					}
					else {
						$keys .=  $key . ', ';
						$values .=  '"' . $value . '", ';
					}
					
				}

			/* End of  SQL keys and values statement creation */

			/* Add to database */
			$sql = 'INSERT INTO tabla_mentores' . $keys . ' VALUES' . $values;
			$query = $conn -> query($sql);

				if ($query) {
					array_push($response, $_POST['dataSet'], 'Done');
					$conn -> close();
					echo json_encode($response , JSON_HEX_APOS);
				}
				else {
					$fb = 'Error añadiendo mentor a la base de datos, intenta de nuevo o recarga la página.';
					$conn -> close();
					echo json_encode($fb , JSON_HEX_APOS);
				}
			

			
		}
}
else if ( isset( $_POST['addPersonal'] ) ) {
	$keepConn = true;
	$id = $_POST['dataSet']['CI'];

	$preSql = 'SELECT SUM( (SELECT COUNT(*) FROM tabla_david WHERE Código = ' . $id . ' ) + ( SELECT COUNT(*) FROM tabla_juan WHERE CI = ' . $id . ' ) + (SELECT COUNT(*) FROM tabla_josué WHERE CI = ' . $id . ') + (SELECT COUNT(*) FROM tabla_job WHERE CI = ' . $id . ') + (SELECT COUNT(*) FROM tabla_daniel WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_timoteo WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_josué WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_noé WHERE CI = ' . $id . ') + ( SELECT COUNT(*) FROM tabla_directiva WHERE CI = ' . $id . ') ) AS "Count" ';
	$checkCI = $conn -> query($preSql);
	$response = array(); // Container of sent data and flag

		if ($checkCI) {
			while($row = $checkCI -> fetch_assoc()) {
				if ( $row['Count'] >= 1 ) {
					array_push($response, '¡Ups!, parece ser que la cédula que escribiste, ya se encuentra asignada en la base de datos... Intenta de nuevo con la correcta.', false);
					//
						echo json_encode($response , JSON_HEX_APOS);
						$conn -> close(); // Close connection
						$keepConn = false;
				}
			}
		}
		else {
			array_push($response , $preSql , false);
			//
				echo json_encode($response , JSON_HEX_APOS);
				$conn -> close(); // Close connection
				$keepConn = false;
		}

		if ($keepConn) {
				/* Create keys and values of SQL statement*/
			$keys = '(';
			$values = '(';
			$i = 0;
				forEach( $_POST['dataSet']  AS $key => $value ) {
					$i ++;

					if ( $i == count( $_POST['dataSet'] ) ) {
						$keys .= $key . ')';
						$values .= '"' . $value . '")';
					}
					else {
						$keys .=  $key . ', ';
						$values .=  '"' . $value . '", ';
					}
					
				}

			/* End of  SQL keys and values statement creation */

			/* Add to database */
			$sql = 'INSERT INTO tabla_directiva' . $keys . ' VALUES' . $values;
			$query = $conn -> query($sql);

				if ($query) {
					array_push($response, $_POST['dataSet'], 'Done');
				}
				else {
					$fb = 'Error añadiendo personal en la base de datos, intenta de nuevo o recarga la página.';
					array_push($response, $fb, false);
				}

				echo json_encode($response , JSON_HEX_APOS);
				$conn -> close(); // Close connection
			
		}

}

if ( isset($_POST['deleteSt']) ) {

	$club = 'tabla_' . mb_strtolower($_POST['club'], 'UTF-8');
	$numIds = json_decode($_POST['numericIds'] , true); // Numeric Ids
	$varcharIds = json_decode($_POST['varcharIds'] , true); // Varchar Ids

	if ( $_POST['idType'] == 'Código' ) {
		$deleteByCode = 'DELETE FROM ' . $club . ' WHERE LEFT( Código , 6 )  IN';
		$deleteByCi = 'DELETE FROM ' . $club . ' WHERE Código IN';
		//
		global $codeIds;
		global $numericIds;
		//
		$codeIds = '(';
		$numericIds = '(';
		//
		
		$sql = '';

			if (count($numIds) > 0) { // Check numeric id's lenght and concatenate them in string...
				$i = 0;

				foreach ($numIds as $key => $value) {
					$i ++;

					if ( $i == count( $numIds )  ) {
						$numericIds .= $value . '); '; // Don't delete the space
					}
					else {
						$numericIds .= $value . ', ';
					}

				}

				$sql = $sql . $deleteByCi . $numericIds;
			}
			else {
				//
			}

			if (count($varcharIds) > 0) { // Check varchar id's lenght and concatenate them in string...
				$i = 0;

				foreach ($varcharIds as $key => $value) {
					$i ++;

					if ( $i == count( $varcharIds )  ) {
						$codeIds .= '"' . $value . '"); '; // Don't delete the space
					}
					else {
						$codeIds .= '"' . $value . '", ';
					}

				}

				$sql = $sql . $deleteByCode . $codeIds;
			}
			else {
				//
			}

				$result = $conn -> query($sql);

					if ($result) {
						echo json_encode($sql , JSON_HEX_APOS);
						$conn -> close();
					}
					else {
						echo json_encode( $sql , JSON_HEX_APOS);
						$conn -> close();
					}

	}
	else if ( $_POST['idType'] == 'CI' ) {
		$sql = 'DELETE FROM ' . $club . ' WHERE CI IN(';

			$i = 0;
			foreach ($numIds as $key => $value) {
				$i ++;

				if ( $i == count($numIds) ) {
					$sql .= $value . ')';
				}
				else {
					$sql .= $value . ', ';
				}
			}
		$result = $conn -> query($sql);

			if ($result) {
				echo true;
				$conn -> close();
			}
			else {
				echo $sql;
				$conn -> close();
			}
	}
	else {
		echo '?';
	}

}
else if ( isset($_POST['checkTransfer']) ) {
	/* Get keys of previous table */
	$club = 'tabla_' . mb_strtolower($_POST['previousClub']);
	$getKeysSql = 'SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = ' . '"' . $club . '"';

	$clubKeys = array();

		$keyRequest = $conn -> query($getKeysSql);

			if ($keyRequest) {
				while( $row = $keyRequest -> fetch_assoc() ) {
					array_push($clubKeys , $row['COLUMN_NAME']);
				}
			}


	/* Get keys of destiny table */
	$destinyClub = 'tabla_' . mb_strtolower($_POST['destinyClub']);
	$getKeysSql = 'SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = ' . '"' . $destinyClub . '"';

	$destinyClubKeys = array();

			$keyRequest = $conn -> query($getKeysSql);

				if ($keyRequest) {
					while( $row = $keyRequest -> fetch_assoc() ) {
						array_push($destinyClubKeys , $row['COLUMN_NAME']);
					}
				}

				/* Check present keys */

				$presentKeys = array();

				forEach($destinyClubKeys as $key => $value) {

					if ( in_array($value, $clubKeys) ) {
						array_push($presentKeys, $value);
					}

				}

				/* Find missing keys */ 

				$reqKeys = array();

				forEach($destinyClubKeys as $key => $value) {

					if ( !in_array($value, $clubKeys) ) {
						array_push($reqKeys, $value);
					}

				}

				$response = array($presentKeys , $reqKeys);

					echo json_encode($response , JSON_HEX_APOS);
					$conn -> close();
		
}
else if ( isset($_POST['checkTransferRepId']) ) { // Check if the new ID given to an item that is about to move from a table to another is repeated throught the database

	$totalCount = 0;
	$response = array();

		foreach ($_POST['ids'] as $arrKey => $id) {

			foreach ($ciTables as $key => $value) {

				$searchSql = 'SELECT COUNT(*) AS "Count" FROM ';
				$searchSql .= $value . ' WHERE CI = ' . $id; // Concatenate table and WHERE keyword

					$searchQuery = $conn -> query( $searchSql );

					if ( $searchQuery ) {
						while ( $row = $searchQuery -> fetch_assoc() ) {
							$totalCount += $row["Count"];
						}
					}

			}

		}

			if ( $totalCount >= 1 ) {
				if ( count($_POST['ids']) == 1 ) {
					array_push($response , true , 'La cédula introducida ya esta asignada en la base de datos');
				}
				else {
					array_push($response , true , 'Alguna de las cédulas introducidas ya esta asignada en la base de datos');
				}
				
			}
			else {
				array_push($response , false);
			}

				// Echo check result
				echo json_encode( $response , JSON_HEX_APOS);
				$conn -> close(); // Close connection
		
}
else if ( isset($_POST['transferSt']) ) { 
	/* Get keys required in the destiny table */
	$destinyClub = 'tabla_' . trim( mb_strtolower($_POST['destinyClub']) );
	$getKeysSql = 'SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name = ' . '"' . $destinyClub . '"';

	$clubIdType = str_replace("'", ' ', $_POST['idType'] );
	$destClubIdType = null;

	$reqKeys = $conn -> query($getKeysSql); // Query...
	$reqKeysArr = array(); // Required keys of destiny table array

	$insertSqlStat = 'INSERT INTO ' . $destinyClub . '(';

		if ($reqKeys) {
			$i = 0;
			while ( $row = $reqKeys -> fetch_assoc() ) {
				foreach ($row as $value) {
					$i ++;
					if ( $i == mysqli_num_rows($reqKeys) ) {
						$insertSqlStat .= $row['COLUMN_NAME'] . ')';

						$destClubIdType = str_replace("'", ' ', $row['COLUMN_NAME'] ); // Store destiny club id type in a variable

						array_push($reqKeysArr, $row['COLUMN_NAME']);
					}
					else {
						$insertSqlStat .= $row['COLUMN_NAME'] . ', ';

						array_push($reqKeysArr, $row['COLUMN_NAME']);

					}
				}				
			}
		}

	/* Get values to copy */
	$club = 'tabla_' . trim( mb_strtolower($_POST['club'], 'UTF-8') );
	$preKeys = '';
	$preArr = array();

	$j = 0;
		forEach( $_POST['presentData'] as $key => $value ) {

			$j ++;

				if ( $j == count( $_POST['presentData'] ) ) {
					$preKeys .= $value ;

					array_push($preArr , $value);
				}
				else {
					$preKeys .= $value . ', ';

					array_push($preArr , $value);
				}
			
		}
 	

		foreach ($reqKeysArr as $key => $value) {
			if ( !in_array($value , $preArr) ) {
				array_push($preArr , $value);
			}
		}

	$getDataSql = 'SELECT ' . $preKeys . ' FROM ' . $club . ' WHERE ' . $clubIdType . ' IN(';
	$ids = '';

	$i = 0;
		foreach ($_POST['ids'] as $key => $value) {

			$i ++;
			if ( $i == count($_POST['ids']) ) {
				if ( is_numeric($value) ) {
					$ids .= $value . ')';
				}
				else {
					$ids .= '"' . $value . '"' . ')';
				}
				
			}
			else {
				if ( is_numeric($value) ) {
					$ids .= $value . ',';
				}
				else {
					$ids .= '"' . $value . '"' . ',';
				}
			}

		} /* 01082427360100112513 */

	$dataResult = $conn -> query($getDataSql . $ids); // Query data to move

	$removeDataSql = ' DELETE FROM ' . $club . ' WHERE ' . $clubIdType . ' IN(' . $ids; // Delete items from precedent table after transaction


		$valuesArr = array(); // Create array of values to copy

		for ($i = 0; $i < count($_POST['ids']); $i++) {
			array_push($valuesArr , ' VALUES(');
		}

	$deleteSt = ' DELETE FROM ' . $club . ' WHERE ' . $clubIdType . ' IN('; 

	if ($dataResult) {
		$j = 0; // Iterate over present values array
		$k = 0; // Count rows 
		$l = 0; // Iterate over aditional data array

		while ( $row = $dataResult -> fetch_assoc() ) {

			$i = 0;
			$k ++;

			foreach ($row as $key => $value) {
 
				$i ++;

				if ( is_numeric($value) ) { // Check if key value is numeric
					// ... 
				}
				else {
					$value = '"' . $value . '"'; // Add double quotes if it's text or varchar
				}

				// //
				if ( $k == mysqli_num_rows( $dataResult ) ) {

					if ( $i == count($row) ) { 

						$n = 0;

						if ( $_POST["aditionalDataIsRequired"] == 1 ) {

							$valuesArr[$j] .= $value . ', '; // Concatenate values in string present in values array

								foreach ($_POST['aditionalData'][$l] as $key => $value) {
									$n ++;

										$val = '';

										if ( is_numeric($value) ) {
											$val = $value;
										}
										else {
											$val = '"' . $value . '"'; // Add duoble quotes if value is string
										}

										// Concatenate aditional values //

										if ( $n == COUNT( $_POST['aditionalData'][$l] ) )	{
											$valuesArr[$j] .= $val . ')';
										}
										else {
											$valuesArr[$j] .= $val . ', '; 
										}
								}
						}
						else {
							$valuesArr[$j] .= $value . ') '; // Concatenate values in string present in values array
						}

						$l ++;
						$j ++;
						
					}
					else {
						$valuesArr[$j] .= $value . ', '; // Concatenate values in string present in values array
					}

				}
				else {
					if ( $i == count($row) ) { 
					
						$n = 0;

						if ( $_POST["aditionalDataIsRequired"] == 1 ) {

							$valuesArr[$j] .= $value . ', '; // Concatenate values in string present in values array

							foreach ($_POST['aditionalData'][$l] as $key => $value) {
								$n ++;

								$val = '';

								if ( is_numeric($value) ) {
									$val = $value;
								}
								else {
									$val = '"' . $value . '"';
								}

								if ( $n == COUNT( $_POST['aditionalData'][$l] ) )	{
									$valuesArr[$j] .= $val  . '), ';
								}
								else {
									$valuesArr[$j] .= $val  . ', '; 
								}
							}

						}
						else {
							$valuesArr[$j] .= $value . '), '; // Concatenate values in string present in values array
						}

						$l ++;
						$j ++;
					}
					else {
						$valuesArr[$j] .= $value . ', '; // Concatenate values in string present in values array
					}
				}
			}

		}

		$l = 0; // This will be re-used for the for-each loop that will concatenate the values in the SQL statement

		$values = '';

			forEach($valuesArr as $key => $value) {
				
				$dex = '';

					if ($l == 0) {
						$dex = $value;
					}
					else {
						$dex = str_replace('VALUES', '', $value);
					}
				
					$values .= $dex;

						$l ++;

			};


		//	echo json_encode( 'START TRANSACTION; ' . $insertSqlStat . $values . $removeDataSql, JSON_HEX_APOS);
		
		$transferQuery = $conn -> query('START TRANSACTION'); // Start transaction

		$response = array(); // Array containing response

		if ( $transferQuery ) {  // Check transaction's atomicity

				$copyData = $conn -> query($insertSqlStat . $values); // Copy data query
				$removeData = $conn -> query($removeDataSql); // Remove data query
				$commitTransaction = $conn -> query('COMMIT'); // Makes commit

			if ( $commitTransaction ) {
					$checkChangesSql = 'SELECT ( SELECT COUNT(*) AS "Count" FROM ' . $destinyClub . ' WHERE ' . $destClubIdType . ' IN(' . $ids . ' ) AS "New Recs" , ' . '( SELECT COUNT(*) FROM ' . $club . ' WHERE ' . $clubIdType . ' IN( ' . $ids . ' ) AS "Old Recs"';

					$checkChanges = $conn -> query( $checkChangesSql );

						if ( $checkChanges ) {

							while( $row = $checkChanges -> fetch_assoc() ) {

								if ( $row['New Recs']  == count($_POST['ids']) && $row['Old Recs'] == 0 ) {
									array_push($response , ' ' , true );
									echo json_encode($response , JSON_HEX_APOS);
									// 
									$conn -> close();
								}
								else if ( $row['New Recs']  == count($_POST['ids']) && $row['Old Recs'] != 0 ) {
									array_push($response , 'Error removiendo items de la tabla original , intenta removerlos manualmente o reinicia la aplicación7' , false ); 
									//array_push($response , $insertSqlStat . $values , false);
									echo json_encode($response , JSON_HEX_APOS);
									// 
									$conn -> close();
								}
								else {
									array_push($response , $getDataSql , true );
									echo json_encode($response , JSON_HEX_APOS);
									// 
									$conn -> close();

									/* array_push($response , 'Error transfiriendo items , intenta reiniciando la aplicación o el servidor apache, si el problema persiste contacta al desarrollador0' , false ); *
									array_push($response , $row['New Recs'] . ' ' . $row['Old Recs']);
									echo json_encode($response , JSON_HEX_APOS); */
								}

							}

						}
						else {
							array_push($response , 'Error transfiriendo items , intenta reiniciando la aplicación o el servidor apache, si el problema persiste contacta al desarrollador1' , false ); 
							//array_push($response , $checkChangesSql , false);
							echo json_encode($response , JSON_HEX_APOS);
							//
							$conn -> close();
						}
			}
			else {
				/* Return false if commit fails */
				/* array_push($response , 'Error en la transacción , intenta reiniciando la aplicación o el servidor apache , si el problema persiste contacta al desarrollador2' , false ); */
				array_push($response, $getDataSql . $ids , false);
				echo json_encode($response , JSON_HEX_APOS);
				//
					$conn -> query('ROLLBACK');
					$conn -> close();
			}
		}
		else {
			/* Return false if transaction fails */
			array_push($response , 'Error iniciando la transacción , chequea la aplicación Apache o reinicia la página' , false);
				echo json_encode($response , JSON_HEX_APOS);
				//
					$conn -> query('ROLLBACK');
					$conn -> close();
		}
	}
	else {
		//echo 'fail...';
		echo json_encode($getDataSql . $ids);
		//echo json_encode($dataResult , JSON_HEX_APOS); 
	}
}
else if ( isset($_POST['deletePersonal']) ) {
	/* Get ids */
	$ids = 'IN(';

	$i = 0;

		forEach( $_POST['ids'] as $key => $value ) {
			$i ++;

			if ( $i < count($_POST['ids']) ) {
				$ids .= $value . ', ';
			}
			else {
				$ids .= $value . ')';
			}
		}

	/* Delete SQL */

		if ( $_POST['delete'] == 'Teachers' ) {
			$sql = 'DELETE FROM tabla_mentores WHERE CI ' . $ids;
		}
		else if ( $_POST['delete'] == 'Personal' ) {
			$sql = 'DELETE FROM tabla_directiva WHERE CI ' . $ids;
		}
	
	$query = $conn -> query($sql);

		if ($query) {
			echo true;
			$conn -> close();
		}
		else {
			echo $sql;
			$conn -> close();
		}
}

/* Update Stuff */

if ( isset( $_POST['updateData'] ) ) {

	$keepConn = true;

	/* Chcek table */
	if ( $_POST['table'] == 'Personal' ) { 
		$_POST['table'] = 'Directiva'; // If table is the teachers table // 
	}
	else if ( $_POST['table'] == 'Teachers' ) {
		$_POST['table'] = 'Mentores'; // If table is the administrative table // 
	}

	/* Check if new id is repeated */
	if ( isset( $_POST['updatedData']['CI'] ) ){
		$repeatedId = checkRepeatedId( $_POST['updatedData']['CI'] , $conn);

		if ( $repeatedId >= 1 ) {
			echo json_encode('Cédula de Identidad en uso' , JSON_HEX_APOS);
			$keepConn = false;
			$conn -> close();
		}

	}

	/* Check id type */
	if ( !is_numeric( $_POST['rowId'] ) ) {
		$_POST['rowId'] = '"' . $_POST['rowId'] . '"';
	}

		if ( $keepConn ) {
			$club = 'tabla_' . mb_strtolower( $_POST['table'] , 'UTF-8');

			$data = ''; // Key-value pairs

			$i = 0; // To iterate

			foreach ($_POST['updatedData'] as $key => $value) {
				$i ++;

				if ( !is_numeric($value) ) {
					$value = '"' . $value . '"';
				}

				if ( $i == COUNT($_POST['updatedData']) ) {
					$data .= $key . ' = ' . $value;
				}
				else {
					$data .= $key . ' = ' . $value . ', ';
				}


			}

			$sql = 'UPDATE ' . $club . ' SET ' . $data . ' WHERE ' . $_POST['idType'] . ' = ' . $_POST['rowId'];

				$updateQuery = $conn -> query($sql);

					if ($updateQuery) {

						echo json_encode('Done' , JSON_HEX_APOS);


					}
					else {
						echo json_encode($sql , JSON_HEX_APOS);
						$conn -> close();
					}
		
		}
}
else if ( isset( $_POST['searchData'] ) ) { // Search data
	$result = array();

		// Search by name //
		if ( $_POST['searchParameter'] == 'name' ) {

			// Search trough all the tables //
			foreach ($tables as $key => $value) {

				$searchSql = '';

				if ( in_array($value , $ciTables) ) {
					$searchSql = 'SELECT Nombres , Apellidos , Sexo , Edad , CI FROM ';
				}
				else {
					$searchSql = 'SELECT Nombres , Apellidos , Sexo , Edad , Código FROM ';
				}
				
				$searchSql .= $value . ' WHERE '; // Concatenate table and WHERE keyword

					$i = 0; // To iterate

					foreach ($_POST['input'] as $word => $keyword) {
						$i ++;

						if ( $i == COUNT( $_POST['input'] ) ){
							$searchSql .= ' CONCAT(Nombres , " " , Apellidos) Like ' . '"%' . $keyword . '%"'; // End concatenation
						}
						else {
							$searchSql .= ' CONCAT(Nombres , " " , Apellidos) Like ' . '"%' . $keyword . '%" || '; // Add OR operator 
						}
					}

					$searchQuery = $conn -> query( $searchSql );

					if ( $searchQuery ) {
						while ( $row = $searchQuery -> fetch_assoc() ) {
							$row['club'] = ucfirst( substr( $value, strpos($value, '_') + 1 , strlen($value)) );
							array_push($result, $row);
						}
					}

			}

			// Return array of results as response //
			echo json_encode($result , JSON_HEX_APOS);
		}
		else if ( $_POST['searchParameter'] == 'CI' ) {

			foreach ($ciTables as $key => $value) {

				$searchSql = 'SELECT Nombres , Apellidos , Sexo , Edad , CI FROM ';
				$searchSql .= $value . ' WHERE CI = ' . $_POST['input'][0]; // Concatenate table and WHERE keyword

					$searchQuery = $conn -> query( $searchSql );

					if ( $searchQuery ) {
						while ( $row = $searchQuery -> fetch_assoc() ) {
							$row['club'] = ucfirst( substr( $value, strpos($value, '_') + 1 , strlen($value)) );
							array_push($result, $row);
						}
					}

			}

			// Return array of results as response //
			echo json_encode($result , JSON_HEX_APOS);

		}
		else if ( $_POST['searchParameter'] == 'Código' ) {

			foreach ($codeTables as $key => $value) {

				$searchSql = 'SELECT Nombres , Apellidos , Sexo , Edad , Código FROM ';
				$searchSql .= $value . ' WHERE Código = "' . $_POST['input'][0] . '"'; // Concatenate table and WHERE keyword

					$searchQuery = $conn -> query( $searchSql );

					if ( $searchQuery ) {
						while ( $row = $searchQuery -> fetch_assoc() ) {
							$row['club'] = ucfirst( substr( $value, strpos($value, '_') + 1 , strlen($value)) );
							array_push($result, $row);
						}
					}

			}

			// Return array of results as response //
			echo json_encode($result , JSON_HEX_APOS);

		}
}
else if ( isset( $_POST['updateAges'] ) ) {
	// Get club table names //
	$getTablesSql = ' SELECT table_name FROM information_schema.tables WHERE table_schema = "kerygma" '; 
	$getTablesQuery = $conn -> query($getTablesSql);
	$tables = array();
		if ( $getTablesQuery )  {
			while( $row = $getTablesQuery -> fetch_assoc() ) {
				array_push( $tables , $row['table_name'] );
			}
		}
	foreach ($tables as $key => $value) {
		$updateAgesSql = 'UPDATE ' . $value . 
				' SET Edad = CASE
					WHEN MONTH(CURRENT_DATE) >= MONTH(FechaDeNacimiento) AND DAY(CURRENT_DATE) >= DAY(FechaDeNacimiento)
            			THEN YEAR(CURRENT_DATE) - YEAR(FechaDeNacimiento)
            		ELSE YEAR(CURRENT_DATE) - YEAR(FechaDeNacimiento) -1
           			 END ';
         $updateAges = $conn -> query($updateAgesSql);
         $updatedAgesCount = 0;
         
         if ( $updateAgesSql ) {
         	while ( $row = $updateAges -> fetch_assoc() ) {
         	}
         }	
	}
}

}

/*
Update Ages

UPDATE tabla_daniel 
SET Edad = CASE
			WHEN MONTH(CURRENT_DATE) >= MONTH(FechaDeNacimiento) AND DAY(CURRENT_DATE) >= DAY(FechaDeNacimiento)
            	THEN YEAR(CURRENT_DATE) - YEAR(FechaDeNacimiento)
            ELSE YEAR(CURRENT_DATE) - YEAR(FechaDeNacimiento) -1
            END;

*/

?>
