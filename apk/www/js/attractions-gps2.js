// This example uses the autocomplete feature of the Google Places API.
// It allows the user to find all hotels in a given place, within a given
// country. It then displays markers for all the hotels returned,
// with on-click details for each hotel.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map, places, infoWindow;
var markers = [];
var autocomplete;
var list = [];
var resCounter = 0;
var countryRestrict = {'country': 'pl'};
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');

var userId = localStorage.getItem('userId')
var userEmail = localStorage.getItem('userEmail')
var g_favoritesDB = [];
var g_lokalizacja;


function initApp() {
    var config = {
        apiKey: "AIzaSyDtrie9w23IwHBTjv6RsJdOYptna740fY8",
        authDomain: "fir-tests-504a2.firebaseapp.com",
        databaseURL: "https://fir-tests-504a2.firebaseio.com",
        projectId: "fir-tests-504a2",
        storageBucket: "fir-tests-504a2.appspot.com",
        messagingSenderId: "440215787226"
    }
    firebase.initializeApp(config);
}

// function addFavorite(favorite, favorites) {
//     console.log("Z add Favorite favortesDB " + favorites);
//     console.log("Z add Favorite " + favorite);
//     // var favorites = [];
//     g_favoritesDB.indexOf(favorite) != -1 ? g_favoritesDB.push(favorite) : console.log("Juz jest dodane " + favorite);
//     // g_favoritesDB.push(favorite);
//     // g_favoritesDB = favorites;
//     // console.log(g_favoritesDB)
//     // var favoriteBox = document.getElementById(favorite);
//     // favorites.indexOf(favorite) != -1 ? favoriteBox.checked = true : console.log("Nie ma" + favorite);
//     // favorites.indexOf(favorite) != -1 ? localStorage.setItem(favorite, '1') : localStorage.setItem(favorite, '0')
// }

function getUserFavorites(userId) {
    if (!firebase.apps.length) {
        initApp();
    }
    // var userLogged = firebase.auth().getUid();
    // console.log(userLogged);
    // console.log(userId);
    var userFavorites = firebase.database().ref('users/' + userId);
    userFavorites.once('value', function(snapshot) {
        // console.log(favorites);
        var favorites = snapshot.val().favorites;
        if (!favorites) {
            alert("You do not have any categories set, please set them first")
            window.location.href = 'categories.html';
        }
        console.log("Z user getUserFovirtes " + favorites);
        favorites.forEach(function(favorite) {
            // if (childSnapshot.val().username === 'piotrek.slawek@gmail.com') {
                // var favorites = childSnapshot.val().favorites;
                // console.log(childSnapshot.val())
                console.log("Z user getUserFovirtes " + favorite);
                window.setTimeout(function() {
                    search(favorite), 1000});
                // addFavorite(favorite, favorites);
                // checkBoxFavorite(favorite, categories)
                // localStorage.setItem('cinema', '1')
        })
        // search(type);
        // console.log(snapshot.val().favorites);
        // let userFavorites = snapshot.val().favorites;
        // return userFavorites;
    });
};

function initMapNear() {
    // clearResults();
    // clearMarkers();
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

  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });


    var lat = localStorage.getItem('lat')
    var lng = localStorage.getItem('lng')
    var lokalizacja = new google.maps.LatLng(lat, lng);
    console.log(lokalizacja);

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

    getUserFavorites(userId);
}


// Search for hotels in the selected city, within the viewport of the map.
function search(type) {

  console.log("Z searcha " + type);
  var search = {
    bounds: map.getBounds(),
    // types: ['cafe']
    types: [type]
    // types: ['lodging', 'store']
  };

  places.nearbySearch(search, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // clearResults();
      // clearMarkers();
      // Create a marker for each hotel found, and
      // assign a letter of the alphabetic to each marker icon.
      // for (var i = 0; i < results.length; i++) {
      // console.log(results);
      // if (results.legth === 0) {
      //     alert("Nothing found")
      // }
      // debugger;
      for (var i = 0; i < results.length; i++) {
      // for (var i = 0; i < 1; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        // If the user clicks a hotel marker, show the details of that hotel
        // in an info window.
        markers[i].placeResult = results[i];
        list.push(markers[i]);
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 200);
        addResult(results[i], i);
      }
    }
  });
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}

// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
// function setAutocompleteCountry() {
//   var country = document.getElementById('country').value;
//   if (country == 'all') {
//     autocomplete.setComponentRestrictions({'country': []});
//     map.setCenter({lat: 15, lng: 0});
//     map.setZoom(2);
//   } else {
//     autocomplete.setComponentRestrictions({'country': country});
//     map.setCenter(countries[country].center);
//     map.setZoom(countries[country].zoom);
//   }
//   clearResults();
//   clearMarkers();
// }

function dropMarker(i) {
  return function() {
    markers[i].setMap(map);
  };
}

function addResult(result, i) {
  var results = document.getElementById('results');
  //var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
  var markerIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  var tr = document.createElement('tr');
  tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
  tr.onclick = function() {
    google.maps.event.trigger(list[resCount], 'click');
  };
  resCount++;
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
      debugger;
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
    if (document.getElementById('iw-icon')) {
        document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
            'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;
    }

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
// g_favoritesDB.forEach(function(favorite) {
//     console.log("onPlaceChanged " + favorite);
//     search(favorite);
// });
// }
