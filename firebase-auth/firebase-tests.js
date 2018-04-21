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
