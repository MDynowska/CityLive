var userId = localStorage.getItem('userId')
var userEmail = localStorage.getItem('userEmail')
var userFavorites = localStorage.getItem('userFavorites')


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


function singOut() {
    if (!firebase.apps.length) {
        initApp();
    }
    firebase.auth().signOut()
        .then(function() {
            localStorage.clear();
            window.location.href = 'index.html';
        });
}

function myProfile(userId) {
    if (!firebase.apps.length) {
        initApp();
    }
    // var userId = firebase.auth().getUid();
    // console.log(userLogged);
    var user = firebase.database().ref('users/' + userId);
    user.once('value', function(snapshot) {
        if (!snapshot.val().favorites) {
            alert('You do not have any favorites');
        } else {
            alert("Those are categories of attracions that you have configured: \n" + snapshot.val().favorites);
        }
        // snapshot.forEach(function(childSnapshot) {
        //     if (childSnapshot.val().username === userLogged) {
        //         console.log(childSnapshot.val().favorites);
        //         };
        //     /* console.log(childSnapshot.val().username); */
        //     });
        });
}


// function myProfileEmail(userEmail) {
//     if (!firebase.apps.length) {
//         initApp();
//     }
//     // var userId = firebase.auth().getUid();
//     // console.log(userLogged);
//     var users = firebase.database().ref('users/');
//     users.once('value', function(snapshot) {
//         // if (!snapshot.val().favorites) {
//         //     alert('You do not have any favorites');
//         // } else {
//         //     alert("Those are categories of attracions that you have configured: \n" + snapshot.val().favorites);
//         // }
//         snapshot.forEach(function(childSnapshot) {
//             if (childSnapshot.val().email === userEmail) {
//                 console.log(childSnapshot.val().favorites);
//                 if (!snapshot.val().favorites) {
//                     alert('You do not have any favorites');
//                 } else {
//                     alert("Those are categories of attracions that you have configured: \n" + snapshot.val().favorites);
//                 }
//             };
//             /* console.log(childSnapshot.val().username); */
//         });
//     });
// }

function getCategories() {
    if (!firebase.apps.length) {
        initApp();
    }
    // var userLogged = firebase.auth().getUid();
    // console.log(userLogged);
    var categories = firebase.database().ref('categories');
    categories.once('value', function(snapshot) {
        console.log(snapshot.val());
        alert("Categories of attracions that application support: \n" + snapshot.val())
        // snapshot.forEach(function(childSnapshot) {
        //     if (childSnapshot.val().username === userLogged) {
        //         console.log(childSnapshot.val().favorites);
        //         };
        // console.log(childSnapshot.val())
        // alert()
        //     });
        });
    // });
}

function writeUserData(userId, email, favorites) {
  firebase.database().ref('users/' + userId).set({
    email: email,
    favorites: favorites,
  });
}


function editFavorites() {
    if (!firebase.apps.length) {
        initApp();
    }
    // var userId = localStorage.getItem('userId')
    var userId = userId;
    var email = userEmail;
    var favorites = userFavorites;
    // var email = userEmail;
    // if (!userId) {
    //     setTimeout(function() {
    //         firebase.auth().getUid();
    //     }, 100);
    // }
    writeUserData(userId, email, favorites);
}

// function searchAttractions() {
//     window.location.href = 'searchAttractions.html';
// }

$( document ).ready(function() {
    $( ".cross" ).hide();
    $( ".menu" ).hide();
    $( ".hamburger" ).click(function() {
        $( ".menu" ).slideToggle( "slow", function() {
        $( ".hamburger" ).hide();
        $( ".cross" ).show();
        });
    });

    $( ".cross" ).click(function() {
        $( ".menu" ).slideToggle( "slow", function() {
            $( ".cross" ).hide();
            $( ".hamburger" ).show();
        });
    });
    $( "#searchAttractionsMenu" ).click(function() {
        window.location.href = 'searchAttractions.html';
        // searchAttractions();
    });
    $( "#getCategories" ).click(function() {
        getCategories();
    });
    $( "#myProfile" ).click(function() {
        myProfile(userId);
        // myProfileEmail(userEmail);
        // window.location.href = 'profilePage.html';
    });
    $( "#logOut" ).click(function() {
        singOut();
        // toggleSignIn();
        // initApp();
        // firebase.auth().signOut();
    });
    // $( "#searchAttractionsMenu" ).click(function() {
    //     window.location.href = 'searchAttractions.html';
    //     // searchAttractions();
    // });
});
// $( "#editFavorites" ).click(function() {
//     editFavorites(userId);
// });
