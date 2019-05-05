<?php 

//require 'startSession.php';
// Server and DB info//
$server = 'localhost';
$user = 'root';
$password = '';
$db = 'kerygma'; //Database Name

$conn = new mysqli($server, $user, $password, $db); //Connect

	if ( isset( $_POST['checkConn']) && $conn -> connect_errno ) { 
		echo true;
	}

$conn -> set_charset('utf8'); //Allow spanish accents in query
//utf8_encode() // Don't forget this one... :)

if ( isset( $_POST['updateAges'] ) ) {
	$sql = 'SELECT NombreDeTabla FROM info';
	$firstQuery = $conn -> query($sql);
	$tables = array();
		if ($firstQuery) {
			while ($row = $firstQuery -> fetch_assoc()) {
				array_push($tables , $row['NombreDeTabla']);
			}
		}
} 
if ( isset( $_POST['getHomeData'] ) ) {
	$sql = 'SELECT (SELECT COUNT(*) FROM tabla_mentores) AS "totalTeachers", (SELECT COUNT(Nombres) FROM tabla_mentores WHERE Sexo = "Masculino") AS "menTeachers", (SELECT COUNT(Nombres) FROM tabla_mentores WHERE Sexo = "Femenino") AS "womenTeachers", (SELECT COUNT(*) FROM tabla_directiva) AS "totalAdmins", (SELECT COUNT(Nombres) FROM tabla_directiva WHERE Sexo = "Masculino") AS "menAdmins", (SELECT COUNT(Nombres) FROM tabla_directiva WHERE Sexo = "Femenino") AS "womenAdmins", (SELECT COUNT(Nombres) FROM tabla_directiva WHERE Ocupación = "Directiva") AS "totalDirective", (SELECT COUNT(Nombres) FROM tabla_directiva WHERE Ocupación = "Coordinador") AS "totalCoor", (SELECT COUNT(Nombres) FROM tabla_directiva WHERE Ocupación = "Control de estudio") AS "totalControl"';
	$result = $conn -> query($sql);
	$resultArray = array("totalTeachers" => 'Sin datos', "menTeachers" => 'Sin datos', "womenTeachers" => 'Sin datos', 'totalAdmins' => 'Sin datos', 'menAdmins' => 'Sin datos', 'womenAdmins' => 'Sin datos', 'totalDirective' => 'Sin datos', 'totalCoor' => 'Sin datos', 'totalControl' => 'Sin datos');
		if ($result) {	
			while ($row = $result -> fetch_assoc()) {
				foreach ($resultArray as $key => $value) {
					$resultArray[$key] = $row[$key];
				}
			}  
			echo json_encode($resultArray, JSON_HEX_APOS);
			$conn -> close();
		}
		else {
			echo 'Error getting data...';
			$conn -> close();
		}
}
else if ( isset( $_POST['cbNameMin'] ) ) { //Get teachers of selected club in the teacher's resume box.
	$sql = 'SELECT Nombres, Apellidos FROM tabla_mentores WHERE Club = ' . '"' . $_POST['cbNameMin'] . '"';
	$result = $conn -> query($sql); //Output
	$resultArray = array();
		if ($result) {
			while ( $row = $result -> fetch_assoc())  {
				array_push( $resultArray, utf8_encode($row['Nombres']) . " " . utf8_encode($row['Apellidos']) );
			}
			echo json_encode($resultArray, JSON_HEX_APOS);
			$conn -> close();
		}
		else {
			echo 'error...';
		}
} 
else if (isset( $_POST['clubName'] ) ) {// To get club resume in menú //{
	$club = 'tabla_' . mb_strtolower($_POST['clubName'], 'UTF-8');
	$sql = "SELECT (SELECT COUNT(*) FROM " . $club . ") AS 'Total',  (SELECT COUNT(*) FROM " . $club .  " WHERE Sexo = 'Masculino') AS 'Men', (SELECT COUNT(*) FROM " . $club . " WHERE Sexo = 'Femenino') AS 'Women', (SELECT GROUP_CONCAT(Nombres, ' ', Apellidos) FROM tabla_mentores WHERE Club = " . "'" . mb_strtolower($_POST['clubName'], 'UTF-8') . "'" . ") AS 'Teachers', (SELECT EdadMiníma FROM info WHERE NombreDeTabla = '" . $club . "') AS 'minimumAge' , (SELECT EdadMáxima FROM info WHERE NombreDeTabla = '" . $club . "') AS 'maxAge'";
	$result = $conn -> query($sql); //Output
	$preObj = array('Total' => 'Sin datos', 'Men' => 'Sin datos', 'Women' => 'Sin datos', 'Teachers' => 'Sin datos', 'minimumAge' => 'Sin Datos', 'maxAge' => 'Sin datos');
		if ($result) {
			while ( $row = $result -> fetch_assoc())  {
				forEach( $preObj as $key => $value ) {
					if ( is_null( $row[$key] ) ) {
						$pi = 3.14159;
					}
					else {
						$preObj[$key] = $row[$key];
					}
				}
			}
			echo json_encode($preObj, JSON_HEX_APOS);
			$conn -> close();
		}
		else {
			echo json_encode($sql, JSON_HEX_APOS);
			$conn -> close();
		}
}
else if ( isset( $_POST['getTablesData'] ) ) {
	
	$sql = 'SELECT * FROM info  ORDER BY EdadMiníma';
	$query = $conn -> query( $sql );
	$tables = array();

		if ( $query ) {
			while ( $row = $query -> fetch_assoc() ) {

				$table = $row;

				$getCountSql = 'SELECT ( SELECT COUNT(*) FROM ' . $table['NombreDeTabla']  . ') AS "Total" , ( SELECT COUNT(*) FROM ' . $table['NombreDeTabla'] . ' WHERE Sexo = "Femenino") AS "Women" , ( SELECT COUNT(*) FROM ' . $table['NombreDeTabla']  . ' WHERE Sexo = "Masculino") AS "Men"';

				$getCount = $conn -> query( $getCountSql );

					if ($getCount) {
						while ( $row = $getCount -> fetch_assoc() ) {
							$table['Total'] = $row['Total'];
							$table['Hombres'] = $row['Men'];
							$table['Mujeres'] = $row['Women'];
						}
					}

				array_push($tables , $table);
			}

			echo json_encode($tables , JSON_HEX_APOS);
		}
		else {
			echo json_encode($tables , JSON_HEX_APOS);
		}

}


?>
