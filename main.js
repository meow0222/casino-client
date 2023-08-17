$(document).ready(function() {
    //alert('jQuery is working!');

    $('#login-btn').click(function(e){
        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        console.log("Username:", username);
        console.log("Password:", password);

        $.ajax({
            url: "http://localhost:8080/login",
            type: 'GET',
            headers: {
                "casino": "login" // custom header
            },
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // if a success response is received, print it here:
                console.log("Response:", response); 

                if (response === "Login Successful") {
                    // Redirect to home.html
                    console.log("if condition for Login Successful triggered");
                    $('#main-content').css("display", "flex");
                    $('#login').css("display", "none");
                } else {
                    // Display "Login Failed"
                    alert(response);
                }
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });

    });

    $('#signup-btn').click(function(e){
        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        console.log("Username:", username);
        console.log("Password:", password);

        $.ajax({
            url: "http://localhost:8080/login",
            type: 'POST',
            headers: {
                "casino": "signup" // custom header
            },
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // if a success response is received, print it here:
                console.log("Response:", response);
                $('#login').css("display", "flex");
                $('#signup').css("display", "none");
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });
    });
});
