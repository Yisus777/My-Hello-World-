
/* 

	* = Var will be used in another functions of the code
*/

/* HTML elements, home animations and sounds*/

 // Principal HTML elements // 

var generalResume = $('#generalResume'); // Data resume boxes container
// -<
var resumeBoxes = $('.resumeBoxes'); // General resume info containers
// -<
var studentsResume = $('#studentsResume'); // Students resume
var teachersResume = $('#teachersResume'); // Teachers resume
var smallClubsCont = $('#smallClubsCont'); // Teachers resume small club icons container
var adminResume = $('#adminResume'); // Admin Resume
var academicResume = $('#academicResume'); // Academic Resume
//
var clubsBarCont = $('#clubsBarContainer'); // Club icons bar 
//
var addDataBox = $('#addDataContainer'); // Add data dialog container
var searchDataBox = $('#searchItemContainer'); // Search container
var searchBar = $('#searchBar'); // Search Bar

// End of Principal HTML Elements //

	// Sounds //

var startUp = new Audio('../recursos/audios/Kerygma/startup.mp3');
var success = new Audio('../recursos/audios/Kerygma/done.mp3');
var push = new Audio('../recursos/audios/Kerygma/push.mp3');
var error = new Audio('../recursos/audios/Kerygma/error.mp3');

push.volume = 0.1;
setTimeout( function () {
	startUp.play();
}, 1000);

/* Check database connection */
/*
$.ajax({
	url : '../recursos/PHP/kerygmaIni.php',
	type : 'POST',
	data : {
		'checkConn' : true
	},
		success : function(response) {
			if (response) {
				document.write('Connection to database failed...');
			}
			
		},
		error : function (error) {
			alert(error);
			document.write('Error Checking Database Connection...');
		}
})

/* Get clubs information */
var clubsInfo = {};

function getClubsInfo() {
	$.ajax({
		url : '../PHP/kerygmaIni.php',
		type : 'POST',
		data : {
			'getTablesData' : true
		},
		success : function (response) {
			console.log(response);
			let parsedResponse = jQuery.parseJSON(response);
			let clubs = [];

				if ( parsedResponse.length > 1 ) {
					for (var i = 0; i < parsedResponse.length; i++) {
						clubsInfo[i] = parsedResponse[i];
					}
				}


			showBoxes(); // Show Resume Boxes
			runSecond(); 
			appendClubButtons(); // Parse club icons
		},
		error : function (error) {

		}
	});
}


/* --- */

/* Append club buttons in club icons bar */

function appendClubButtons() {
	for ( var a = 0; a < Object.keys( clubsInfo ).length; a++ ) {

		if ( clubsInfo[a].Nombre != 'Directiva' && clubsInfo[a].Nombre != 'Mentores' ) {
			let button = $('.baseIcon').clone();

				console.log(button);
				console.log('x');

				button.removeClass('baseIcon');
				button.children('.circle').text( clubsInfo[a].Abreviación );
				button.children('.circle').attr('title' , clubsInfo[a].Nombre);
				button.children('p').text( clubsInfo[a].Nombre );

				button.children('.circle').data('Name' , clubsInfo[a].Nombre);
				button.children('.circle').data('Heb' ,  clubsInfo[a].Heb); 
				button.children('.circle').data('Grg' ,  clubsInfo[a].Grg);
				button.children('.circle').data('Abbr' , clubsInfo[a].Abreviación);
				button.children('.circle').data('Id' , clubsInfo[a].Id);
				button.children('.circle').data('color' ,  clubsInfo[a].Color);

				button.children('.circle').css('background' , clubsInfo[a].Color);

				// Attach click event 
				button.children('.circle').on('click' , function (event) {

					console.log( $( event.currentTarget ).data() );

					if ( $( event.currentTarget ).data('Id') == 'CI' ) {
						jd('st' , $( event.currentTarget ));
					}
					else {
						msjd('st' , $( event.currentTarget ));
					}
				});

				// Attach hover event

				button.children('.circle').hover(

					function (event) {
						$( event.currentTarget ).css({'opacity' : '0.9', 'transition': 'opacity 0.2s ease-in-out'});
					},
					function (event) {
						$( event.currentTarget ).css({'opacity' : '1' , 'transition': 'opacity 0.2s ease-in-out'})
					}


				)
					clubsBarCont.children('#clubsBar').append( button );

		}
		
	}
}

/* Show clubs total registration */

function showClubsReg() {

}

/* Show elements of home menu */

var lastMenu = null; // * Save last viewed "menú" 
var actualMenu = null; // * Save actual "menú"*

function showBoxes() {

	actualMenu = $('.home');

	studentsResume.animate({'marginTop':'0%','opacity':'1'},400).queue(function () {
		teachersResume.animate({'marginTop':'0%','opacity':'1'},400).queue( function () {
			adminResume.animate({'marginTop':'0%','opacity':'1'},400).queue( function () {
				academicResume.animate({'marginTop':'0%','opacity':'1'},400);
				$(this).desqueue;
			})
			$(this).desqueue;
		});
		$(this).desqueue;
	});
	

}

function showNoData() {
	let ran = Math.floor( Math.random() * 3);
	switch (ran) {
		case 0:
			$('.noData > img').attr('src', '../recursos/imagenes/Kerygma/working.png');
			console.log(0);
			$('.noData > p').text('¡Vaya!, parece ser que esta sección o estos datos no estan disponibles por el momento, pero tranquil@... Llegarán tan rápido como Israel a la tierra prometida.');
			break;
		case 1:
			$('.noData > img').attr('src', '../recursos/imagenes/Kerygma/404.png');
			console.log(1);
			$('.noData > p').text('Parece ser que no hay datos en esta sección por el momento... Mientras tanto, puedes aprovechar para memorizarte el samo 119.');
			break;
		case 2:
			//console.log(2);
			break
		default:
			$('.noData > img').attr('src', '../recursos/imagenes/Kerygma/working.png');
			$('.noData > p').text('¡Vaya!, parece ser que esta sección o estos datos no estan disponibles por el momento, pero tranquil@... Llegarán tan rápido como Israel a la tierra prometida.');

	}
}

var globalSum = 0;


function runSecond() {

	let resumedData = {};

	$.ajax({
		url : '../PHP/kerygmaIni.php',
		type : 'POST',
		data : { 'getHomeData' : true },
			success : function (response) {
				//console.log(response);
				let parsedResponse = jQuery.parseJSON(response);
				resumedData = parsedResponse;
				//console.log(parsedResponse);
					/* Students data reusme */
					let totalStudents = 0;
					let totalMenStudents = 0;
					let totalWomenStudents = 0;

						/* Loop to get the sum of total students/ men students / women students */
						for (var i = 0; i < Object.keys( clubsInfo ).length; i++) {
							console.log( clubsInfo[i].Total );
							if ( clubsInfo[i].Nombre != 'Mentores' && clubsInfo[i].Nombre != 'Directiva' ) {
									
								//console.log( clubsInfo[i].Total );
								totalStudents += clubsInfo[i].Total != undefined ? Number( clubsInfo[i].Total ) : 0;
								totalMenStudents += clubsInfo[i].Hombres != undefined ? Number( clubsInfo[i].Hombres ) : 0;
								totalWomenStudents += clubsInfo[i].Mujeres != undefined ? Number( clubsInfo[i].Mujeres ) : 0; 

							}
						}

						studentsResume.children('.innerData').children('#totalStudents').text(totalStudents);
						studentsResume.children('.innerData').children('#totalMen').text(totalMenStudents);
						studentsResume.children('.innerData').children('#totalWomen').text(totalWomenStudents);

						console.log(totalStudents , totalMenStudents , totalWomenStudents);

					/* Teachers data resume */
					teachersResume.children('.innerData').children('#totalTeachers').text(parsedResponse.totalTeachers);
					teachersResume.children('.innerData').children('#totalMen').text(parsedResponse.menTeachers);
					teachersResume.children('.innerData').children('#totalWomen').text(parsedResponse.womenTeachers);
					appendMinClubIcons();
					/* Admins data resume */ 
					adminResume.children('.innerData').children('#totalAdmins').text(parsedResponse.totalAdmins);
					adminResume.children('.innerData').children('#totalMen').text(parsedResponse.menAdmins);
					adminResume.children('.innerData').children('#totalWomen').text(parsedResponse.womenAdmins);
					adminResume.children('.innerData').children('#totalWomen').text(parsedResponse.womenAdmins);
					adminResume.children('.innerData').children('#totalDirective').text(parsedResponse.totalDirective);
					adminResume.children('.innerData').children('#totalControl').text(parsedResponse.totalControl);
					/* Academic Data Resume */
					showNoData();
			},
			error : function (error) {
				alert(error);
				location.reload(1000);
			} 
	});
}

/* Left bar buttons functions */
$('#showStudents').on('click', function () {
	closeSearch(); // Close search box if was opened
	addDataBox.fadeIn(200);

});

$('#showGeneral').on('click' , function () {

	if ( $('.home').is(':hidden') ) {

		if ( actualMenu.is('#itemDataContainer') ) {
			lastMenu = $('.home');
			
			returnToLastMenu();
		}
		else {
			returnToLastMenu();
		}
		
		/*
		// Closee item data container if a table item was selected //
		//$('#returnToClub > img').trigger('click')
		//$('#returnToGeneral > img').trigger('click');			
		showClubData(false, actualMenu);

		$('.home').delay(200).fadeIn(100);

		lastMenu = null;
		actualMenu = ('.home');

		closeContainer($('#closeMenu')); // Close add data dialog if was opened
		selectedItems = []; */

	}

});

$('#searchData').on('click' , function () {
	searchDataBox.fadeIn(200);
	searchBar.delay(100).animate({ 'width' : '95%'} , 500);
	searchBar.children().delay(600).fadeIn(400);
});


// Add data dialog button functions //
$('#addStudent-Panel').on('click' , function () {

		$('select[name="st-Panel-Form-Club"]').show();
		$('select[name="teacher-Panel-Form-Club"]').hide();
		$('select[name="personal-Panel-Form-Position"]').hide();
		alterForm( $('select[name="st-Panel-Form-Club"]').val() );
		alterReqKeys(requiredKeys);
		$('#st-Panel-Form > h2').text('Añadir a los..');
		addDataBox.children('p').text('Añadir Estudiante');
		addDataBox.animate({'height' : '50%'}, 400);
		$('#closeMenu').css('height' , '5.8%');
		$('#st-Panel-Form').show();
		$('.addDataButtons').hide(); 
		//
		sendFormBtn.off('click'); // Unbind pre-attached function

		sendFormBtn.one('click' , function () {
				addSt();
			} );


});

$('#addTeacher-Panel').on('click' , function () {
		
		addDataBox.children('p').text('Añadir mentor');
		$('#st-Panel-Form > h2').text('Asignar a los..');
		$('select[name="personal-Panel-Form-Position"]').hide();
		$('select[name="st-Panel-Form-Club"]').hide();
		$('select[name="teacher-Panel-Form-Club"]').show();
		//
		addDataBox.css('height' , '50%');
		$('#closeMenu').css('height' , '5.8%');
		$('#st-Panel-Form').show();
		$('.addDataButtons').hide();
		//
		$('label[for="Rep"]').hide();
		$('input[name="Rep"]').hide();
		$('label[for="spouse"]').show();
		$('select[name="spouse"]').show();
		//
		alterForm('Personal');
		//	
			sendFormBtn.off('click'); // Unbind pre-attached function

			sendFormBtn.one('click' , function () {
				addTeacher();
			} );
});

$('#addPersonal-Panel').on('click' , function () {
	//
		$('select[name="st-Panel-Form-Club"]').hide();
		$('select[name="personal-Panel-Form-Position"]').show();
		$('select[name="teacher-Panel-Form-Club"]').hide();
		//
		$('#st-Panel-Form > h2').text('Añadir Como...');
		addDataBox.children('p').text('Añadir Personal');
		addDataBox.css('height' , '50%');
		$('#closeMenu').css('height' , '5.8%');
		$('#st-Panel-Form').show();
		$('.addDataButtons').hide();
		//
		$('label[for="Rep"]').hide();
		$('input[name="Rep"]').hide();
		$('label[for="spouse"]').show();
		$('select[name="spouse"]').show();
		//
		alterForm('Personal');
		//	

		sendFormBtn.off('click'); // Unbind pre-attached function

		sendFormBtn.one('click' , function () {
				addPersonal();
			} );
});


function closeContainer(e) {

	if ( $(e).parent().attr("id") == 'addDataContainer' ) {

		$(e).parent().hide();
		addDataBox.css('height', '40%');
		addDataBox.children('p').text('¿Qué deseas añadir?');
		$('#formErrorMsg').hide();
		$('#formErrorMsg').text('');
		//
		$('#st-Panel-Form').hide();
		$('#closeMenu').css('height' , '7%');
		$('#st-Panel-Form-Success').hide();
		$('.addDataButtons').show(); 
		$('#st-Panel-Form > input').val('') // Clean filled fields

	}
	else if ( $(e).parent().attr('class') == 'deletePrompt' || $(e).parent().attr('class') == 'movePrompt') {

		$(e).parent().hide(); // Hide opened dialog
		$(e).parent().children().show(); // Show dialog again if there was success response
		//
		$('.deletePrompt > div > ul').children().remove(); // Remove selected items from list 
		$('.movePrompt > div > ul').children().remove(); // Remove selected items from list 
		$('select[name="moveStClub"]').children('option').remove() // Remove options from destiny club selection in move prompt
		//
		$(e).parent().children('.deleteSuccess').hide(); // Hide success response

		$('.removeStudent , .moveStudent , .seeItem').css('pointer-events' , 'auto'); //Enable buttons 

		$('.removeStudent , .moveStudent , .seeItem').hover( // Re-attach hover event 
			function () {
				$(this).css('backgroundColor' , '#DCDCDC3D');
			},
			function () {
				$(this).css('backgroundColor' , 'transparent');
			}
		);

			if ( $(e).parent().attr('class') == 'movePrompt' ) {
				$('.transferReqKeys').children('.itemName , .dialogAction , .tranReqFields , br ').remove();
				moveDialog.css('height' , '45%');
				$(e).css({'width' : '6%', 'height' : '8%'})
			}
			else if ( $(e).parent().attr('class') == 'movePrompt' ) {
				$(e).css({'width' : '5%', 'height' : '10%'})
			}

			
	}

}

$(document).ready(getClubsInfo());


/* End of HTML elements and home animations */

/* Resume Boxes functions and data retrieve */

function appendMinClubIcons() {

		for ( var i = 0; i < Object.keys(clubsInfo).length; i++ ) {
			console.log('s');
			if ( clubsInfo[i].Nombre !== 'Directiva' && clubsInfo[i].Nombre !== 'Mentores' ) {
				console.log('s');

				let minBtn = $('.minBaseIcon').clone(); // Teachers resume button
				let minBtnSt = $('.minBaseIcon').clone(); // Students resume button

				minBtn.removeClass('minBaseIcon');
				minBtn.data('Name' ,  clubsInfo[i].Nombre );
				minBtn.children('span').text( clubsInfo[i].Abreviación );

				
				//
				minBtnSt.removeClass('minBaseIcon');
				minBtnSt.data({
					'Name' : clubsInfo[i].Nombre,
					'Total' : clubsInfo[i].Total,
					'Hombres' : clubsInfo[i].Hombres, 
					'Mujeres' : clubsInfo[i].Mujeres
				});
				minBtnSt.children('span').text( clubsInfo[i].Abreviación );

					// Attach function to show teachers per club 
					minBtn.on('click' , function (event) {
						showTeachersMin( $( event.currentTarget ) );
					});

					// Attach function to show enrollment per club
					minBtnSt.on('click' , function (event) {
						showClubReg( $( event.currentTarget ) );
					});


					$('#smallClubsCont').append( minBtn );
					$('#smallClubsContStudents').append( minBtnSt );

			}

		}

}

function showClubReg(e) { // Show and parse club total students
	$('#smallClubsContStudents > .smallClubsIcons').hide();

	$('#smallClubsContStudents').append('<span class="clubRegInfo"> Matrícula Total : ' + $(e).data('Total') + ' </span> <br>');
	$('#smallClubsContStudents').append('<span class="clubRegInfo"> Hombres : ' + $(e).data('Hombres') + ' </span> <br>');
	$('#smallClubsContStudents').append('<span class="clubRegInfo"> Mujeres : ' + $(e).data('Mujeres') + ' </span> <br>');

	$('#smallClubsContStudents').append('<button id="backToMinSt" onclick="showClubsMinSt()"> < </button>');
}

function showTeachersMin(e) { // Show and parse teachers consulted in teachers resume box
	$.ajax({
		url : '../PHP/kerygmaIni.php',
		type : 'POST',
		data : { 'cbNameMin' : $(e).data('Name') },
		success : function (response) {
			console.log(response);
			let parsedResponse = jQuery.parseJSON(response);
			console.log(parsedResponse);
			//console.log(parsedResponse);
			if (parsedResponse.length >= 1) {
				$('#smallClubsCont > .smallClubsIcons').hide();
				for (var i = 0; i < parsedResponse.length; i++) {
					smallClubsCont.append('<p class="obtainedTeachers">' +  parsedResponse[i] + '</p><br>');
				}
				smallClubsCont.append('<button id="backToMin" onclick="showClubsMin()"> < </button>');
			}
			else {
				$('#smallClubsCont > .smallClubsIcons').hide();
				smallClubsCont.append('<p class="obtainedTeachers" style="margin-top : 4%;"> No hay Datos </p><br>');
				smallClubsCont.append('<button id="backToMin" onclick="showClubsMin()"> < </button>');
			}
			
		},
		error: function (error) {
			alert (error);
		}
	});
	
	
	//$(e).parent().html('<p> Anyone There? </p><br> <button style="color: green" onclick="showClubsMin"> < </button> ');

}

function showClubsMin() { // Show club min-buttons again
	$('.obtainedTeachers, #backToMin, #smallClubsCont br').remove();
	$('#smallClubsCont > .smallClubsIcons').show();
}

function showClubsMinSt() {
	$('.clubRegInfo, #backToMinSt, #smallClubsContStudents br').remove();
	$('#smallClubsContStudents > .smallClubsIcons').show();
}

var tableType1 = $('.clubType1DataList > tbody');
var tableType2 = $('.clubType2DataList > tbody');
var personalTable = $('.personalDataTable > tbody');

function showClubData(b, clubMenu) { // Show proper table for selected club
	if (b == 'st') {
		generalResume.fadeOut(200);
		clubsBarCont.fadeOut(200);
		clubMenu.delay(400).fadeIn(200); 

		// Disable buttons //
		$('.removeStudent , .moveStudent , .removePersonal , .seeItem').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'});

		actualMenu = clubMenu; // Stores the actual section in variable
	}
	else if (b == 'tp') {
		generalResume.fadeOut(200);
		clubsBarCont.fadeOut(200);
		clubMenu.delay(400).fadeIn(200); 

		// Disable buttons //
		$('.removeStudent , .moveStudent , .removePersonal , .seeItem').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'});

		actualMenu = clubMenu; // Stores the actual section in variable
	}
	else if (b == 'seeItem') {
		deleteDialog.hide();
		moveDialog.hide();

		// Disable buttons //
		$('.removeStudent , .moveStudent , .removePersonal , .seeItem').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'});

	} 
	else {
		clubMenu.children('.data').children('table').children('tbody').children('.rowHigh, .rowWhite').remove();
		deleteDialog.hide();
		moveDialog.hide();

		// Disable buttons //
		$('.removeStudent , .moveStudent , .removePersonal , .seeItem').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'});

		clubMenu.fadeOut(200); 
	} 

	$('.deletePrompt , .movePrompt ').children().show();
	$('.deleteSuccess').hide();

	$('.deletePrompt > div > ul > li, .movePrompt > div > ul > li').remove(); // Delete selected items showed in delete or transfer dialog
}

/* Re-size circle function */
function resizeCircles() {
	for (var i = 0; i < $('.circle').length; i++) {

			let w = $($('.circle')[i]).css('width');
			let h = w;

				$($('.circle')[i]).css('height' , w);
		};
}

function attachResize() {

	$(window).off('resize');

		$(window).resize( function () {
			resizeCircles();
		});

}


/* Return to last menu */

function returnToLastMenu() {

	if ( actualMenu.is( $('#clubType1') ) || actualMenu.is( $('#clubType2') ) || actualMenu.is( $('#personalTable') ) ) {

		// Remove table elements //
		actualMenu.children('.data').children('table').children('tbody').children('.rowHigh, .rowWhite').remove();
		deleteDialog.hide();
		moveDialog.hide();

		// Disable buttons //
		$('.removeStudent , .moveStudent , .removePersonal , .seeItem').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'});

		// Close opened dialogs //
		closeContainer($('#closeMenu')); // Close add data dialog 
		closeContainer( $('.closeDeletePrompt') ); // Close delete dialog
		closeContainer( $('.closeMovePrompt') ); // Close move dialog

		// Empty selected items array //
		selectedItems = [];

		// Show general menu //
		generalResume.delay(200).fadeIn(200);
		clubsBarCont.delay(200).fadeIn(200);

		// Hide actual menu // 
		actualMenu.hide();

		// Set actual menu to home //
		actualMenu = $('.home');
	}
	else if ( actualMenu.is( $('#itemDataContainer') ) ) {
		// Hide actual menu //
		actualMenu.hide(); 
		//
		$('.itemTypeIcons').remove(); // Remove mini-symbols
		$('#dataFieldsContainer').hide(); // Hide input fields container if edit button was clicked 
		$('#dataFieldsContainer').children().remove(); // Remove input fields if edit button was clicked

		//
		actualItemObj = {}; // Empty obj container
		selectedItems = []; // Empty selected items array

		// Call function to retrieve precedent table's data // 
		if ( $( lastMenu ).attr('class') == 'home' ) {
			$('.home').fadeIn(100);
			actualMenu = $('.home');
		}
		else if ( actualClub == 'Teachers' || actualClub == 'Mentores' ) {
			showPersonalTable('Teachers');
		}
		else if ( actualClub == 'Personal' || actualClub == 'Directiva' ) {
			showPersonalTable('Personal');
		}
		else {
			
			const clubIndex = Object.keys(clubsInfo).filter( key => clubsInfo[key].Nombre == actualClub );

			const club = clubsInfo[clubIndex];

			console.log(club);

			if ( club.Id == 'CI' ) {
				jd( 'st' , $('.clubIcons[title="' + club.Nombre + '"]') );
			}
			else {
				msjd( 'st' , $('.clubIcons[title="' + club.Nombre + '"]') );
			}
		}
	}


}

$('#returnToClub > img , #returnToGeneral > img').on('click' , function () {
	returnToLastMenu();
});

/* End Resume Boxes functions and data retrieve */

/* Functions to show each club's data */

// For Clubs: Moses, Samuel, Joseph and David //

// Tables, trows, td's //


var obj = {};

function getClubResume(clubName, infoContainer) {
	$.ajax({
		url : '../PHP/kerygmaIni.php',
		type : 'POST',
		data : {'clubName' : clubName},
			success : function (response) {
				//console.log(response);
				let parsedResponse = jQuery.parseJSON(response);
				obj = parsedResponse;
				console.log(parsedResponse);
					infoContainer.children('.infoTotalStudents').text(' ' + parsedResponse.Total);
					infoContainer.children('.infoTotalMen').text(' ' + parsedResponse.Men);
					infoContainer.children('.infoTotalWomen').text(' ' + parsedResponse.Women);
					infoContainer.children('.infoAges').text(' ' + parsedResponse.minimumAge + ' a ' + parsedResponse.maxAge + ' años');
					infoContainer.children('.infoTeachers').text(' ' + parsedResponse.Teachers);
			},
			error : function (response) {
				console.log(response);
			}
	})
}

var actualClub = '';
var idType = null;

function msjd(b , btn) {

	console.log( btn.data() );

	lastMenu = actualMenu;
	actualMenu = $('#clubType1');

	actualClub = btn.data('Name');
	// Show and hide... // 
	showClubData(b, actualMenu );
	// Show club icon //
	$('.innerClubIcon').text(''); // Remove previous icon letters
	$('.innerClubIcon').text(btn.data('Abbr') );
	$('.innerClubIcon').css('background' , btn.data('color'));
	// Show club resume //
	getClubResume(btn.data('Name'), $('#clubType1 > .info'));
		// Ajax //
	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : {'clubName' : btn.data('Name')},
			success : function (response) {
				$('.clubName').text( btn.data('Name') + ' - ' + btn.data('Heb') + ' - ' + btn.data('Grg'));
				//
				console.log(response);

				let parsedResponse = jQuery.parseJSON(response);
				console.log(parsedResponse);
					if (parsedResponse.length >= 1) {
						/* Append Results */
						for (var i = 0; i < parsedResponse.length; i++) {

							/* Check null values and replace "null" by S/D */
							for (var j = 0; j < Object.keys(parsedResponse[i]).length; j++) { 
								if ( parsedResponse[i][ Object.keys(parsedResponse[i])[j] ] == null ) {
									parsedResponse[i][ Object.keys(parsedResponse[i])[j] ] = 'S/D';
								}
							}

							if (i % 2 == 0) {
								tableType1.append('<tr class="rowWhite" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad +  '</td> <td class="stRep">' + parsedResponse[i].Representante + '</td> <td class="stCode">' + parsedResponse[i].Código + '</td> </tr>');

									if ( typeof parsedResponse.Código == 'number' ) { // Check if code is numeric or varchar , this is special for the David club // 
										$('#row' + i).data('idType' , 'numeric');
									}
									else {
										$('#row' + i).data('idType' , 'varchar');
									}

									$('#row' + i).data('id' , parsedResponse[i].Código);
							}
							else {
								tableType1.append('<tr class="rowHigh" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad +  '</td> <td class="stRep">' + parsedResponse[i].Representante + '</td> <td class="stCode">' + parsedResponse[i].Código + '</td> </tr>');

									if ( typeof parsedResponse.Código == 'number' ) { // Check if code is numeric or varchar , this is special for the David club // 
										$('#row' + i).data('idType' , 'numeric');
									}
									else {
										$('#row' + i).data('idType' , 'varchar');
									}

									$('#row' + i).data('id' , parsedResponse[i].Código);
							}
						}
					} 
			},
			error : function (error) {
				console.log(error);
			}
	});

	idType = 'Código';
}

function jd(b , btn) {

	lastMenu = actualMenu;
	actualMenu =  $('#clubType2');

	actualClub = btn.data('Name');
	// Show and hide table // 
	showClubData(b, $('#clubType2'));
	// Show club icon //
	$('.innerClubIcon').text(''); // Remove previous icon letters
	$('.innerClubIcon').text( btn.data('Abbr') );
	$('.innerClubIcon').css('background' , btn.data('color'));
	// Show club resume //
	getClubResume(btn.data('Name'), $('#clubType2 > .info'));
		// Ajax //
	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : {'clubName' : btn.data('Name')},
			success : function (response) {
				$('.clubName').text( btn.data('Name') + ' - ' + btn.data('Heb') + ' - ' + btn.data('Grg'));
				//
				console.log(response);
				let parsedResponse = jQuery.parseJSON(response);
				//console.log(parsedResponse);
					if (parsedResponse.length >= 1) {

						// Append Results //
						for (var i = 0; i < parsedResponse.length; i++) {

							/* Check null values and replace "null" by S/D */
							for (var j = 0; j < Object.keys(parsedResponse[i]).length; j++) { 
								if ( parsedResponse[i][ Object.keys(parsedResponse[i])[j] ] == null ) {
									parsedResponse[i][ Object.keys(parsedResponse[i])[j] ] = 'S/D';
								}
							}

							if (i % 2 == 0) {
								tableType2.append('<tr class="rowWhite" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad + '</td> <td class="stCode">' + parsedResponse[i].CI + '</td> </tr>');
								$('#row' + i).data('idType' , 'numeric'); // From the club Joshua onwards the id type is only numeric (and MUST be)
								$('#row' + i).data('id' , parsedResponse[i].CI); // Attach id to row for 'seeItemData()' function
							}
							else {
								tableType2.append('<tr class="rowHigh" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad + '</td> <td class="stCode">' + parsedResponse[i].CI + '</td> </tr>');
								$('#row' + i).data('idType' , 'numeric'); // From the club Joshua onwards the id type is only numeric (and MUST be)
								$('#row' + i).data('id' , parsedResponse[i].CI); // Attach id to row for 'seeItemData()' function
							}	
						}
					} 
			},
			error : function (error) {
				console.log(error);
			}
	});

	idType = 'CI';
}


/* */
function showPersonalTable(req) {
	push.play();
	//
	if (req == 'Teachers') {
		actualClub = req;
		$('.tableTitle').text('Mentores');
		$('.addPersonal').children('p').text('Añadir Mentor');
		$('.removePersonal').children('p').text('Remover mentor')
		$('.thPosition').text('Club');

		// Change event handler to add teachers in database //
		$('.addPersonal').off('click' , addPersonalIn);
		//
		$('.addPersonal').on('click' , addTeacherIn);

	}
	else if (req == 'Personal') {
		actualClub = req;
		$('.tableTitle').text('Panel Administrativo');
		$('.addPersonal').children('p').text('Añadir Personal');
		$('.removePersonal').children('p').text('Remover Personal');
		$('.thPosition').text('Ocupación');

		// Change event handler to add personal in database //
		$('.addPersonal').off('click' , addTeacherIn);
		//
		$('.addPersonal').on('click' , addPersonalIn);
	}
	else {
		/* ... */
	}
	
	actualMenu = $('#personalTable');
	idType = 'CI';

	showClubData('tp' , actualMenu);

	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : {
			'personalTable' : req
		},
		success : function (response) {
			console.log(response);
			parsedResponse = jQuery.parseJSON(response);

			let tableName = actualClub == 'Teachers' ? 'Mentores' : 'Directiva';

			let club = clubsInfo[ Object.keys( clubsInfo ).filter(key => clubsInfo[key].Nombre == tableName )[0] ];
				
					if ( club !== undefined ) {
						$('.innerClubIcon').text(club.Abreviación); // Change club icon text
						$('.innerClubIcon').css('background' , club.Color) // Change club icon bg color
					}

				if (parsedResponse.length >= 1) {
					// Append Results //
					for (var i = 0; i < parsedResponse.length; i++) {

						for (var j = 0; j < Object.keys(parsedResponse[i]).length; j++) { // Check null values and replace "null" by S/D
							if ( parsedResponse[i][ Object.keys(parsedResponse[i])[j] ] == null ) {
								parsedResponse[i][ Object.keys(parsedResponse[i])[j] ] = 'S/D';
							}
						}

						if (req == 'Teachers') {
							if (i % 2 == 0) {
								personalTable.append('<tr class="rowWhite" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad + '</td> <td class="stPosition">' + parsedResponse[i].Club + '</td> <td class="stCode">' + parsedResponse[i].CI + '</td> </tr>');
							}
							else {
								personalTable.append('<tr class="rowHigh" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad + '</td> <td class="stPosition">' + parsedResponse[i].Club + '</td> <td class="stCode">' + parsedResponse[i].CI + '</td> </tr>')
							}

							$('#row' + i).data('id' , parsedResponse[i].CI) // Attach id to row for 'seeItemData()' function
						}
						else if (req == 'Personal') {
							if (i % 2 == 0) {
								personalTable.append('<tr class="rowWhite" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad + '</td> <td class="stPosition">' + parsedResponse[i].Ocupación + '</td> <td class="stCode">' + parsedResponse[i].CI + '</td> </tr>');
							}
							else {
								personalTable.append('<tr class="rowHigh" id="row' + i +  '" onclick="selectItem(this)"> <td class="stName">' + parsedResponse[i].Nombres + '</td> <td class="stLastName">' + parsedResponse[i].Apellidos + '</td> <td class="stAge">' +  parsedResponse[i].Edad + '</td> <td class="stPosition">' + parsedResponse[i].Ocupación + '</td> <td class="stCode">' + parsedResponse[i].CI + '</td> </tr>')
							}

							$('#row' + i).data('id' , parsedResponse[i].CI) // Attach id to row for 'seeItemData()' function
						}
					}
				}
			//
				
		},
		error : function (error) {
			console.log(error);
		}
		

	})
}

/* End of functions to show each club's and teacher's/personal data*/

// //

/* Panel form functions */ 

var addStForm = $('#st-Panel-Form');
var sendFormBtn = $('#st-Panel-Form-Btn');

function alterForm(club) {
	if (club == 'M' || club == 'S' || club == 'J') {
		let outKeys = ['CI', 'spouse'];
		let inKeys = ['Rep'];

		for (var i = 0; i < outKeys.length; i++) {
			$('label[for=' + outKeys[i] + ']').delay(250).fadeOut(250);
			//
			$('input[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			$('input[name=' + outKeys[i] + ']').delay(250).val('');
			//
			$('select[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			console.log($('select[name=' + inKeys[i] + ']'));
			$('select[name=' + outKeys[i] + ']').val('0');
		}

		for (var i = 0; i < inKeys.length; i++) {
			$('label[for=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('input[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('select[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
		}

		// Change required fields to add...
		requiredKeys = ["Names", "Lastnames", "Age", "Rep"];
		alterReqKeys(requiredKeys);
	}
	else if (club == 'D') {
		let outKeys = ['spouse'];
		let inKeys = ['Rep', 'CI'];

		for (var i = 0; i < outKeys.length; i++) {
			$('label[for=' + outKeys[i] + ']').delay(250).fadeOut(250);
			//
			$('input[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			$('input[name=' + outKeys[i] + ']').delay(250).val('');
			//
			$('select[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			$('select[name=' + outKeys[i] + ']').val('0');
		}

		for (var i = 0; i < inKeys.length; i++) {
			$('label[for=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('input[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('select[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
		}

		// Change required fields to add...
		requiredKeys = ["Names", "Lastnames", "Age", "Rep"];
		alterReqKeys(requiredKeys);
	}
	else if (club == 'JN' || club == 'JS' || club == 'JB' || club == 'DN') {
		let outKeys = ['spouse', 'Rep'];
		let inKeys = ['CI'];

		for (var i = 0; i < outKeys.length; i++) {
			$('label[for=' + outKeys[i] + ']').delay(250).fadeOut(250);
			//
			$('input[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			$('input[name=' + outKeys[i] + ']').delay(250).val('');
			//
			$('select[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			$('select[name=' + outKeys[i] + ']').val('0');
		}

		for (var i = 0; i < inKeys.length; i++) {
			$('label[for=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('input[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('select[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
		}

		// Change required fields to add...
		requiredKeys = ["Names", "Lastnames", "Age", "CI"];
		alterReqKeys(requiredKeys);
	}
	else if (club == 'T' || club == 'N' || club == 'Personal') {
		let outKeys = ['Rep'];
		let inKeys = ['CI', 'spouse'];

		for (var i = 0; i < outKeys.length; i++) {
			$('label[for=' + outKeys[i] + ']').delay(250).fadeOut(250);
			//
			$('input[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			$('input[name=' + outKeys[i] + ']').delay(250).val('');
			//
			$('select[name=' + outKeys[i] + ']').delay(250).fadeOut(250);
			$('select[name=' + outKeys[i] + ']').val('0');
		}

		for (var i = 0; i < inKeys.length; i++) {
			$('label[for=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('input[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
			$('select[name=' + inKeys[i] + ']').delay(250).fadeIn(250);
		}

		// Change required fields to add...
		requiredKeys = ["Names", "Lastnames", "Age", "CI", "spouse"];
		alterReqKeys(requiredKeys);
	}
	/*
	else if (club == 'Personal') {
		// Change required fields to add...
		requiredKeys = ["Names", "Lastnames", "Age", "CI", "spouse"];
		alterReqKeys(requiredKeys);
	}
	*/
} 

function addSt(event) {
	// Object with data initialization... //

	obj = {
		'Club' : $.trim ($('select[name="st-Panel-Form-Club"] > option:selected').text()),
		'ClubIni' : $.trim( $('select[name="st-Panel-Form-Club"]').val()  ),
		'Nombres' : $.trim( $('input[name=Names]').val() ) ,
		'Apellidos' : $.trim( $('input[name=Lastnames]').val() ),
		'FechaDeNacimiento' :  $('input[name=Birthday]').val(),
		'Edad' : Number( $('input[name=Age]').val() ) ,
		'Sexo' : $('select[name=Sex]').val(),
		'Dirección' : $.trim( $('input[name=address]').val() ),
		'Representante' : $.trim( $('input[name=Rep]').val() ),
		'Cónyuge' : $('select[name=spouse]').val(),
		'Teléfono' : Number( $('input[name=phone]').val() ),
		'CI' : Number( $('input[name=CI]').val() ),
		'Código' : false
	};

	for (var i = 0; i < Object.keys(obj).length; i++) {
		if ( obj[Object.keys(obj)[i]] == 0) {
			console.log( obj[Object.keys(obj)[i]] );
			delete obj[Object.keys(obj)[i]];
		}
	}

	if (obj.ClubIni == 'JN' || obj.ClubIni == 'JS' || obj.ClubIni == 'JB' || obj.ClubIni == 'DN') {
		delete obj.Cónyuge;
	}
	else if (obj.ClubIni == 'D') {
		if (!obj.CI == '') {
			obj.Código = obj.CI; // Replace false by CI if the new student already has a CI.
			delete obj.CI;
		}
		else {
			obj.Código = 'x'; // Replace false by 'x' to allow special code creation on server side.
		}
	}

	console.log(obj);

	let play = true; // Var to save sound playing timeout

	// Ajax //

	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : { 
			'addSt' : obj.ClubIni,
			'dataSet' : obj
		},
			success : function (response) {
				console.log(response);
				console.log(jQuery.parseJSON(response));
				let parsedResponse = jQuery.parseJSON(response);

					if (parsedResponse[1] == 'Done') {

						success.play();
						
						play = false;

						console.log(parsedResponse[0]);
						$('#st-Panel-Form').hide();
						//
						$('#successText').text('¡Estudiante añadido a la base de datos con Éxito!');
						$('#successNote').text('Estudiante añadido al Club: ' + parsedResponse[0].Club + ', puede ser editado desde su club o la base de datos, o buscado según su identificación : ' + parsedResponse[0].CI);
						$('#st-Panel-Form-Success').show();

						$('#st-Panel-Form > input').val('') // Clean filled fields

					}
					else {

						alert('Fail!');

						setTimeout( function () {
							if ( !$('#st-Panel-Form-Success').is(':visible') ){

								$('#formErrorMsg').text( parsedResponse[1] );
								$('#formErrorMsg').fadeIn(200);
								error.play();

								sendFormBtn.one('click' , function () {
									addSt();
								});

								console.log( parsedResponse );
							}
						}, 500)

					}
			},
			error : function (error) {
				$('#formErrorMsg').text('Error en el Servidor... Reinicia o chequea la aplicación Apache.');
				$('#formErrorMsg').fadeIn(200);
			}

	})
}

function addTeacher() {
	obj = {
		'Nombres' : $.trim( $('input[name=Names]').val() ) ,
		'Apellidos' : $.trim( $('input[name=Lastnames]').val() ),
		'Edad' : Number( $('input[name=Age]').val() ) ,
		'FechaDeNacimiento' :  $('input[name=Birthday]').val(),
		'Dirección' : $.trim( $('input[name=address]').val() ),
		'Sexo' : $('select[name=Sex]').val(),
		'Cónyuge' : $('select[name=spouse]').val(),
		'Club' : $.trim ($('select[name="teacher-Panel-Form-Club"] > option:selected').text()),
		'Teléfono' : Number( $('input[name=phone]').val() ),
		'CI' : Number( $('input[name=CI]').val() ),
	};

	for (var i = 0; i < Object.keys(obj).length; i++) {
		if ( obj[Object.keys(obj)[i]] == 0) {
			delete obj[Object.keys(obj)[i]];
		}
	}
	
	
	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : {
			'addTeacher' : true,
			'dataSet' : obj
		},
		success : function (response) {
			console.log(response);
			let parsedResponse = jQuery.parseJSON(response);

				if (parsedResponse[1] == 'Done') {
					console.log(parsedResponse);

					success.play();

					$('#st-Panel-Form').hide();
						//
						$('#successText').text('¡Mentor añadido a la base de datos con Éxito!');
						$('#successNote').text('Profesor asignado al Club: ' + parsedResponse[0].Club + ', puede ser editado desde la sección mentores, o buscado según su identificación : ' + parsedResponse[0].CI);
						$('#st-Panel-Form-Success').show();
				}
				else {
					
					setTimeout( function () {
							if ( !$('#st-Panel-Form-Success').is(':visible') ){

								$('#formErrorMsg').text(parsedResponse[1]);
								$('#formErrorMsg').fadeIn(200);
								error.play();

								sendFormBtn.one('click' , function () {
									addTeacher();
								});

							}
						}, 500)

				}
			

			
		},
		error : function (error) {
			$('#formErrorMsg').text('Error en el Servidor... Reinicia o chequea la aplicación Apache.');
			$('#formErrorMsg').fadeIn(200);
		} 
	})
	
}

function addPersonal() {
	obj = {
		'Nombres' : $.trim( $('input[name=Names]').val() ) ,
		'Apellidos' : $.trim( $('input[name=Lastnames]').val() ),
		'Edad' : Number( $('input[name=Age]').val() ) ,
		'FechaDeNacimiento' :  $('input[name=Birthday]').val(),
		'Dirección' : $.trim( $('input[name=address]').val() ),
		'Sexo' : $('select[name=Sex]').val(),
		'Cónyuge' : $('select[name=spouse]').val(),
		'Ocupación' : $('select[name="personal-Panel-Form-Position"]').val(),
		'Teléfono' : Number( $('input[name=phone]').val() ),
		'CI' : Number( $('input[name=CI]').val() ),
	};

	for (var i = 0; i < Object.keys(obj).length; i++) {
		if ( obj[Object.keys(obj)[i]] == 0) {
			delete obj[Object.keys(obj)[i]];
		}
	}

	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : {
			'addPersonal' : true, 
			'dataSet' : obj
		},
		success : function (response) {
			console.log(response);

				let parsedResponse = jQuery.parseJSON(response);

				if (parsedResponse[1] == 'Done') {
					success.play();
					//
					$('#st-Panel-Form').hide();
						//
						$('#successText').text('¡Personal añadido a la base de datos con Éxito!');
						$('#successNote').text('Personal añadido como ' + parsedResponse[0].Ocupación + ', puede ser editado desde la sección del Personal Administrativo, o buscado según su identificación : ' + parsedResponse[0].CI);
						$('#st-Panel-Form-Success').show();
				}
				else {

					setTimeout( function () {
							if ( !$('#st-Panel-Form-Success').is(':visible') ){

								$('#formErrorMsg').text(parsedResponse[0]);
								$('#formErrorMsg').fadeIn(200);
								error.play();

								sendFormBtn.one('click' , function () {
									addPersonal();
								});

							}
						}, 500)

				}
				
		},
		error : function (error) {
			alert(error);
		}
	})
}

/* Date */

function calcAge(birth) {
	let date = new Date();
	let oldDate = new Date(birth);
	//
	let age = date.getUTCFullYear() - oldDate.getUTCFullYear() - 1; 

		// Add one year if birthday!! :) :D //
		if (date.getUTCMonth() >= oldDate.getUTCMonth() && date.getUTCDay() >= oldDate.getUTCDay()) {
			age ++;
		}

		$("input[name='Age']").val(age);
}

/* Check empty fields */

var requiredKeys = ["Names", "Lastnames", "Age", "Rep"];

function alterReqKeys(keys) {
	let counter = 0;
		for (var i = 0; i < keys.length; i++) {
			$.trim( $('input[name=' + keys[i] + ']').val() ) !== '' ? counter ++ : false;
			$.trim( $('select[name=' + keys[i] + ']').val() ) !== '' ? counter ++ : false;
		}
		// //
			if ( counter == keys.length ) {
				sendFormBtn.attr('disabled', false);
				sendFormBtn.css({ 'backgroundColor' : '#60b750' , 'border' : '1px solid  #32921f' , 'boxShadow' : ' inset 0 1px 0 #6bde31'});

					sendFormBtn.hover(
						function (event) {
							$(event.currentTarget).css('backgroundColor' , '#4AA23A');
						},
						function (event) {
							$(event.currentTarget).css('backgroundColor' , '#60b750');
						}
					)
			}
			else {
				 sendFormBtn.attr('disabled', true);
				 sendFormBtn.css({ 'backgroundColor' : '#80808073' , 'border' : '1px solid  #80808073' , 'boxShadow' : '0px 0px 0px 0px'});
			}
		// //
}

/* Check fields on input */
$('#st-Panel-Form > input').on('input', function () {
	alterReqKeys(requiredKeys);
} );

/* Table functions */
// Find item //
function findTableItem(keyword) {
	
	let matchesArray = [];
	
	// Iterate over table rows //
	for ( var i = 0; i < actualMenu.children('.data').children('table').children('tbody').children().length; i++ ) {
		
		let item = $(actualMenu.children('.data').children('table').children('tbody').children()[i]);

			// Check if row was previously matched //
			if ( item.data('matched') ) {

				item.data('matched' , false);

				 if ( item.attr('class') == 'rowWhite' ) {
				 	item.css('backgroundColor' , 'white');
				 }
				 else {
				 	item.css('backgroundColor' , '#F8F6FF');
				 }

			}
		
		wordsArr = $.trim( item.children('.stName').text() + ' ' + item.children('.stLastName').text() ).toLocaleLowerCase().split(' ');
		
		let keywordsArr = keyword.toLocaleLowerCase().split(' ');

			keywordsArr.forEach( function (element) {
				if ( wordsArr.includes(element) ) {
					item.data('matched' , true);
					matchesArray.push(item);
				}
			})
			
	}
	
	matchesArray.forEach( function (element) {
			element.css('backgroundColor', 'yellow');
		}
	);
	
	let firstMatchScroll = matchesArray[0].offset();

	let offsetTop = firstMatchScroll.top - 300;

	$('.data').scrollTop( offsetTop );
	console.log(offsetTop);

}

$('.findItemInTable').keypress( function (event) {
	if ( event.which == 13 ) {
		findTableItem( $.trim( $(event.currentTarget).val() ) );
		console.log('S');
	}
});

// findTableItem( $('#findItemInTable').val() )
// Select item //
var selectedItems = [];

function selectItem(e) {
	if ( selectedItems.some( item => item.attr('id') === $(e).attr('id') ) ) {
		selectedItems = selectedItems.filter(items => items.attr('id') !== $(e).attr('id') ); // Filter selected items array pushing out the double clicked element
		//
		if ( $(e).data('matched') ) {
			$(e).css('backgroundColor', 'yellow');
		} 
		else if ( $(e).attr("class") == 'rowHigh' ) {
			$(e).css('backgroundColor', '#F8F6FF');
		} 
		else {
			$(e).css('backgroundColor', 'white');
		}

		if ( selectedItems.length == 0 ) {
			$('.removeStudent , .moveStudent , .removePersonal , .seeItem ').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'});
		}
		else if ( selectedItems.length > 1 ) {
			$('.seeItem').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'});
		}
		else {
			$('.seeItem').css({'pointer-events' : 'auto', 'backgroundColor' : 'transparent'});
		}

	}
	else {
		$(e).css('backgroundColor', 'rgba(18, 214, 61, 0.48)');
		selectedItems.push( $(e) );

		if (selectedItems.length == 1) {
			$('.removeStudent , .moveStudent , .removePersonal , .seeItem').css({'pointer-events' : 'auto', 'backgroundColor' : 'transparent'});
			/* Re-attach hover event */
			$('.removeStudent , .moveStudent , .removePersonal , .seeItem').hover(
				function () {
					$(this).css('backgroundColor' , '#DCDCDC3D');
				},
				function () {
					$(this).css('backgroundColor' , 'transparent');
				}
			);
		}
		else {
			$('.seeItem').css({'pointer-events' : 'none', 'backgroundColor' : '#DCDCDC3D'}); // Disable "see info" button
			//
			$('.removeStudent , .moveStudent , .removePersonal').css({'pointer-events' : 'auto', 'backgroundColor' : 'transparent'});
			/* Re-attach hover event */
			$('.removeStudent , .moveStudent , .removePersonal').hover(
				function () {
					$(this).css('backgroundColor' , '#DCDCDC3D');
				},
				function () {
					$(this).css('backgroundColor' , 'transparent');
				}
			);
		}
	}
}

/* Search functions */

searchBar.children().hide(); // Hide children element of search bar (for animation)

function search(event) {


	if ( $('input[name="search"]').val().replace(/\s/g , '').length ) { 

	let input = $('input[name="search"]').val().trim().split(" ");

	let resultsContainer = $('#searchResultsContainer');

		// Http request //

		$.ajax( {
			url : '../PHP/kerygmaDb.php',
			type : 'POST',
			data : {
				'searchData' : true,
				'input' :  input,
				'searchParameter' : $('select[name="searchBy"]').val()
			},
				success : function (response) {

					console.log(input);
					console.log(response);
					console.log( jQuery.parseJSON(response) );
					console.log( jQuery.parseJSON(response).length );

					$('.noSearchResults').remove(); // Remove 'no results found' text
					$('.result').remove(); // Remove previous results
					

					let parsedResponse = jQuery.parseJSON(response);

						if ( parsedResponse.length >= 1 && input !== false) {

							for ( var i = 0; i < parsedResponse.length; i++ ) {

								let completeName = parsedResponse[i].Nombres + ' ' + parsedResponse[i].Apellidos;

								// Calculate equality with input //
								let resultPercentage = 0;

								for (var j = 0; j < input.length; j++) {

									if ( completeName[j] != undefined ) {
										if ( input[j].toLocaleLowerCase() == completeName[j].toLocaleLowerCase() ) {
											resultPercentage ++;
										}
									}
									
								}

								parsedResponse[i]['resultPercentage'] = resultPercentage;

							}

							/* Order results array by equality percentage to given input */
							let orderedResults = parsedResponse.sort( function ( a, b ) {

								if ( a['resultPercentage'] < b['resultPercentage'] ) {
									return 1;
								}
								else {
									return - 1;
								}

								return 0;

							} );

							let reorderedResults = orderedResults.sort( function ( a, b) {

								if ( a.Nombres.concat( ' ' , a.Apellidos ) == b.Nombres.concat( ' ' , b.Apellidos ) ) {
									return 1;
								}
								else {
									return - 1;
								}

								return 0;

							} );

							console.log(reorderedResults);

								/* Append ordered results in results box 
								for ( var i = 0; i < reorderedResults.length; i++) {

									let completeName = reorderedResults[i].Nombres + ' ' + reorderedResults[i].Apellidos;

									resultsContainer.children('ul').append( '<li>' + completeName + '</li>');



								} 

								/* Append result elements */

								for (var n = 0; n < reorderedResults.length; n++) {

									resultsContainer.children('ul').append( '<li class="resultWrapper" id="resultWrapper' + n + '"> </li>');

									let resultElement =  $( $('.searchResult')[0] ).clone();

									$('#resultWrapper' + n).append(resultElement);
									$('#resultWrapper' + n).addClass('result');
									$('#resultWrapper' + n).data( 'table' , reorderedResults[n].club );

									let resultInfoContainer = $('#resultWrapper' + n).children('.searchResult').children('.resultDetails');
									let resultTable = $('#resultWrapper' + n).children('.searchResult').children('.resultTable');
									//
									let clubObj = clubsInfo[ Object.keys( clubsInfo ).filter(key => clubsInfo[key].Nombre == $('#resultWrapper' + n).data('table'))[0] ];
										/* Parse result data */

										resultInfoContainer.children('.resultTitle').text( reorderedResults[n].Nombres + ' ' + reorderedResults[n].Apellidos);
										resultInfoContainer.children('.resultAge').text( reorderedResults[n].Edad );

										// Show item table's icon
										resultTable.children('.resultTableIcon').children('p').text( clubObj.Abreviación );
										resultTable.children('.resultTableIcon').attr('title' , clubObj.Nombre);

											/* Show Gender */
											resultInfoContainer.children('.resultSex').text( reorderedResults[n].Sexo );

												if ( reorderedResults[n].Sexo == 'Femenino' ) {
													resultInfoContainer.children('.genderIcon').children('img').attr('src' , '../recursos/imagenes/Kerygma/femaleGender.png');
												}
												else if ( reorderedResults[n].Sexo == 'Masculino' ) {
													resultInfoContainer.children('.genderIcon').children('img').attr('src' , '../recursos/imagenes/Kerygma/maleGender.png');
												}
												else {

												}
									

												/* Parse ID */
												if ( reorderedResults[n].hasOwnProperty('CI') ) {
													$('#resultWrapper' + n).data( 'id' , reorderedResults[n].CI );
													$('#resultWrapper' + n).data('idType' , 'CI');
													resultInfoContainer.children('.resultId').text( reorderedResults[n].CI );
												}
												else {
													$('#resultWrapper' + n).data( 'id' , reorderedResults[n].Código );
													$('#resultWrapper' + n).data('idType' , 'Código');
													resultInfoContainer.children('.resultId').text( reorderedResults[n].Código );
												}

									//	resultInfoContainer.children('.resultId').text( reorderedResults.Sexo );

									$('#resultWrapper' + n).on('click' , function (event) {
										
										

										let selected = $(event.currentTarget);

										console.log( $(selected).data('table') );

										showPersonalData( undefined , $(selected).data('id') , $(selected).data('table') , $(selected).data('idType'));

										actualClub = $(selected).data('table');
										idType =  $(selected).data('idType');

										$( searchItemContainer ).hide();

										lastMenu.children('.data').children('table').children('tbody').children('.rowHigh, .rowWhite').remove();

										$('.result').remove();
									});

								}

								console.log( reorderedResults.length );

								$(window).off("resize");

								resizeCircles();

								$(window).resize( function (event) {
									resizeCircles();
								});
						}
						else {
							resultsContainer.children('ul').prepend('<p class="noSearchResults"> No hay resultados para la busqueda  <br> <p class="noSearchResults" style="font-size : 170%"> :\'( </p> ');
						}
						

					

				},
				error : function (error) {
					alert(error);
				}
		});

}
else {
	
}

}


 // Trigger search function if ENTER key was pressed 
$('#searchInput').keypress( function (event) {
	if ( event.which == 13 ) {
		search();
	}
});


// Close search box 
function closeSearch() {
	$('.noSearchResults').remove(); // Remove 'no results found' text
	$('.result').remove(); // Remove previous results

	searchDataBox.fadeOut(200);
	searchBar.css('width' , '0%');
	searchBar.children().hide();
}

/* In club-menu functions */

// Add student in menu //
function addStIn() {
	clubAbbr = clubsInfo[ Object.keys(clubsInfo).filter( key => clubsInfo[key].Nombre == actualClub)[0] ].Abreviación;
	//
	push.play();
	//
	addDataBox.delay(200).fadeIn(200);
	$('#addStudent-Panel').trigger('click');
	// Alter form according to actual club
	$('select[name="st-Panel-Form-Club"]').val( clubAbbr.replace(/\s/g, '') ); 
	alterForm( $('select[name="st-Panel-Form-Club"]').val() ); 
	alterReqKeys(requiredKeys); 
	/*
	//
	addDataBox.children('p').text('Añadir Estudiante');
	$('#st-Panel-Form > h2').text('Añadir a los..');
	$('select[name="st-Panel-Form-Club"]').show();
	$('select[name="teacher-Panel-Form-Club"]').hide();
	$('select[name="personal-Panel-Form-Position"]').hide();
	//
	$('select[name="st-Panel-Form-Club"]').val( clubAbbr.replace(/\s/g, '') );
	alterForm( $('select[name="st-Panel-Form-Club"]').val() );
	alterReqKeys(requiredKeys);
	addDataBox.fadeIn(200);
	addDataBox.css('height' , '50%');
	$('#st-Panel-Form').show();
	$('.addDataButtons').hide(); */


	//
}

// And teacher in menu //
function addTeacherIn() {
		push.play();
		addDataBox.delay(200).fadeIn(200);
		$('#addTeacher-Panel').trigger('click');

}

// Add personal in menu //
function addPersonalIn() {
		push.play();
		addDataBox.delay(200).fadeIn(200);
		$('#addPersonal-Panel').trigger('click');
}

/* Delete / Move dialogs and "see Data" function*/
var deleteDialog = $('.deletePrompt');
var moveDialog = $('.movePrompt');

var lastDialog = null;

var names = [];

function getSubString( string ) {
	let index = string.indexOf(' ');

	let subString = string.slice(index + 1, index.length);

	return subString;
}

function showDialog(e) {

	let btnClass = getSubString( $(e).attr('class') );

	console.log(btnClass);

	if ( btnClass == 'removeStudent' || btnClass == 'removePersonal' ) {
		push.play();
		$(e).css('pointer-events' , 'none');
		deleteDialog.show();
		moveDialog.hide();
		lastDialog = deleteDialog;

			if (actualClub == 'Teachers') {
				$('.deletePrompt > p').text('¿Deseas remover los siguientes mentores?');
			}
			else if (actualClub == 'Personal') {
				$('.deletePrompt > p').text('¿Deseas remover el siguiente personal?');
			}
			else {
				$('.deletePrompt > p').text('¿Deseas remover los siguientes estudiantes del Club ' + actualClub + '?');
			}
	}
	else if ( btnClass == 'moveStudent') {

		push.play();
		$(e).css('pointer-events' , 'none');
		moveDialog.show();
		deleteDialog.hide();
		lastDialog = moveDialog;
		//
		$('.transferReqKeys').hide();
		$('.transferSuccess').hide();
			
			let destClubs = [];

				if ( idType == 'CI' ) {

					destClubs = [];

						Object.keys(clubsInfo).forEach( function (element) {
							console.log(element);
							console.log( clubsInfo[element] );
							if ( clubsInfo[element].Nombre !== actualClub && clubsInfo[element].Nombre != 'Directiva' && clubsInfo[element].Nombre != 'Mentores' && clubsInfo[element].Id == 'CI' ) {
								destClubs.push( clubsInfo[element].Nombre )
							}
						} );

					
					console.log( destClubs );
				}
				else {

					destClubs = [];

						Object.keys(clubsInfo).forEach( function (element) {
							if ( clubsInfo[element].Nombre == 'Juan' ) { // Add exception to club "Jhon"
								destClubs.push( clubsInfo[element].Nombre );
							}
							else {
								if ( clubsInfo[element].Nombre !== actualClub && clubsInfo[element].Nombre != 'Directiva' && clubsInfo[element].Nombre != 'Mentores' && clubsInfo[element].Id == 'Código' ) {
									destClubs.push( clubsInfo[element].Nombre );
								}
							}
							
						} );


					console.log( destClubs );

				}

					for (var i = 0; i < destClubs.length; i++) {
						$('.moveStClub').append('<option value="' + destClubs[i] + '">' + destClubs[i] + '</option>')
					}
			
	}
	//
	names = [];

	function getSubStr(str) { // Return first name and last name in string //
		return ( str.includes(' ') ? str.substring(0, str.indexOf(' ')) : str );
	}

	selectedItems.forEach( function (element) {
		names.push( getSubStr( element.children('.stName').text() ) + ' ' + getSubStr( element.children('.stLastName').text() ) );
	});

	names.forEach( function (element) {
		lastDialog.children('div').children('ul').append('<li>' + element + '</li>');
	});

}

function deleteStIn() {

let numericIds = [];
let varcharIds = [];

	selectedItems.forEach( function (element) {
		if ( !isNaN( element.children('.stCode').text() ) ) {
			numericIds.push( element.children('.stCode').text() );
		}
		else {
			varcharIds.push( element.children('.stCode').text().trim() );
		}
	});
	
	console.log(numericIds , varcharIds);

	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : { 
			'deleteSt' : true,
			'club' : actualClub,
			'idType' : idType,
			'numericIds' : JSON.stringify(numericIds),
			'varcharIds' : JSON.stringify(varcharIds)
		},
			success : function(response) {

				console.log( response );
				console.log(jQuery.parseJSON(response));

				if (response) {
					selectedItems.forEach( function (element) { //Remove rows of deleted students from their table
						$(element).remove();
					});

					selectedItems = []; //Clear array

					numericIds = [];
					varcharIds = [];
					

					deleteDialog.children().hide();

						$('.deleteSuccess > p').text('Estudiantes eliminados con éxito de la base de datos');
						$('.closeDeletePrompt').show();
						$('.deleteSuccess').show();

					success.play();

					console.log( response );
				}

			},
			error : function(error) {
				console.log(error);
			}
	})
};

var presentData = [];
var transferDestinyClub = null;

var addData = null;

function checkStTransfer(e) {
	
	let clubIndex = Object.keys( clubsInfo ).filter(key => clubsInfo[key].Nombre == actualClub);

	transferDestinyClub = $.trim( $(e).parent().children('select').val() ) ;

	let reqFields = {
		'CI' : '<input class="tranReqFields" name="transferCI" type="number" placeholder="Cédula">',
		'Cónyuge' : '<select class="tranReqFields" name="transferSpouse"><option value="No"> No </option><option value="Cristiano"> Sí, Cristiano </option><option value="Inconverso"> Sí, Inconverso </option><option value="78972" selected> ¿Cónyuge? </option></select>',
		'Representante' : '<input class="tranReqFields" name="transferRep" type="text" placeholder="Representante">'
	};


	let ids = [];
	
		selectedItems.forEach( function (element) {
			ids.push( element.children('.stCode').text() );
			console.log( isNaN(element.children('.stCode').text()) );
		});

		$.ajax({
			url : '../PHP/kerygmaDb.php',
			type : 'POST',
			data : {
				'checkTransfer' : true,
				'previousClub' : clubsInfo[ clubIndex ].Nombre,
				'destinyClub' : transferDestinyClub
			},
			success : function (response) {
				console.log(response);
					let parsedResponse = jQuery.parseJSON(response);

					/* Confirm if aditional data is required */ 
					if ( parsedResponse[1].length >= 1 ) {

						/* Properties to resize close button */
						let closeBtnProp = window.getComputedStyle( actualMenu.children('.movePrompt').children('.closeMovePrompt')[0]  );

						let closeBtnWidth = closeBtnProp.getPropertyValue('width');  // CSS width for close button
						let closeBtnHeight = closeBtnProp.getPropertyValue('height'); // CSS height for close button

						/* Edit move dialog CSS */
						moveDialog.css('height' , 'auto');

						addData = 1; // Decide if aditional data must be send in transfer function

						presentData = parsedResponse[0];
						aditionalKeys = parsedResponse[1];


						console.log( aditionalKeys );
						/* Hide transfer dialog elements*/
						moveDialog.children().hide();
						//
						let reqKeysContainer = actualMenu.children('.movePrompt').children('.transferReqKeys');

						reqKeysContainer.show();

						/* Resize close button */
						$('.closeMovePrompt').css('width' , closeBtnWidth ); 
						$('.closeMovePrompt').css('height' , closeBtnHeight );

						$('.closeMovePrompt').show();

						


						let fieldCounter = 0;
						let checkId = null; // Flag to check if a new ID must be given

						for ( var i = 0; i < ids.length; i++ ) {
							console.log(ids.length);

							reqKeysContainer.append('<span class="itemName">' + names[i] + '</span> <br>');

								for (var j = 0; j < aditionalKeys.length; j++) {

									if ( aditionalKeys[j] != 'Código' ) {

										reqKeysContainer.append( reqFields[ aditionalKeys[j] ] + ' <br> ');


										$( $('.tranReqFields')[fieldCounter] ).data('id' , ids[i]);

											if ( !isNaN( selectedItems[i].children('.stCode').text() ) && aditionalKeys[j] == 'CI' ) {
												$( $('.tranReqFields')[fieldCounter] ).val(  selectedItems[i].children('.stCode').text() );
												$( $('.tranReqFields')[fieldCounter] ).attr('readonly' , true);
												$( $('.tranReqFields')[fieldCounter] ).data('check' , false);
												$( $('.tranReqFields')[fieldCounter] ).css('color' , 'gray'); 
												checkId = true;
											}
											else if ( aditionalKeys[j] == 'CI' ) {
												$( $('.tranReqFields')[fieldCounter] ).data('check' , true);
												checkId = true;
											}
										//$( $('.tranReqFields')[fieldCounter] ).addClass(actualMenu.attr('id') + 'Fields');

										fieldCounter ++;

										//console.log( reqFields[ parsedResponse[i] ] );
											

									}
								
								}

						}

						if ( checkId ) {
							reqKeysContainer.append('<button class="dialogAction" onclick="checkTransferId(this)"> Mover </button>');
						}
						else {
							reqKeysContainer.append('<button class="dialogAction" onclick="transferSt(this)"> Mover </button>');
						}
						
					}
					else {
						/* Properties to resize close button */
						let closeBtnProp = window.getComputedStyle( actualMenu.children('.movePrompt').children('.closeMovePrompt')[0]  );

						let closeBtnWidth = closeBtnProp.getPropertyValue('width');  // CSS width for close button
						let closeBtnHeight = closeBtnProp.getPropertyValue('height'); // CSS height for close button

						/* Resize close button */
						$('.closeMovePrompt').css('width' , closeBtnWidth ); 
						$('.closeMovePrompt').css('height' , closeBtnHeight );


						/* Edit move dialog CSS */
						moveDialog.css('height' , 'auto');

						
						addData = 0;

						presentData = parsedResponse[0];
						transferSt(e);
					}
					

			},
			error : function (error) {
				console.log(error);
			}

		})
}

var aditionalData = [];

function checkTransferId(e) {
	let idsToCheck = [];

		for ( var i = 0; i < $('input[name="transferCI"]').length; i++ ) {
			if (  $( $('input[name="transferCI"]')[i] ).data('check') ) {
				idsToCheck.push( $('input[name="transferCI"]')[0].value
 );
			} 
		}


			/* Check new given id's to find repeated in database*/
			if ( idsToCheck.length ) {
				$.ajax({
					url : '../PHP/kerygmaDb.php',
					type : 'POST',
					data : {
						'checkTransferRepId' : true,
						'ids' : idsToCheck
					},
						success : function (response) {
					
							let parsedResponse = jQuery.parseJSON(response);

								if ( parsedResponse[0] ) {
									$('#repCIMsg').remove();
									$('.transferReqKeys').append('<p id="repCIMsg" style="color : red">' + parsedResponse[1] + '</p>');
								}
								else {
									transferSt(e);
								}
							
						},
						error : function (response) {
							alert(error);
						}


				})
			}
}

function transferSt(e) {
	let numericIds = [];
	let varcharIds = [];

	let ids = [];
	
		selectedItems.forEach( function (element) {
			ids.push( element.children('.stCode').text() );
		});

		
	if ( addData  ) {

		ids.forEach( function (element) {
			let fields = [];

				for(var i = 0; i < $('.tranReqFields').length; i++) {
					if ( $( $('.tranReqFields')[i] ).data('id') == element ) {
						fields.push(  $('.tranReqFields')[i]  );
					}
				}

			let arr = [];

				fields.forEach( function (element) {
					arr.push( element.value );
				})

					aditionalData.push(arr);

					//console.log(arr);

					console.log(fields);
		});


	}


	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : {
			'transferSt' : true,
			'aditionalDataIsRequired' : addData,
			'club' : actualClub,
			'destinyClub' : transferDestinyClub,
			'idType' : idType,
			'ids' : ids,
			'presentData' : presentData,
			'aditionalData' : aditionalData 
		},
		success : function (response) {
			console.log(response);
			console.log(ids);
			//c.log( jQuery.parseJSON(response) );

			console.log(aditionalData);
			aditionalData = []; // Clear aditional data array

			let parsedResponse = jQuery.parseJSON(response);

				if ( parsedResponse[1] ) {
					//$('.transferSuccess').show();
					$('.transferSuccess').children('p').text('Estudiantes transferidos con éxito');
					success.play();
					$('.transFailNote').hide();
					$('.transferReqKeys').hide();
					//
					$('.movePrompt').children().hide();
					//
					$('.transferSuccess').show();
					$('.closeMovePrompt').show();
					//
					$('#repCIMsg').remove();

					// Clear selected items array
					selectedItems.forEach( function (element) {
						element.remove();
					});

					selectedItems = [];
				}
				else {
					console.log()
					$(e).parent().append( '<p class="transFailNote">' + parsedResponse[0] + '</p>');
					$('.transFailNote').fadeIn(200);
				}

		},
		error : function (error) {
			aditionalData = [];

			$(e).parent().append( '<p class="transFailNote">' + error + '</p>');
			$('.transFailNote').fadeIn(200);
		}
	})
}

function seeItemData(e) {

	showClubData('seeItem' , actualMenu); // Hide actual club and remove elements that contains requested data
	showPersonalData( $('#personalDataBtn') , selectedItems[0].data('id') , actualClub, idType); // Call function to get the personal item data
	lastMenu.children('.data').children('table').children('tbody').children('.rowHigh, .rowWhite').remove();

}

var actualItemObj = null;

function retrievePersonalData(e) { // For inside button // 
	showPersonalData(e , actualItemObj[idType] , actualClub , idType);
}

function showPersonalData(e , id , club , identificationType) {

	$('#dataFieldsContainer').children().remove();	// Remove previous edit data fields if edti button was clicked!

	if ( !actualMenu.is( $('#itemDataContainer') ) ){
		actualMenu.fadeOut(200);
		lastMenu = actualMenu;
		actualMenu = $('#itemDataContainer'); 
	} 
	
	actualMenu.delay(100).fadeIn(200); // Show container of selected item data
	$('#dataKeys , #dataValues').show(); // Show Data-key : Data-value tables

	$('#dataKeys > li, #dataValues > li ').remove(); // remove previous data

	console.log(id + club + identificationType);

	if ( e !== undefined ) { // Disable see data button if was clicked and enable the brother buttons

		$( e ).css('pointer-events' , 'none'); // Disable click on button 
		$( $(e).siblings()[0] ).css('pointer-events' , 'auto') // Enable click on brother button

		$('.academicDataContainer').fadeOut(200);
		$('.personalDataContainer').delay(100).fadeIn(200);

	}
	
		$.ajax({
			url : '../PHP/kerygmaDb.php',
			type : 'POST',
			data : {
				'getItemData' : true,
				'itemTable' : club,
				'idType' : identificationType,
				'itemId' : id
			},
				success : function (response) {

					let club = clubsInfo[ Object.keys( clubsInfo ).filter(key => clubsInfo[key].Nombre == actualClub )[0] ];
				
					if ( club !== undefined ) {
						$('.innerClubIcon').text(club.Abreviación); // Change club icon text
						$('.innerClubIcon').css('background' , club.Color) // Change club icon bg color
					}
					

					$('#dataFieldsContainer').hide(); // Hide edit input fields

					console.log(response);

					let parsedResponse = jQuery.parseJSON(response);
					console.log(parsedResponse);

					actualItemObj = parsedResponse;

					let itemName = actualItemObj.Nombres.split(' ')[0] + ' ' + actualItemObj.Apellidos.split(' ')[0];

					$('#itemDataContainer').children('.clubName').text( itemName );
					$('#completeNameText').text( actualItemObj.Nombres + ' ' + actualItemObj.Apellidos);
					$('#contactAddress').text( actualItemObj.Dirección );
					$('#contactPhone').text( 0 + actualItemObj.Teléfono );

					// Show item type  //
					let itemType;
					let precedentClub;

					if ( typeof club == 'object' ) {
						precedentClub = club.Nombre;
					}
					else {
						precedentClub = actualClub;
					}


					// Check precedent club //
					if ( precedentClub == 'Teachers' || precedentClub == 'Mentores' ) {
						$('#itemType').text('MENTOR');
						itemType = 'Mentor';
					}
					else if ( precedentClub == 'Personal' || precedentClub == 'Directiva' ) {
						$('#itemType').text('P.ADMINISTRATIVO');
						itemType = 'Personal Administrativo';
					}
					else {
						$('#itemType').text('ESTUDIANTE');
						itemType = 'Estudiante';
					}

					console.log(precedentClub);
					
					// Show mini symbols //
					$('.itemTypeIcons').remove(); // Remove prev symbols

					actualItemObj.ItemIsAlso.forEach( function (element) {
						if ( element != itemType ) {
							if ( element == 'Mentor' ) {
								$('#itemTypeIcons').append('<div class="itemTypeIcons" id="teacherItem"> </div>');
								$('#teacherItem').attr('Title' , 'Este ' + itemType + ' también es un Mentor');	
							}
							else if ( element == 'Personal' ) {
								$('#itemTypeIcons').append('<div class="itemTypeIcons" id="directiveItem"> </div>');
								$('#directiveItem').attr('Title' , 'Este ' + itemType + ' también forma parte del panel adinistrativo');	
							}
							else {
								$('#itemTypeIcons').append('<div class="itemTypeIcons" id="studentItem"> </div>');
								$('#studentItem').attr('Title' , 'Este ' + itemType + ' también es un estudiante');
							}
						}
						
					});

						for ( var i = 0; i < Object.keys(parsedResponse).length; i++ ) {

							if ( parsedResponse[ Object.keys(parsedResponse)[i] ] == null ) { // Check if key value is empty
								//parsedResponse[ Object.keys(parsedResponse)[i] ] = 'S/D';
							} 

							if ( Object.keys(parsedResponse)[i] != 'ItemIsAlso' ) {
								$('#dataKeys').append('<li><p>  ' +  Object.keys(parsedResponse)[i] + ':</p></li>');
								$('#dataValues').append('<li><p> ' +  parsedResponse[ Object.keys(parsedResponse)[i] ] + '</p> </li>');
							} 
							

						}

				},
				error : function (error) {
					console.log(error);
				}
		})

}

function showAcademicData(e) {

	$( e ).css('pointer-events' , 'none'); // Disable click on button 
	$( $(e).siblings()[0] ).css('pointer-events' , 'auto') // Enable click on brother button
	//
	$('.personalDataContainer').fadeOut(200);
	$('.academicDataContainer').delay(100).fadeIn(200);

}

function editPersonalData() {

	$('#dataFieldsContainer').children().remove();

	console.log('x');
	if ( !$('.field').length > 0 ) {

		let dataFieldCont = $('#dataFieldsContainer');

		$('#dataKeys , #dataValues').hide();
		dataFieldCont.show();

		/* Array containing html input and select fields */
		let fieldsArr = [
			'<input type="text" class="fieldVal">',
			'<input type="number" min="1" class="fieldVal">',
			'<input type="date" data-date-format="DD-MMMM-YYYY" value="2001-07-23" class="fieldVal">',
			'<select class="fieldVal"> <option value="Masculino"> Hombre </option> <option value="Femenino"> Mujer </option> </select>',
			'<select name="Cónyuge" class="fieldVal"> <option value="No"> No </option> <option value="Cristiano"> Sí, Cristiano </option> <option value="Inconverso">  Sí, Inconverso </option> <option value="0" hidden> </option> </select>',
			'<select name="Club" class="fieldVal"> <option value="Moises"> Moises </option> <option value="Samuel"> Samuel </option> <option value="José"> José </option><option value="David"> David </option><option value="Juan"> Juan </option><option value="Josué"> Josué </option><option value="Job"> Job</option><option value="Daniel"> Daniel </option><option value="Timoteo"> Timoteo </option> <option value="Noé"> Noé </option> </select>',
			'<select name="Ocupación" class="fieldVal">  <option value="Coordinador"> Coordinador </option><option value="Directiva"> Directiva </option> </select>'
		];

		j = 0; // To iterate object keys

			for ( var i = 0; i < Object.keys(actualItemObj).length; i++ ) {
				let key = Object.keys(actualItemObj)[i];
				let keyVal = actualItemObj[ Object.keys(actualItemObj)[i] ];

				if ( key !== 'FechaDeInsercion' && key !== 'Código' && key !== 'ItemIsAlso' && key !== 'Club') {

					/* Append break line element if 3 fields have been parsed in a row */
					if ( j !== 0 && j % 3 == 0 ) {
						dataFieldCont.append('<br>');
					}

						dataFieldCont.append( '<div class="field" id="field' + j + '"> </div>' );

						let actualField = $('#field' + j);

						if ( key == 'FechaDeNacimiento' ) { // Change key name if it is "birthday" to avoid text overflow
							actualField.append('<span class="fieldName"> F.Nacimiento </span>');
						}
						else {
							actualField.append('<span class="fieldName">' +  key + '</span>');
						}
					

							if ( isNaN(keyVal) ) {

								if ( key == 'FechaDeNacimiento' ) {
									actualField.append( fieldsArr[2] );
								}
								else if ( key == 'Sexo' ) {
									actualField.append( fieldsArr[3] );
								}
								else if ( key == 'Cónyuge' ) {
									actualField.append( fieldsArr[4] );
								}
								else if ( key == 'Club' ) {
									actualField.append( fieldsArr[5] );
								}
								else if ( key == 'Ocupación' ) {
									actualField.append( fieldsArr[6] );
								}
								else {
									actualField.append( fieldsArr[0] );
								}
							
							}
							else {
								actualField.append( fieldsArr[1] );
							}


							$('.fieldVal')[j].setAttribute('name' , key); // Set field name attribute
							$('.fieldVal')[j].value = keyVal; // Set field value



							j ++;

				}	
			
			}

			dataFieldCont.append('<br> <button class="dataButtons" id="saveChanges" onclick="updateData()"> Guardar Cambios </button>'); // Append button to save changes
			dataFieldCont.append('<button class="dataButtons" id="cancelChanges" onclick="returnToInfo()"> Volver </button>'); // Append button to return 
	}
	else {

	}
}

function updateData() {

	let updatedData = {};

	for ( var i = 0; i < $('.fieldVal').length; i++) {
		if ( $('.fieldVal')[i].value !== actualItemObj[ $('.fieldVal')[i].getAttribute('name') ] ) {
			updatedData[ $('.fieldVal')[i].getAttribute('name') ] = $('.fieldVal')[i].value;
		}
	}

	//return updatedData;

	if ( Object.keys( updatedData ).length >= 1 ) {

		$.ajax({
			url : '../PHP/kerygmaDb.php',
			type : 'POST',
			data : {
				'updateData' : true,
				'updatedData' : updatedData,
				'table' : actualClub,
				'idType' : idType,
				'rowId' : actualItemObj[idType]
			},
				success : function (response) {
					console.log(response);
					console.log( jQuery.parseJSON(response) );

						let parsedResponse = jQuery.parseJSON(response);

							if ( parsedResponse == 'Done' ) {

								// Change ID //
								if ( idType == 'CI' ) {
									actualItemObj[idType] = $('input[name="' + idType + '"]').val();
								} 

								
								

								$('#updateDataSuccess , #updateDataFail').remove();
								$('#dataFieldsContainer').append('<div id="updateDataSuccess"><p> Datos actualizados con éxito </p></div>');
								$('#updateDataSuccess').fadeIn(200).delay(3000).fadeOut(200);

								$('#saveChanges').css('pointer-events' , 'none');
								$('.fieldVal').attr('readonly' , true); // Make input fields read-only a few sec

									setTimeout( function () {
										$('#saveChanges').css('pointer-events' , 'auto');
										$('.fieldVal').attr('readonly' , false);
									}, 3000);
							}
							else {
								$('#updateDataSuccess , #updateDataFail').remove();
								$('#dataFieldsContainer').append('<div id="updateDataFail"><p> Error actualizando datos : ' + parsedResponse + ' </p></div>');
								$('#updateDataFail').fadeIn(200).delay(3000);
							}
				},
				error : function (error) {
					console.log(error);
				}

		});

	}
	else {
		console.log('Not data has been changed');
		console.log( updatedData );
	}
	
}

function returnToInfo () {
	$('#dataFieldsContainer').fadeOut(200);
	$('#dataKeys , #dataValues').delay(100).fadeIn(200);
	//
	$('.itemTypeIcons').remove(); // Remove mini-symbols
	$('#dataFieldsContainer').children().remove();
	//
	retrievePersonalData( $('#personalDataBtn') );
}

/* For admin personal and teachers */

function deletePersonalIn() {
	let ids = [];

	selectedItems.forEach( function (element) {
		ids.push( element.children('.stCode').text() );
	});
	
	console.log(ids);

	$.ajax({
		url : '../PHP/kerygmaDb.php',
		type : 'POST',
		data : { 
			'deletePersonal' : true,
			'delete' : actualClub,
			'ids' : ids
		},
			success : function(response) {
				
				if (response) {
					selectedItems.forEach( function (element) { //Remove rows of deleted students from their table
						$(element).remove();
					});

					selectedItems = []; //Clear array

						if ( actualClub == 'Teachers' ) {
							$('.deleteSuccess > p').text('Mentores eliminados con éxito de la base de datos');
						}
						else if ( actualClub == 'Personal' ) {
							$('.deleteSuccess > p').text('Personal eliminado con éxito de la base de datos');
						}

						deleteDialog.children().hide();
						$('.closeDeletePrompt').show();
						$('.deleteSuccess').show();

					success.play();
				}
				else {
					alert('Error removiendo items... Recarga la página e intenta de nuevo, o chequea el servidor XAMPP');
				}
			
			},
			error : function(error) {
				console.log(error);
			}
	})
}


/* Space for code drafts...


$(window).resize( function (event) {

	for ( var i = 0; i < $('.circle').length; i++ ) {
		let circleH = $( $('.circle')[i] ).css('width');
		$( $('.circle')[i] ).css('height' , circleH);
	}

});


 */
