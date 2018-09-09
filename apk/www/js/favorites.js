// array.indexOf(newItem) === -1 ? array.push(newItem) : console.log("This item already exists");
var newFavorites = [];
var userId = localStorage.getItem('userId')
var userEmail = localStorage.getItem('userEmail')
// var userFavoritesNew = localStorage.getItem('userFavoritesNew')

function checkUncheck(box) {
    // console.log(favorites);
    if($(box).is(':checked')) {
        console.log(box['name'] + " Checked");
        newFavorites.indexOf(box['name']) === -1 ? newFavorites.push(box['name']) : console.log("This item already exists");
        // favorites.push(box['name']);
        // console.log(favorites);
    } else {
        console.log(box['name'] + " Unchecked");
        var favoriteIndex = newFavorites.indexOf(box['name']);
        // console.log(favoriteIndex);
        if (favoriteIndex < 1) {
            newFavorites.splice(favoriteIndex, 1);
        } else {
            console.log("This item is not in favorites");
        }
        // console.log(favorites);
        // favorites.indexOf(box['name']) != -1 ? favorites.push(box['name']) : console.log("This item already exists");
        // Checkbox is not checked..
    }
    console.log(newFavorites);
}

$( document ).ready(function() {
    $('input').change(function() {
        var checkboxName = this['name'];
        switch(checkboxName) {
            case 'movie_theater':
                // console.log(checkboxName);
                checkUncheck(this);
                // check(this);
                // uncheck(this);
                break;
            case 'museum':
                checkUncheck(this);
                break;
            case 'spa':
                checkUncheck(this);
                break;
            case 'restaurant':
                checkUncheck(this);
                break;
            case 'gym':
                checkUncheck(this);
                break;
            case 'zoo':
                checkUncheck(this);
                break;
            case 'cafe':
                checkUncheck(this);
                break;
            case 'art_gallery':
                checkUncheck(this);
                break;
        }
    })
});

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


// function writeUserData(userId, email, favorites) {
//   firebase.database().ref('users/' + userId).set({
//     email: email,
//     favorites: favorites,
//   });
// }
//
// function editFavorites(userId, userEmail, newFavorites) {
//     if (!firebase.apps.length) {
//         initApp();
//     }
//     writeUserData(userId, userEmail, newFavorites);
// }


function saveFavorites() {
    if (!firebase.apps.length) {
        initApp();
    }
  firebase.database().ref('users/' + userId).set({
    email: userEmail,
    favorites: newFavorites,
    }).then(function onSuccess(res) {
        document.location.href = 'afterLogin2.html';
    });
}
