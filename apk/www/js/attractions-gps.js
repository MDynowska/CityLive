// This example uses the autocomplete feature of the Google Places API.
// It allows the user to find all hotels in a given place, within a given
// country. It then displays markers for all the hotels returned,
// with on-click details for each hotel.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map, places, infoWindow;
var markers = [];
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
var userId = localStorage.getItem('userId')
var userEmail = localStorage.getItem('userEmail')

var g_lokalizacja;

// function checkGPS() {
//     var onSuccess = function(position) {
//         var gps_cords = [position.coords.latitude, position.coords.longitude];
//         console.log("Z getgps - " + gps_cords);
//         // var bagry = new google.maps.LatLng(gps_cords[0], [1]);
//         // console.log(g_bagry);
//         g_lokalizacja = gps_cords;
//         // console.log(gps_cords[0]);
//     }
//     function onError(error) {
//         alert('code: '    + error.code    + '\n' +
//         'message: ' + error.message + '\n');
//     }
//     navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: Infinity, enableHighAccuracy: false });
//     // navigator.geolocation.getCurrentPosition(onSuccess, onError);
// }

// function test() {
//     checkGPS();
//     // console.log("Z init - " + gps_cords)
//     setTimeout(
function initMapNear() {
    // var latLong = new google.maps.LatLng(latitude, longitude);
    // setTimeout(checkGPS(), 10000);
    // callback(checkGPS());
    // var krakow = new google.maps.LatLng(50.06465009999999, 19.94497990000002);
    // var lat = localStorage.getItem(lokalizacja
    var lat = localStorage.getItem('lat')
    var lng = localStorage.getItem('lng')
    var lokalizacja = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById('map'), {
      // zoom: countries['pl'].zoom,
      zoom: 15,
      // center: countries['pl'].center,
      // center: krakow
      center: lokalizacja,
      // mapTypeControl: false,
      // panControl: false,
      // zoomControl: false,
      // streetViewControl: false
    });

    var geocoder = new google.maps.Geocoder();
    function getAddres(param) {
        geocoder.geocode({ 'latLng': param }, function (results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                alert(status);
            }
            // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
                // console.log(results);
                // var address = (results[0].formatted_address);
                var address = (results[0].formatted_address);
                console.log(address);
            }
        });
    }

    var address = getAddres(lokalizacja);
    var marker_lokalizacja = new google.maps.Marker({
          position: lokalizacja,
          map: map,
          title: 'Hello World!'
        });


    // google.maps.event.addListener(marker_lokalizacja, 'click', console.log('Dupa'));
    marker_lokalizacja.addListener('click', function(lokalizacja) {
        var lokalizacja = new google.maps.LatLng(g_lokalizacja[0], g_lokalizacja[1]);
        // console.log("Gowno")
        geocoder.geocode({ 'latLng': lokalizacja }, function (results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
                alert(status);
            }
            // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
                // console.log(results);
                // var address = (results[0].formatted_address);
                var address = (results[0].formatted_address);
                console.log(address);
            }
        })
    });

    getUserFavorites(userId);

    // marker_lokalizacja.addListener('click', console.log(address));
    // marker_lokalizacja.addListener('click',
    //     geocoder.geocode({ 'latLng': lokalizacja }, function (results, status) {
    //         if (status !== google.maps.GeocoderStatus.OK) {
    //             alert(status);
    //         }
    //         // This is checking to see if the Geoeode Status is OK before proceeding
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             // console.log(results);
    //             // var address = (results[0].formatted_address);
    //             var address = (results[0].formatted_address);
    //             console.log(address);
    //         }
    //     }));

    infoWindow = new google.maps.InfoWindow({
      content: document.getElementById('info-content')
    });

    places = new google.maps.places.PlacesService(map);
    console.log(places);
    // google.maps.event.addListener(map, 'bounds_changed', function() {
    google.maps.event.addListener(searchNear, 'click', function() {
        // alert(map.getBounds());
        // clearMarkers();
        // clearResults();
        search();
    });

    function search() {
      var search = {
        bounds: map.getBounds(),
        types: ['cafe']
      };
      // console.log(search);
      places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // clearResults();
          // clearMarkers();
          // Create a marker for each hotel found, and
          // assign a letter of the alphabetic to each marker icon.
          // for (var i = 0; i < results.length; i++) {
          console.log(results.length)
          for (var i = 0; i < 1; i++) {
            var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
            var markerIcon = MARKER_PATH + markerLetter + '.png';
            // Use marker animation to drop the icons incrementally on the map.
            markers[i] = new google.maps.Marker({
              position: results[i].geometry.location,
              animation: google.maps.Animation.DROP,
              icon: markerIcon
            });
            // If the user clicks a hotel marker, show the details of that hotel
            // in an info window.
            markers[i].placeResult = results[i];
            google.maps.event.addListener(markers[i], 'click', showInfoWindow);
            setTimeout(dropMarker(i), i * 100);
            addResult(results[i], i);
          }
        }
        });
    }

    // setTimeout(search(), 1000);
    function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
    markers = [];
    }


    function dropMarker(i) {
        return function() {
          markers[i].setMap(map);
        };
    }

    function addResult(result, i) {
        var results = document.getElementById('results');
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH + markerLetter + '.png';

        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
        tr.onclick = function() {
          google.maps.event.trigger(markers[i], 'click');
    };

        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
        var icon = document.createElement('img');
        icon.src = markerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(result.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        results.appendChild(tr);
    }

    function clearResults() {
        var results = document.getElementById('results');
        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0]);
        }
    }

    // Get the place details for a hotel. Show the information in an info window,
    // anchored on the marker for the hotel that the user selected.
    function showInfoWindow() {
        var marker = this;
        places.getDetails({placeId: marker.placeResult.place_id},
            function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
              infoWindow.open(map, marker);
              buildIWContent(place);
            });
    }

    // Load the place information into the HTML elements used by the info window.
    function buildIWContent(place) {
        document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
            'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
              place.formatted_phone_number;
        } else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }


    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
      var ratingHtml = '';
      for (var i = 0; i < 5; i++) {
        if (place.rating < (i + 0.5)) {
          ratingHtml += '&#10025;';
        } else {
          ratingHtml += '&#10029;';
        }
      document.getElementById('iw-rating-row').style.display = '';
      document.getElementById('iw-rating').innerHTML = ratingHtml;
      }
    } else {
      document.getElementById('iw-rating-row').style.display = 'none';
    }

    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
      var fullUrl = place.website;
      var website = hostnameRegexp.exec(place.website);
      if (website === null) {
        website = 'http://' + place.website + '/';
        fullUrl = website;
      }
      document.getElementById('iw-website-row').style.display = '';
      document.getElementById('iw-website').textContent = website;
    } else {
      document.getElementById('iw-website-row').style.display = 'none';
    }
}
}
// , 10000)};


// document.getElementById('searchAttractions').addEventListener('click', e => searchAttractions(), true);
// document.getElementById('searchAttractions').addEventListener('click', e => function() {
//     document.location.href = 'hotel-gps2.html';
// }, true);
