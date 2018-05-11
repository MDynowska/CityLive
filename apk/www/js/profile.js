var userId = localStorage.getItem('userId')
var userEmail = localStorage.getItem('userEmail')
var userFavoritesDB = localStorage.getItem('userFavoritesDB')
var g_userFavoritesDB = [];
// var categoriesDB = localStorage.getItem('categoriesDB')

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



var categories = ['movie_theater', 'museum', 'spa', 'restaurant', 'gym', 'zoo', 'cafe', 'art_gallery']

function checkBoxFavorite(favorite, favorites) {
    console.log(favorite);
    var favoriteBox = document.getElementById(favorite);
    favorites.indexOf(favorite) != -1 ? favoriteBox.checked = true : console.log("Nie ma" + favorite);
    // favorites.indexOf(favorite) != -1 ? localStorage.setItem(favorite, '1') : localStorage.setItem(favorite, '0')
}

function getUserFavorites(userId) {
    if (!firebase.apps.length) {
        initApp();
    }
    // var userLogged = firebase.auth().getUid();
    // console.log(userLogged);
    // console.log(userId);
    var userFavorites = firebase.database().ref('users/' + userId);
    userFavorites.once('value', function(snapshot) {
        var favorites = snapshot.val().favorites;
        favorites.forEach(function(favorite) {
            // if (childSnapshot.val().username === 'piotrek.slawek@gmail.com') {
                // var favorites = childSnapshot.val().favorites;
                // console.log(childSnapshot.val())
                console.log(favorite);
                checkBoxFavorite(favorite, categories)
                // localStorage.setItem('cinema', '1')
        })
        // console.log(snapshot.val().favorites);
        // let userFavorites = snapshot.val().favorites;
        // return userFavorites;
    });
};

$( document ).ready(function() {
    var divProfileEmail = document.getElementById('profileEmail');
    divProfileEmail.innerHTML += localStorage.getItem('userEmail');
    getUserFavorites(userId);
    $( "#selectAttractionsCategory" ).click(function() {
            document.location.href = 'categories.html';
    })
});
