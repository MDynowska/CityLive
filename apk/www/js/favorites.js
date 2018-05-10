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
//
// function check(box) {
//     if($(box.checked)) {
//         console.log(box['name'] + " Checked");
//         favorites.indexOf(box['name']) === -1 ? favorites.push(box['name']) : console.log("This item already exists");
//         // favorites.push(box['name']);
//         console.log(favorites);
//     } else {
//         console.log(box['name'] + " Unchecked");
//         var favoriteIndex = favorites.indexOf(box['name']);
//         if (favoriteIndex < 1) {
//             favorites.splice(favoriteIndex, 1);
//         } else {
//             console.log("This item is not in favorites");
//         }
//         console.log(favorites);
//         favorites.indexOf(box['name']) != -1 ? favorites.push(box['name']) : console.log("This item already exists");
//         // Checkbox is not checked..
//     }
// }
//
// function uncheck(box) {
//     if($(!box.checked)) {
//         console.log(box['name'] + " Unchecked");
//         var favoriteIndex = favorites.indexOf(box['name']);
//         if (favoriteIndex < 1) {
//             favorites.splice(favoriteIndex, 1);
//         } else {
//             console.log("This item is not in favorites");
//         }
//         console.log(favorites);
//         favorites.indexOf(box['name']) != -1 ? favorites.push(box['name']) : console.log("This item already exists");
//     }
// }
//
$( document ).ready(function() {
    $('input').change(function() {
        var checkboxName = this['name'];
        switch(checkboxName) {
            case 'cinemas':
                // console.log(checkboxName);
                checkUncheck(this);
                // check(this);
                // uncheck(this);
                break;
            case 'museums':
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
            case 'art':
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


function writeUserData(userId, email, favorites) {
  firebase.database().ref('users/' + userId).set({
    email: email,
    favorites: favorites,
  });
}

function editFavorites(userId, userEmail, newFavorites) {
    if (!firebase.apps.length) {
        initApp();
    }
    // var userId = userId
    // var email = userEmail;
    // var favorites = favorites;
    // var email = userEmail;
    // if (!userId) {
    //     setTimeout(function() {
    //         firebase.auth().getUid();
    //     }, 100);
    // }
    writeUserData(userId, userEmail, newFavorites);
}

function saveFavorites() {
    // localStorage.setItem('userFavorites', favorites);
    console.log(newFavorites);
    alert("Those categories were added to Your user Profile: \n" + newFavorites)
    editFavorites(userId, userEmail, newFavorites);
    window.setTimeout(function() {
        location.href = document.referrer;
    }, 5000);
    // document.location.href = 'afterLogin2.html';
}

// function saveFavorites() {
//     var favorites = [];
//     // if($('input[cinemas]').is(':checked')) {
//     if (document.getElementById("cinemas").checked = true) {
//         // console.log(cinemas);
//         favorites.push("cinemas")
//     } else {
//         var favoriteIndex = favorites.indexOf("cinemas");
//         if (favoriteIndex < 1) {
//             favorites.splice(favoriteIndex, 1);
//         }
//     }
    // // if($('input[museums]').is(':checked')) {
    // if (document.getElementById("museums").checked = true) {
    //     // console.log(cinemas);
    //     favorites.push("museums")
    // } else {
    //     var favoriteIndex = favorites.indexOf("museums");
    //     if (favoriteIndex < 1) {
    //         favorites.splice(favoriteIndex, 1);
    //     }
    // }
    // if($('input[spa]').is(':checked')) {
    // // if (document.getElementsByName("spa").checked = true) {
    //     // console.log(cinemas);
    //     favorites.push("spa")
    // } else {
    //     var favoriteIndex = favorites.indexOf("spa");
    //     if (favoriteIndex < 1) {
    //         favorites.splice(favoriteIndex, 1);
    //     }
    // }
    // if($('input[restaurant]').is(':checked')) {
    // // if (document.getElementsByName("restaurant").checked = true) {
    //     // console.log(cinemas);
    //     favorites.push("restaurant")
    // } else {
    //     var favoriteIndex = favorites.indexOf("restaurant");
    //     if (favoriteIndex < 1) {
    //         favorites.splice(favoriteIndex, 1);
    //     }
    // }
    // if($('input[gym]').is(':checked')) {
    // // if (document.getElementsByName("gym").checked = true) {
    //     // console.log(cinemas);
    //     favorites.push("gym")
    // } else {
    //     var favoriteIndex = favorites.indexOf("gym");
    //     if (favoriteIndex < 1) {
    //         favorites.splice(favoriteIndex, 1);
    //     }
    // }
    // if($('input[zoo]').is(':checked')) {
    // // if (document.getElementsByName("zoo").checked = true) {
    //     // console.log(cinemas);
    //     favorites.push("zoo")
    // } else {
    //     var favoriteIndex = favorites.indexOf("zoo");
    //     if (favoriteIndex < 1) {
    //         favorites.splice(favoriteIndex, 1);
    //     }
    // }
    // if($('input[cafe]').is(':checked')) {
    // // if (document.getElementsByName("cafe").checked = true) {
    //     // console.log(cinemas);
    //     favorites.push("cafe")
    // } else {
    //     var favoriteIndex = favorites.indexOf("cafe");
    //     if (favoriteIndex < 1) {
    //         favorites.splice(favoriteIndex, 1);
    //     }
    // }
    // if($('input[art]').is(':checked')) {
    // // if (document.getElementsByName("art").checked = true) {
    //     // console.log(cinemas);
    //     favorites.push("art")
    // } else {
    //     var favoriteIndex = favorites.indexOf("art");
    //     if (favoriteIndex < 1) {
    //         favorites.splice(favoriteIndex, 1);
    //     }
    // }
//     console.log(favorites);
// }
