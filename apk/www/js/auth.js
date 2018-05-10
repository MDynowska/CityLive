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

function toggleSignIn() {
    if (!firebase.apps.length) {
        initApp();
    }
    if (firebase.auth().currentUser) {
    // [START signout]
        firebase.auth().signOut();
    // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('SignIn -- Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('SignIn -- Please enter a password.');
            return;
        }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
                throw new Error("Wypad Zle haslo");
            } else {
                alert(errorMessage);
                throw new Error("Wypad wszystko inne");
            }
            console.log(error);
            // document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        })
        .then(function(result) {
        // initApp();
            user_id = result.uid;
            user_email = result.email;
            localStorage.setItem('userId', user_id);
            localStorage.setItem('userEmail', user_email);
            // alert(user)
        // console.log("Zalogowano jako: " + email)
            alert("Logged in as: " + email);
            // setTimeout(checkGPS(), 5000);
            checkGPS();
            // window.location.href='afterLogin2.html';
            // localStorage.setItem('loggedUser', firebase.auth().currentUser());
            // var userId = firebase.auth().getUid();
            // localStorage.setItem('userId', firebase.auth().getUid());

        });
    }
}
        // [END authwithemail]
    // document.getElementById('quickstart-sign-in').disabled = false;

function handleSignUp() {
    if (!firebase.apps.length) {
        initApp();
    }
    var email = document.getElementById('emailSingUp').value;
    var password = document.getElementById('passwordSingUp').value;
    if (email.length < 4) {
        alert('SignUp -- Please enter an email address.');
        // console.log(email)
        return;
    }
    if (password.length < 4) {
        alert('SignIn -- Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            user_id = user.uid;
            user_email = user.email;

            alert("Account Created");
            window.location.href = "index.html";
            })
        .catch(function(error) {
        // Handle Errors here.
            console.log()
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
    // [END createwithemail]
}

function sendEmailVerification() {
    // initApp();
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
  });
  // [END sendemailverification]
}

function sendPasswordReset() {
    if (!firebase.apps.length) {
        initApp();
    }
    var email = document.getElementById('emailForgot').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
  // [END sendpasswordemail];
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


document.getElementById('singIn').addEventListener('click', e => toggleSignIn(), true);
document.getElementById('singUp').addEventListener('click', e => handleSignUp(), true);
document.getElementById('passReset').addEventListener('click', e => sendPasswordReset(), true);
