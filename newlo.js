function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "sourjyadip" && password == "1234567890") {
         alert("LOGGED IN SUCCESFULLY");
         window.location.href="index.html";
        try {
            // window.location.href = "./login.html";
            setTimeout(function(){document.location.href = "index.html"},500);

        } catch(err) {
            console.log(err);
        }
        // location.
    }
    else {
        alert("FAILED TO LOG IN. PLEASE CHECK YOUR CREDENTIALS");
    }
}