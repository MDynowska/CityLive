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

// function getUserFavorites(userId) {
//     if (!firebase.apps.length) {
//         initApp();
//     }
//     // var userLogged = firebase.auth().getUid();
//     // console.log(userLogged);
//     // console.log(userId);
//     var userFavorites = firebase.database().ref('users/' + userId);
//     userFavorites.once('value', function(snapshot) {
//         console.log(snapshot.val().favorites);
//         // let userFavorites = snapshot.val().favorites;
//         // return userFavorites;
//     });
// };


// var userFavorites = getUserFavorites(userId);


// var getCategories = new Promise(function(resolve, reject) {
//     if (!firebase.apps.length) {
//         initApp();
//     }
//     var categories = firebase.database().ref('categories');
//     categories.once('value', function(snapshot) {
//         categories = snapshot.val();
//         if (categories) {
//             resolve(categories);
//         } else {
//             var reason = new Error("Nie udalo sie");
//             reject(reason);
//         }
//         });
// });
//
//
// var categoriesDb = function() {
//     getCategories.then(function(result) {
//         console.log(result);
//     })
//     .catch(function(error) {
//         console.log(error.message)
//     });
// };





var categories = ['cinemas', 'museums', 'spa', 'restaurant', 'gym', 'zoo', 'cafe', 'art']

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
    // let categoriesDB = getUserFavorites();
    // categories.forEach(function(category) {
    //     console.log(category);
    //     // checkFavorite(category, categoriesDB)
    // });
    // checkFavorite('')
    // setTimeout(getCategories(), 2000);
    // window.setTimeout(2000);
    // console.log(g_userFavoritesDB);
    // var checkCinemas = document.getElementById('cinemas');
    // var checkMuseusm = document.getElementById('museums');
    // var checkSpa = document.getElementById('spa');
    // var checkRestaurants = document.getElementById('restaurants');
    // var checkGym = document.getElementById('gym');
    // var checkZoo = document.getElementById('zoo');
    // var checkCafe = document.getElementById('cafe');
    // var checkArt = document.getElementById('art');
    // // getUserFavorites(userId);
    // var favoritesDB = categoriesDb();
    // console.log(g_userFavoritesDB);
    // userFavoritesDB.indexOf('cinemas') != -1 ? checkCinemas : console.log("Ma kino");
    // userFavoritesDB.indexOf('art') != -1 ? checkMuseusm.checked = true; : checkMuseusm.checked = false;
    // userFavorites.indexOf('cinemas') === -1 ? $("#cinemas").prop("checked", true) : console.log('test')
    // var category = '';
    // switch(category) {
    //     case 'cinemas';
});
