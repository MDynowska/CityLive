
var provider = new firebase.auth.GoogleAuthProvider();

const btnLogin = document.getElementById('btnLogin');

var user;

// add login event
btnLogin.addEventListener('click', e => {
    if (user) {
        firebase.auth().signOut().then(function() {
            user = null;
            console.log('succesful sing-out');
        }).catch(function(error) {
            //e nerror happend
        });
    } else {
        firebase.auth().signInWithPopup(provider).then(function(result) {
        user = result.user;
        // log user
        console.log("out logged in user: " + JSON.stringify(user));
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error: " + errorCode + " -- " + errorMessage );
    });
}});
