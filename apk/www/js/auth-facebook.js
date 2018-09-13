function checkGPS() {
    function onSuccess(position) {
        var gps_cords = [position.coords.latitude, position.coords.longitude];
        // localStorage.setItem('lokalizacja', gps_cords)
        console.log("Z getgps - " + gps_cords)
        // var bagry = new google.maps.LatLng(gps_cords[0], [1]);
        localStorage.setItem('lokalizacja', gps_cords)
        localStorage.setItem('lat', gps_cords[0])
        localStorage.setItem('lng', gps_cords[1])
        // console.log(bagry)
        // g_bagry = bagry;
        window.location.href='afterLogin2.html';
    }
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }
    // navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: Infinity, enableHighAccuracy: false });
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


// function getUserID() {
//     if (!firebase.apps.length) {
//         initApp();
//     }
//     var users = firebase.database().ref('users');
//     // console.log(users);
//     users.orderByChild('email').equalTo("piotrek.slawek@gmail.com").once("value", snapshot => {
//         // return userId;
//         console.log(snapshot.val())
//         snapshot.forEach(function(data) {
//             (data.key);
//             var userId = data.key;
//             console.log("Z GetUserID " + userId)
//             localStorage.setItem('userId', userId);
//             console.log(localStorage.getItem("userId"));
//             // console.log(userID)
//             // return userId;
//         });
//     });
// };


function getUserID(email) {
    if (!firebase.apps.length) {
        initApp();
    }
    firebase.database().ref('users').orderByChild('email')
    .equalTo("piotrek.slawek@gmail.com")
    .once("value", snapshot => {
        // return userId;
        // console.log(snapshot.val())
        snapshot.forEach(function(data) {
            var userId = data.key;
            localStorage.setItem('userId', userId);
            console.log("User ID z Face -> " + userId);
            // console.log(data.key);
        });
    }).catch(function onError(error) {
        console.log(error);
        alert(error);
    })
    .then(function onSuccess(res) {
        // console.log(userId);
        // alert(userId);
        // localStorage.setItem('userId', userId);
        checkGPS();
    });
};


function loginWithFB(){
  facebookConnectPlugin.login(["email"],function(result){
  // facebookConnectPlugin.login(["public_profile","email", "user_friends"],function(result){
    //calling api after login success
     // facebookConnectPlugin.api("/me?fields=email,birthday",
     facebookConnectPlugin.api("/me?fields=email",
     // ["public_profile","email", "user_friends"]
     ["email"]
     ,function(userData){
         //API success callback
         // alert(JSON.stringify(userData));
         // alert(userData["email"])
         // var userIdFace = userData["id"]
         var userEmailFace = userData["email"];
         // localStorage.setItem('userId', userIdFace)
         localStorage.setItem('userEmail', userEmailFace);
         // var users = firebase.database().ref('users');
         // users.orderByChild('email').equalTo(userEmailFace).once("value", function(snapshot) {
         //     console.log(snapshot.val());
         //     snapshot.forEach(function(data) {
         //         console.log("Firebase Facebook => " + data.key);
         //         // var userIdFirebase = data.key;
         //         // console.log(userIdFirebase)
         //     });
         // });
         getUserID(userEmailFace);
         // localStorage.getItem('userId');
         checkGPS();
      },function(error){
         //API error callback
         alert(JSON.stringify(error));
      });
   },function(error){
      //authenication error callback
      alert(JSON.stringify(error));
     });
}


// function toggleSignInFacebook() {
//   if (!firebase.auth().currentUser) {
//     // [START createprovider]
//     var provider = new firebase.auth.FacebookAuthProvider();
//     // [END createprovider]
//     // [START addscopes]
//     provider.addScope('user_birthday');
//     // [END addscopes]
//     // [START signin]
//     firebase.auth().signInWithPopup(provider).then(function(result) {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       // The signed-in user info.
//       var userFace = result.user;
//       var uidFace = userFace['providerData'][0]['uid']
//       console.log(uidFace)
//       var emailFace = result.user['providerData'][0]['email']
//       console.log(emailFace)
//       localStorage.setItem('userId', uidFace)
//       localStorage.setItem('userEmail', emailFace)
//       alert(uidFace)
//       alert(emailFace)
//       window.location.href='afterLogin2.html';
//       // checkGPS();
//       // window.setTimeout(function() {
//       //     location.href = "afterLogin2.html";
//       // }, 5000);
//
//       // [START_EXCLUDE]
//       // document.getElementById('quickstart-oauthtoken').textContent = token;
//       // [END_EXCLUDE]
//       // document.location.href = 'afterLogin2.html';
//     }).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // [START_EXCLUDE]
//       if (errorCode === 'auth/account-exists-with-different-credential') {
//         alert('You have already signed up with a different auth provider for that email.');
//         // If you are using multiple auth providers on your app you should handle linking
//         // the user's accounts here.
//       } else {
//         console.error(error);
//         alert(error)
//       }
//       // [END_EXCLUDE]
//     });
//     // [END signin]
//   } else {
//     // [START signout]
//     firebase.auth().signOut();
//     // [END signout]
//   }
//   // [START_EXCLUDE]
//   // document.getElementById('quickstart-sign-in').disabled = true;
//   // [END_EXCLUDE]
// }
// // [END buttoncallback]

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */

 function singOut() {
     if (!firebase.apps.length) {
         initApp();
     }
     firebase.auth().signOut()
         .then(window.setTimeout(function() {
             location.href = "index.html";
         }, 5000)
 )};


function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
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

window.onload = function() {
  initApp();
};

//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       var displayName = user.displayName;
//       var email = user.email;
//       var emailVerified = user.emailVerified;
//       var photoURL = user.photoURL;
//       var isAnonymous = user.isAnonymous;
//       var uid = user.uid;
//       var providerData = user.providerData;
//       // [START_EXCLUDE]
//       document.location.href = 'afterLogin2.html';
//       document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
//       document.getElementById('quickstart-sign-in').textContent = 'Log out';
//       document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
//       // [END_EXCLUDE]
//     } else {
//       // User is signed out.
//       // [START_EXCLUDE]
//       document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//       document.getElementById('quickstart-sign-in').textContent = 'Log in with Facebook';
//       document.getElementById('quickstart-account-details').textContent = 'null';
//       document.getElementById('quickstart-oauthtoken').textContent = 'null';
//       // [END_EXCLUDE]
//     }
//     // [START_EXCLUDE]
//     document.getElementById('quickstart-sign-in').disabled = false;
//     // [END_EXCLUDE]
//   });
//   // [END authstatelistener]
//   document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, true);
// }
//
// window.onload = function() {
//   initApp();
// };
