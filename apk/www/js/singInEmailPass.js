
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
            localStorage.set('test_var', email)
            // window.location.replace("hotels2.html");
            window.location.replace("afterLogin.html");
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
                document.getElementById('quickstart-sign-in').disabled = false;
                // [END_EXCLUDE]
            });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = false;
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
      // firebase.auth().onAuthStateChanged(function(user) {
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // [START_EXCLUDE]
        // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, true);
    // });
    }
    window.onload = function() {
      initApp();
    };
