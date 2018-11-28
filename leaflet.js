	//GOOGLE MAPS
	var marker = null;
	var mymap = null;

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

        generarMapa();
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
	function generarMapa() {

        mymap = L.map('map').setView([-33.4377968,-70.6504451], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZXVycXVldGEiLCJhIjoiY2pveWs1YTh2Mms0bzNrcGl1OWdremtpdiJ9.fxU81NktFjsaHLFxgN5WHA'
        }).addTo(mymap);

		//Creamos nuevo marcador de mapa
		var marker = L.marker([-33.4377968,-70.6504451]).addTo(mymap);
		
    }

	//Función para generar un nuevo marcador
    function changeMarkerPosition(coords) {

		//Separamos el string de coordenadas
        var latitud = coords.split(",")[0];
		var longitud = coords.split(",")[1];
		
        mymap.panTo(new L.LatLng(latitud, longitud));

		L.marker([latitud,longitud]).addTo(mymap);
		
    }



