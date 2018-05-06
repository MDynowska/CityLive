
// var provider = new firebase.auth.GoogleAuthProvider();

// const btnLogin = document.getElementById('btnLogin');

function toggleSignIn() {
    if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
    } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
        // user = result.user;
        // console.log("Zalogowano jako: " + email)
        alert("Zalogowano jako: " + email)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
    // [END authwithemail]
    }
    // document.getElementById('quickstart-sign-in').disabled = false;
}

function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
    alert('Please enter an email address.');
    return;
    }
    if (password.length < 4) {
    alert('Please enter a password.');
    return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
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
  var email = document.getElementById('email').value;
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


function initApp() {
    var config = {
        apiKey: "AIzaSyDtrie9w23IwHBTjv6RsJdOYptna740fY8",
        authDomain: "fir-tests-504a2.firebaseapp.com",
        databaseURL: "https://fir-tests-504a2.firebaseio.com",
        projectId: "fir-tests-504a2",
        storageBucket: "fir-tests-504a2.appspot.com",
        messagingSenderId: "440215787226"
    };
    firebase.initializeApp(config);
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, true);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, true);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, true);
// });
}

window.onload = function() {
  initApp();
};
