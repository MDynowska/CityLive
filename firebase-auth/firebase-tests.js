function login(email, password) {
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
                alert('Wrong password DUPA.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
};


var config = {
    apiKey: "AIzaSyDtrie9w23IwHBTjv6RsJdOYptna740fY8",
    authDomain: "fir-tests-504a2.firebaseapp.com",
    databaseURL: "https://fir-tests-504a2.firebaseio.com",
    projectId: "fir-tests-504a2",
    storageBucket: "fir-tests-504a2.appspot.com",
    messagingSenderId: "440215787226"
};
firebase.initializeApp(config);


login('dupa@dupa.pl', 'dupa123')
