	//GOOGLE MAPS
	var marker = null;
	var map = null;

	//DARKSKY SETTINGS
	var proxy    = 'https://cors-anywhere.herokuapp.com/';
	var site		 = "https://api.darksky.net/forecast/";
	var url_base = proxy + site;
	var key      = "e6af5b5feb891b272e18f5e2fc0370a6/";
	var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]','lang=es','units=auto']
	var coords = {
		stg: '-33.4377968,-70.6504451',
		vlp: '-33.0458456,-71.6196749',
		qta : '-32.879997,-71.2473555',
		pta : '-53.1625446,-70.907785'
	}
	var icons = {
		'clear-night': 'img/clear-night.png',
		'partly-cloudy-night' : 'img/cloudy-night.png',
		'clear-day' : 'img/clear-day.png', 
		'rain' : 'img/rain.png', 
		'snow' : 'img/snowflake.png', 
		'sleet' : 'img/sleet.png', 
		'wind' : 'img/wind.png', 
		'fog' : 'img/fog.png', 
		'cloudy' : 'img/cloudy.png', 
		'partly-cloudy-day' : 'img/cloudy-day.png'
	}

	$(document).ready(function(){

		//Llamada ajax para cargar datos de ciudad de santiago en primera carga de página
		ajaxCall(coords['stg']);

		$(document).on('change','#select',function(){

			var selected = $(this).val();

			if(selected != ""){

				ajaxCall(coords[selected]);

			}

		});

	});

	//Función que realiza llamada a servidor de clima
	function ajaxCall(coords){

		$.ajax({
			url: url_base + key + coords + '?' + queryParams[0] + "&" + queryParams[1] + '&' + queryParams[2] ,
			method: 'GET',
			success:function(data){ 
				
				$('#resumen').text(parseInt(data.currently.temperature) + "º " + data.currently.summary).fadeIn('slow');
				$('#image').attr('src',icons[data.currently.icon]).fadeIn('slow');
				//Cambiamos marcador del mapa y lo centramos (Mandamos texto del select para asignarselo al marcador)
				changeMarkerPosition(coords);

			}

		});

	}
	
	//Función que inicializa mapa con marcador en Santiago de Chile
	function initMap() {
		var text = $('#select option:selected').text();
		var coord = {lat: -33.4377968, lng: -70.6504451};
		map = new google.maps.Map(document.getElementById('map'), {zoom: 8, center: coord});
		//Creamos marcador
		marker = new google.maps.Marker({position: coord, map: map,label:text});
			
	}

	//Función que cambia la posición del marcador centrando el mapa
	function changeMarkerPosition(coords) {

		//Separamos el string de las coordenadas para obtener latitud y longitud por separado 
		var format_coord = coords.split(",");
		var lat = format_coord[0];
		var lng = format_coord[1];
		var label = $('#selected option:selected').text();
		var latlng = new google.maps.LatLng(lat,lng);
		
		marker.setPosition(latlng);
		marker.setLabel(label);
		map.setCenter(latlng);
		
	}



